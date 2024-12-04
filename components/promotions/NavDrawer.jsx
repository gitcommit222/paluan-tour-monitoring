"use client";
import { promotionNavLinks } from "@/constants";
import { Avatar, Button, Drawer } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useFetchUser } from "@/hooks/useAuth";

const NavDrawer = ({ onLogout }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: user } = useFetchUser();

	const handleClose = () => setIsOpen(false);

	return (
		<>
			<div className="flex min-h-[50vh] items-center justify-center">
				<button onClick={() => setIsOpen(true)}>
					<IoMenu size={30} />
				</button>
			</div>
			<Drawer
				open={isOpen}
				onClose={handleClose}
				position="right"
				className="max-w-[250px]"
			>
				<Drawer.Header title="Home" />
				<Drawer.Items className="flex flex-col pb-[20%] justify-between h-full ">
					<div className="flex flex-col gap-4">
						{promotionNavLinks.map((link) => (
							<Link key={link.label} href={`#${link.url}`}>
								{link.label}
							</Link>
						))}
					</div>
					<div className="sm:flex items-center gap-4  border">
						{user ? (
							<div className="flex items-center gap-4">
								<Avatar size="sm" rounded>
									{user.name}
								</Avatar>
								<Button size="sm" color="secondary" onClick={onLogout}>
									Logout
								</Button>
							</div>
						) : (
							<Button size="sm" color="primary" href="/sign-in">
								Login
							</Button>
						)}
					</div>
				</Drawer.Items>
			</Drawer>
		</>
	);
};

export default NavDrawer;
