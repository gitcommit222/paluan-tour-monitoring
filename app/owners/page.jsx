"use client";
import AddGuestForm from "@/components/AddGuestForm";
import OwnersTable from "@/components/OwnersTable";
import Headerbox from "@/components/shared/HeaderBox";
import { logo } from "@/public";
import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";

const Home = ({ data }) => {
	return (
		<section className="relative">
			<div className="w-full shadow-lg z-100 bg-gray-800 h-[80px] flex items-center justify-between px-[100px]">
				<div>
					<Image
						src={logo}
						alt="logo"
						height={150}
						width={150}
						className="object-contain"
					/>
				</div>
				<nav>
					<ul>
						<Button
							color="secondary"
							className="text-white uppercase tracking-wide font-medium"
						>
							Logout
						</Button>
					</ul>
				</nav>
			</div>
			<div className="px-[100px] py-[25px]">
				<div>
					<Headerbox
						user="Owner!"
						title="Welcome,"
						type="greeting"
						subtext="Manage and view your spot data here."
					/>
				</div>
				<div className="flex gap-2">
					<div className="flex-1">
						<OwnersTable />
					</div>
					<div className="border rounded-lg min-w-[350px] p-5 space-y-5">
						<div className="flex justify-between items-center flex-wrap">
							<h3 className="font-semibold text-[18px] mb-2">Add Guests</h3>
							<div>
								<p className="text-red-500 text-[14px]">* required fields.</p>
							</div>
						</div>
						<AddGuestForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
