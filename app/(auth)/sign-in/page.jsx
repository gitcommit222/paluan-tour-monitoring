"use client";
import { logo } from "@/public";
import { Button, FloatingLabel, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
	return (
		<div className="flex items-center justify-center h-screen backdrop-blur-md  ">
			<div className="w-[400px] shadow-md rounded-lg p-5">
				<div className="flex items-center justify-center mb-5">
					<Image src={logo} height={150} width={200} />
				</div>
				<div className="space-y-6">
					<div>
						<FloatingLabel
							variant="standard"
							label="Username"
							className="text-white dark:focus:border-white"
						/>
					</div>
					<div>
						<FloatingLabel
							variant="standard"
							label="Password"
							type="password"
							className="text-white"
						/>
					</div>

					<div className="space-y-2">
						<Button className="w-full" color="primary">
							Login
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
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
