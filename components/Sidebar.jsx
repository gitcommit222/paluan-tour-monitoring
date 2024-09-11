"use client";
import React from "react";
import Image from "next/image";
import { logo } from "../public";
import Link from "next/link";
import { navLinks } from "../constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
	const pathname = usePathname();
	return (
		<aside className="sidebar">
			<div className="flex size-full flex-col gap-2">
				<div className="border-b p-5 flex items-center justify-center">
					<Link href="/">
						<Image
							src={logo}
							alt="logo"
							width={400}
							height={250}
							objectFit="contain"
						/>
					</Link>
				</div>
				<nav className="sidebar-nav ">
					<ul className="sidebar-nav_elements">
						{navLinks.map((item) => {
							const isActive =
								pathname === item.url || pathname?.startsWith(`${item.url}/`);

							return (
								<li
									key={item.url}
									className={`sidebar-nav_element group ${
										isActive
											? " bg-primary rounded-md text-white"
											: "text-gray-100"
									}`}
								>
									<Link href={item.url} className="sidebar-link">
										<Image
											src={item.icon}
											alt="nav items logo"
											width={18}
											height={18}
											className={`${
												isActive ? "brightness-0 invert" : "brightness-0 invert"
											}`}
										/>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
