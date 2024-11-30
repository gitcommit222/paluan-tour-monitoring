"use client";
import { navLinks, promotionNavLinks } from "@/constants";
import { Drawer } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const NavDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<>
			<div className="flex min-h-[50vh] items-center justify-center">
				<button onClick={() => setIsOpen(true)}>
					<IoMenu size={30} />
				</button>
			</div>
			<Drawer open={isOpen} onClose={handleClose} position="right">
				<Drawer.Header title="Home" />
				<Drawer.Items>
					<div className="flex flex-col gap-4">
						{promotionNavLinks.map((link) => (
							<Link key={link.label} href={`#${link.url}`}>
								{link.label}
							</Link>
						))}
					</div>
				</Drawer.Items>
			</Drawer>
		</>
	);
};

export default NavDrawer;
