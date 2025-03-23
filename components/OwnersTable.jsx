"use client";
import {
	useDeleteGuest,
	useGetTouristByResortId,
	useCheckoutGuest,
} from "@/hooks/useGuest";
import getAddress from "@/utils/getAddress";
import { format } from "date-fns";
import { Table, Modal, Button } from "flowbite-react";
import toast from "react-hot-toast";
import { useState } from "react";

const OwnersTable = ({ resortId }) => {
	const { data: guests, isLoading: isLoadingGuests } =
		useGetTouristByResortId(resortId);
	const { mutateAsync: deleteGuest, isLoading: isLoadingDelete } =
		useDeleteGuest();
	const { mutateAsync: checkoutGuest } = useCheckoutGuest();
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

	const handleCheckout = async (guest) => {
		if (guest.outDate) {
			toast.error("Guest has already checked out!");
			return;
		}

		await toast.promise(checkoutGuest(guest.id), {
			loading: "Checking out guest...",
			success: "Guest checked out successfully",
			error: "Error checking out guest",
		});
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
						<Table.HeadCell>Status</Table.HeadCell>
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
										{format(guest.visitDate, "MM/dd/yyyy")}
									</Table.Cell>
									<Table.Cell>
										{guest.outDate ? (
											<span className="text-green-600">Checked Out</span>
										) : (
											<span className="text-blue-600">Checked In</span>
										)}
									</Table.Cell>
									<Table.Cell className="flex gap-2">
										{!guest.outDate && (
											<button
												onClick={() => handleCheckout(guest)}
												className="font-medium text-blue-600 hover:underline"
											>
												Check Out
											</button>
										)}
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

			<Modal
				show={deleteModalOpen}
				size="md"
				onClose={() => setDeleteModalOpen(false)}
				popup
			>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this guest?
						</h3>
						<div className="flex justify-center gap-4">
							<Button color="failure" onClick={handleConfirmDelete}>
								Yes, I'm sure
							</Button>
							<Button color="gray" onClick={() => setDeleteModalOpen(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default OwnersTable;
