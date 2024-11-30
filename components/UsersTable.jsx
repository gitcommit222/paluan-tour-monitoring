"use client";
import { useDeleteUser, useFetchUsers } from "@/hooks/useAuth";
import { Table, Modal } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UsersTable = () => {
	const { data: users } = useFetchUsers();
	const { mutateAsync: deleteUser } = useDeleteUser();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);

	const handleDeleteUser = async () => {
		if (!userToDelete) return;

		await toast.promise(deleteUser(userToDelete), {
			success: "User deleted.",
			loading: "Deleting user...",
			error: "Failed deleting user",
		});

		setIsDeleteModalOpen(false);
		setUserToDelete(null);
	};

	return (
		<div className="overflow-x-auto">
			<Table>
				<Table.Head>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Username</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Role</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{users &&
						users.map((user) => (
							<Table.Row
								key={user.id}
								className="bg-white dark:border-gray-700 dark:bg-gray-800"
							>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									{user?.name}
								</Table.Cell>
								<Table.Cell>{user?.username}</Table.Cell>
								<Table.Cell>{user?.email}</Table.Cell>
								<Table.Cell className="capitalize">{user?.userType}</Table.Cell>
								<Table.Cell className="flex gap-2">
									<button
										onClick={() => {
											setUserToDelete(user?.id);
											setIsDeleteModalOpen(true);
										}}
										className="text-red-500 hover:underline"
									>
										Delete
									</button>
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>
			<Modal
				show={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				size="sm"
			>
				<Modal.Header>
					<div className="flex justify-between items-center w-full">
						<span>Confirm Delete</span>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<p className="text-gray-600">
							Are you sure you want to delete this user?
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 w-full">
						<button
							onClick={handleDeleteUser}
							className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
						>
							Yes, I'm sure
						</button>
						<button
							onClick={() => setIsDeleteModalOpen(false)}
							className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
						>
							No, cancel
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default UsersTable;
