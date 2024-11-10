"use client";
import { navLinks } from "@/constants";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const NavDrawer = () => {
	const [isOpen, setIsOpen] = useState(true);

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
						{navLinks.map((link) => (
							<div key={link.label} href={link.url}>
								{link.label}
							</div>
						))}
					</div>
				</Drawer.Items>
			</Drawer>
		</>
	);
};

export default NavDrawer;
