"use client";
import Headerbox from "@/components/shared/HeaderBox";
import { useGetGuests } from "@/hooks/useGuest";
import { useFetchSpots } from "@/hooks/useSpot";
import getAddress from "@/utils/getAddress";
import { format } from "date-fns";
import { Button, Select, Table, TextInput, Tooltip } from "flowbite-react";
import React, { useState, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import * as XLSX from "xlsx";

const Reports = () => {
	const { data: guests } = useGetGuests();
	const { data: spots } = useFetchSpots();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSpotId, setSelectedSpotId] = useState("All");

	const filteredGuests = useMemo(() => {
		if (!guests || !guests.tourists || !Array.isArray(guests.tourists))
			return [];

		return guests.tourists.filter((guest) => {
			if (!guest || !guest.name) return false;

			const matchesSearch =
				guest.name.toLowerCase().includes((searchTerm || "").toLowerCase()) ||
				(guest.resort?.name || "")
					.toLowerCase()
					.includes((searchTerm || "").toLowerCase());

			const matchesSpot =
				selectedSpotId === "All" ||
				(guest.resort &&
					guest.resort.id.toString() === selectedSpotId.toString());

			return matchesSearch && matchesSpot;
		});
	}, [guests, searchTerm, selectedSpotId]);

	const exportToExcel = () => {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(
			filteredGuests.map((guest) => ({
				"Guest Name": guest.name,
				Age: guest.age,
				Gender: guest.gender,
				Address: getAddress(
					guest.region,
					guest.province,
					guest.municipality,
					guest.barangay
				),
				"Spot Visited": guest.resort?.name,
				"Date Visited": format(guest.visitDate, "MM/dd/yyyy"),
				"Out Date": guest.outDate ? format(guest.outDate, "MM/dd/yyyy") : "N/A",
				"Duration (Hours)": guest.duration ? `${guest.duration} hrs` : "N/A",
			}))
		);
		XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");
		XLSX.writeFile(workbook, "guests_report.xlsx");
	};

	return (
		<section>
			<div className="flex items-center justify-between">
				<Headerbox title="Reports" subtext="Manage and view reports here." />
				<div className=" flex gap-3">
					<div className="max-w-lg">
						<TextInput
							id="search"
							type="text"
							icon={CiSearch}
							placeholder="Search name or resort..."
							required
							color="gray"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="max-w-lg">
						<Select
							id="spots"
							required
							value={selectedSpotId}
							onChange={(e) => setSelectedSpotId(e.target.value)}
						>
							<option value="All">All</option>
							{spots &&
								spots.resorts.map((spot) => (
									<option key={spot.id} value={spot.id}>
										{spot.name}
									</option>
								))}
						</Select>
					</div>
					<Tooltip content="Export as Excel" className="mt-4 sm:mt-0">
						<Button
							color="primary"
							className="transition-all duration-200 hover:opacity-90 hover:shadow-md"
							onClick={exportToExcel}
						>
							EXPORT
						</Button>
					</Tooltip>
				</div>
			</div>
			<div>
				<div className="overflow-x-auto ">
					<Table>
						<Table.Head>
							<Table.HeadCell>Guest Name</Table.HeadCell>
							<Table.HeadCell>Age</Table.HeadCell>
							<Table.HeadCell>Gender</Table.HeadCell>
							<Table.HeadCell>Address</Table.HeadCell>
							<Table.HeadCell>Spot Visited</Table.HeadCell>
							<Table.HeadCell>Date Visited</Table.HeadCell>
							<Table.HeadCell>Out Date</Table.HeadCell>
							<Table.HeadCell>Duration (Hours)</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y text-[14px]">
							{filteredGuests.map((guest) => (
								<Table.Row
									key={guest.id}
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
										{guest.name}
									</Table.Cell>
									<Table.Cell>{guest.age}</Table.Cell>
									<Table.Cell>{guest.gender}</Table.Cell>
									<Table.Cell>
										{getAddress(
											guest.region,
											guest.province,
											guest.municipality,
											guest.barangay
										)}
									</Table.Cell>
									<Table.Cell>{guest.resort?.name}</Table.Cell>
									<Table.Cell>
										{format(guest.visitDate, "MM/dd/yyyy")}
									</Table.Cell>
									<Table.Cell>
										{guest.outDate
											? format(guest.outDate, "MM/dd/yyyy")
											: "N/A"}
									</Table.Cell>
									<Table.Cell>
										{guest.duration ? `${guest.duration} hrs` : "N/A"}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			</div>
		</section>
	);
};

export default Reports;
