"use client";
import { useSignup } from "@/hooks/useAuth";
import { signUpSchema } from "@/lib/formSchema";
import { logo } from "@/public";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FloatingLabel } from "flowbite-react";

const SignupPage = () => {
	const signup = useSignup();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
		resolver: yupResolver(signUpSchema),
	});

	const onSubmit = async (data) => {
		console.log(data);
		try {
			await signup.mutateAsync({
				...data,
				userType: "guest",
			});
			toast.success("Account created successfully!");
			reset();
			router.push("/sign-in");
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Something went wrong";
			toast.error(errorMessage);
			setError("root", {
				message: errorMessage,
			});
		}
	};

	return (
		<div className="flex items-center justify-center h-screen backdrop-blur-md">
			<div className="w-[400px] shadow-md rounded-lg p-5 bg-gray-800">
				<div className="flex items-center justify-center mb-5">
					<Image src={logo} height={150} width={200} alt="Logo" />
				</div>

				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<FloatingLabel
							variant="standard"
							label="Name"
							className={`text-white ${
								errors.name ? "text-red-500 border-red-500" : ""
							}`}
							autoComplete="off"
							name="name"
							{...register("name")}
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>

					<div>
						<FloatingLabel
							variant="standard"
							label="Email"
							className={`text-white ${
								errors.email ? "text-red-500 border-red-500" : ""
							}`}
							autoComplete="off"
							name="email"
							{...register("email")}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<FloatingLabel
							variant="standard"
							label="Username"
							className={`text-white ${
								errors.username ? "text-red-500 border-red-500" : ""
							}`}
							autoComplete="off"
							name="username"
							{...register("username")}
						/>
						{errors.username && (
							<p className="mt-1 text-sm text-red-500">
								{errors.username.message}
							</p>
						)}
					</div>

					<div>
						<FloatingLabel
							variant="standard"
							label="Password"
							type="password"
							className={`text-white ${
								errors.password ? "text-red-500 border-red-500" : ""
							}`}
							name="password"
							{...register("password")}
						/>
						{errors.password ? (
							<p className="mt-1 text-sm text-red-500">
								{errors.password.message}
							</p>
						) : (
							<p className="text-gray-400 text-xs mt-1">
								Password must be at least 8 characters long and contain at least
								one uppercase letter, one lowercase letter, one number, and one
								special character.
							</p>
						)}
					</div>

					<div>
						<FloatingLabel
							variant="standard"
							label="Confirm Password"
							type="password"
							className={`text-white ${
								errors.confirmPassword ? "text-red-500 border-red-500" : ""
							}`}
							name="confirmPassword"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<p className="mt-1 text-sm text-red-500">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{errors.root && (
						<div className="rounded-md bg-red-50 p-4">
							<p className="text-sm text-red-600">{errors.root.message}</p>
						</div>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						{isSubmitting ? (
							<div className="flex items-center gap-2">
								<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
								<span>Creating account...</span>
							</div>
						) : (
							"Sign Up"
						)}
					</Button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						href="/sign-in"
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignupPage;
