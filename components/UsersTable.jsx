"use client";
import { useDeleteUser, useFetchUsers } from "@/hooks/useAuth";
import { Table, Modal, TextInput, Select } from "flowbite-react";
import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";

const UsersTable = () => {
  const { data: users } = useFetchUsers();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Add filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Filter users based on search query and role
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const matchesSearch = 
        searchQuery === "" ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = 
        roleFilter === "all" || 
        user.userType?.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

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
    <div className="space-y-4">
      {/* Add filter controls */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <TextInput
            type="text"
            placeholder="Search by name, email, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-48">
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
            <option value="resortOwner">Resort Owner</option>
            {/* Add other role options as needed */}
          </Select>
        </div>
      </div>

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
            {filteredUsers.map((user) => (
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

        {/* Show message when no results found */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No users found matching the current filters.
          </div>
        )}
      </div>

      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        size="sm"
      >
        {/* Modal content remains the same */}
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