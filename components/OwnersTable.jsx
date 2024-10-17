"use client";
import { useDeleteGuest, useGetGuests } from "@/hooks/useGuest";
import getAddress from "@/utils/getAddress";
import { format } from "date-fns";
import { Table } from "flowbite-react";
import Link from "next/link";
import toast from "react-hot-toast";

const OwnersTable = () => {
	const { data: guests, isLoading: isLoadingGuests } = useGetGuests();
	const { mutateAsync: deleteGuest, isLoading: isLoadingDelete } =
		useDeleteGuest();

	const handleDelete = async (id) => {
		await toast.promise(deleteGuest(id), {
			loading: "Deleting guest...",
			success: "Guest deleted successfully",
			error: "Error deleting guest",
		});
	};

	return (
		<div className="overflow-x-auto">
			<Table>
				<Table.Head>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Age</Table.HeadCell>
					<Table.HeadCell>Gender</Table.HeadCell>
					<Table.HeadCell>Address</Table.HeadCell>
					<Table.HeadCell>Contact</Table.HeadCell>
					<Table.HeadCell>Date</Table.HeadCell>
					<Table.HeadCell>
						<span>Actions</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y text-[12px]">
					{guests &&
						guests.tourists.map((guest) => (
							<Table.Row className="bg-white" key={guest.id}>
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
								<Table.Cell>{guest.contactNumber}</Table.Cell>
								<Table.Cell>
									{format(guest.visitDate, "MMM dd, yyyy")}
								</Table.Cell>
								<Table.Cell className="flex">
									<button
										onClick={() => handleDelete(guest.id)}
										className="font-medium text-red-600 hover:underline"
									>
										Delete
									</button>
									{/* <Link
								href="#"
								className="font-medium text-red-600 hover:underline"
							>
								Delete
							</Link> */}
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default OwnersTable;
