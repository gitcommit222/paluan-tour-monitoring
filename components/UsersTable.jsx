"use client";
import { useDeleteUser, useFetchUsers } from "@/hooks/useAuth";
import { Table } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";

const UsersTable = () => {
	const { data: users } = useFetchUsers();
	const { mutateAsync: deleteUser } = useDeleteUser();

	const handleDeleteUser = async (id) => {
		await toast.promise(deleteUser(id), {
			success: "User deleted.",
			loading: "Deleting user...",
			error: "Failed deleting user",
		});
	};
	console.log(users);
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
									{/* <button className="text-blue-500 hover:underline">
										Edit
									</button> */}
									<button
										onClick={() => handleDeleteUser(user?.id)}
										className="text-red-500 hover:underline"
									>
										Delete
									</button>
								</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default UsersTable;
