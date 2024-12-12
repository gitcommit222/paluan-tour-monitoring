"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useSignup } from "@/hooks/useAuth";

const UserForm = ({ data }) => {
	const [openModal, setOpenModal] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			fullName: data ? data.fullName : "",
			username: data ? data.username : "",
			role: data ? data.role : "admin",
			email: data ? data.email : "",
		},
	});

	const { mutateAsync: createUser } = useSignup();

	const onSubmit = async (formData) => {
		setOpenModal(false);
		try {
			await toast.promise(
				createUser({
					name: formData?.fullName,
					username: formData?.username,
					email: formData?.email,
					password: "admin123",
					userType: formData.role,
				}),
				{
					loading: "Creating user...",
					success: "User added successfully!",
					error: "Failed to create user",
				}
			);
		} catch (error) {
			console.error("Error adding guest:", error);
			setError("root", {
				message: "Invalid Inputs",
			});
		}
	};

	return (
		<div>
			<Button color="primary" onClick={() => setOpenModal(true)}>
				Add User
			</Button>
			<Modal show={openModal} size="lg" onClose={() => setOpenModal(false)}>
				<Modal.Body>
					<h1 className="font-medium tracking-wide text-[24px] mb-2">
						User Form
					</h1>
					<div>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
							<div>
								<div className="mb-1 block">
									<Label htmlFor="small" value="Full Name" />
								</div>
								<TextInput id="small" type="text" {...register("fullName")} />
							</div>
							<div>
								<div className="mb-1 block">
									<Label htmlFor="small" value="Username" />
								</div>
								<TextInput id="small" type="text" {...register("username")} />
							</div>
							<div>
								<div className="mb-1 block">
									<Label htmlFor="small" value="Email" />
								</div>
								<TextInput id="small" type="email" {...register("email")} />
							</div>
							<div>
								<div className="mb-1 block">
									<Label htmlFor="role" value="Role" />
								</div>
								<Select id="role" {...register("role")}>
									<option value="guest">Guest</option>
									<option value="admin">Admin</option>
									<option value="resortOwner">Resort Owner</option>
								</Select>
							</div>
							<div className="w-full mt-3 flex gap-2">
								<button
									className="w-full bg-gray-100 rounded-md"
									onClick={() => setOpenModal(false)}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-primary rounded-md py-2 tracking-wider text-white w-full"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default UserForm;
