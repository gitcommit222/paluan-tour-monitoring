"use client";
import React from "react";
import Image from "next/image";
import { logo, logoutIcon } from "../public";
import Link from "next/link";
import { navLinks } from "../constants";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import CustomModal from "./shared/CustomModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Sidebar = () => {
	const pathname = usePathname();
	const { mutate: logout } = useLogout();
	return (
		<aside className="sidebar">
			<div className="flex size-full flex-col justify-between">
				<div className="flex flex-col gap-2">
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
										<Link
											href={item.url}
											className="sidebar-link"
											prefetch={true}
										>
											<Image
												src={item.icon}
												alt="nav items logo"
												width={18}
												height={18}
												className={`${
													isActive
														? "brightness-0 invert"
														: "brightness-0 invert"
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
				<div className="p-5">
					<div className="sidebar-nav_element sidebar-link group w-full text-gray-100 hover:text-primary rounded-md transition-colors">
						<CustomModal
							size="md"
							buttonName="LOGOUT"
							handleLogout={() => logout()}
							btnColor="transparent"
							mainContent={
								<div className="text-center">
									<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
									<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										Are you sure you want to logout?
									</h3>
								</div>
							}
							type="logout"
						/>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
