"use client";
import { useLogin } from "@/hooks/useAuth";
import { signInSchema } from "@/lib/formSchema";
import { logo } from "@/public";
import { Button, FloatingLabel, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFirstWord } from "@/utils/getFirstWord";

const SignInPage = () => {
	const login = useLogin();

	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: yupResolver(signInSchema),
	});

	const onSubmit = async (data) => {
		const { username, password } = data;
		try {
			await login.mutateAsync({ username, password });
			reset();
		} catch (error) {
			setError("root", {
				message: "Invalid credentials",
			});
		}
	};

	useEffect(() => {
		const {
			isSuccess,

			isError,
			error,
		} = login;

		if (isSuccess && login.data?.user?.userType) {
			toast.success(
				`Welcome, ${getFirstWord(login.data.user.name) || "user"}!`
			);

			// Make sure you're accessing the role correctly
			const userRole = login.data.user.userType;

			if (userRole === "admin") {
				router.push("/dashboard");
			} else if (userRole === "resortOwner") {
				router.push("/owners");
			} else {
				router.push("/");
			}
		} else if (isError) {
			console.error("Login failed:", error);
		}
	}, [login.isSuccess, login.isError, login.data, login.error]);

	return (
		<div className="flex items-center justify-center h-screen backdrop-blur-md">
			<div className="w-[400px] shadow-md rounded-lg p-5 bg-gray-800 ">
				<div className="flex items-center justify-center mb-5">
					<Image src={logo} height={150} width={200} alt="logo" />
				</div>
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<FloatingLabel
							variant="standard"
							label="Username"
							className={`text-white  ${
								errors.username && "text-red-500 border-red-500"
							}`}
							autoComplete="off"
							name="username"
							{...register("username")}
							helperText={errors.username && errors.username.message}
						/>
					</div>
					<div>
						<FloatingLabel
							variant="standard"
							label="Password"
							type="password"
							className={`text-white  ${
								errors.password && "text-red-500 border-red-500"
							}`}
							name="password"
							{...register("password")}
							helperText={errors.password && errors.password.message}
						/>
					</div>
					{errors.root && (
						<div className="text-red-500">{errors.root.message}</div>
					)}
					<div className="space-y-2">
						<Button
							className="w-full"
							color="primary"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Logging in..." : "Login"}
						</Button>
						<div className="w-full">
							<Link
								href="/sign-in"
								className="text-white text-[14px] hover:text-primary text-end"
							>
								Forgot password?
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInPage;
