"use client";
import Headerbox from "@/components/shared/HeaderBox";
import { Button, Select, Table, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Reports = () => {
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
							placeholder="Search..."
							required
							color="gray"
						/>
					</div>
					<div className="max-w-lg">
						<Select id="spots" required>
							<option>All</option>
							<option>Resort 1</option>
							<option>Resort 2</option>
							<option>Resort 3</option>
						</Select>
					</div>
					<div>
						<Button color="primary">EXPORT</Button>
					</div>
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
						</Table.Head>
						<Table.Body className="divide-y text-[14px]">
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									Alexis Cadahin
								</Table.Cell>
								<Table.Cell>20</Table.Cell>
								<Table.Cell>Male</Table.Cell>
								<Table.Cell>Paluan, Occidental Mindoro</Table.Cell>
								<Table.Cell>Calawagan</Table.Cell>
								<Table.Cell>September 25, 2024</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>
			</div>
		</section>
	);
};

export default Reports;
