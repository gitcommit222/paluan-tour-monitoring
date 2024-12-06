"use client";
import { useDeleteGuest, useGetTouristByResortId } from "@/hooks/useGuest";
import getAddress from "@/utils/getAddress";
import { format } from "date-fns";
import { Table, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { useState } from "react";

const OwnersTable = ({ resortId }) => {
	const { data: guests, isLoading: isLoadingGuests } =
		useGetTouristByResortId(resortId);
	const { mutateAsync: deleteGuest, isLoading: isLoadingDelete } =
		useDeleteGuest();
	console.log(`resortId: ${resortId}`);
	console.log(guests);

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [guestToDelete, setGuestToDelete] = useState(null);

	const handleDeleteClick = (guest) => {
		setGuestToDelete(guest);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		await toast.promise(deleteGuest(guestToDelete.id), {
			loading: "Deleting guest...",
			success: "Guest deleted successfully",
			error: "Error deleting guest",
		});
		setDeleteModalOpen(false);
	};

	return (
		<>
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
									<Table.Cell>{format(guest.visitDate, "MM/dd/yyyy")}</Table.Cell>
									<Table.Cell className="flex">
										<button
											onClick={() => handleDeleteClick(guest)}
											className="font-medium text-red-600 hover:underline"
										>
											Delete
										</button>
									</Table.Cell>
								</Table.Row>
							))}
					</Table.Body>
				</Table>
			</div>

			<Modal show={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
				<Modal.Header>Confirm Delete</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							Are you sure you want to delete {guestToDelete?.name}? This action cannot be undone.
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={handleConfirmDelete}
						className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>
						Delete
					</button>
					<button
						onClick={() => setDeleteModalOpen(false)}
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
					>
						Cancel
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default OwnersTable;
