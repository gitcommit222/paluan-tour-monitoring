"use client";
import AddGuestForm from "@/components/AddGuestForm";
import OwnersTable from "@/components/OwnersTable";
import CustomModal from "@/components/shared/CustomModal";
import Headerbox from "@/components/shared/HeaderBox";
import SpotDetailsForm from "@/components/SpotDetailsForm";
import ProtectedRoutes from "@/hoc/ProtectedRoutes";
import { useFetchUser, useLogout } from "@/hooks/useAuth";
import { useFetchResortByOwner } from "@/hooks/useSpot";
import { logo } from "@/public";
import { Tabs } from "flowbite-react";
import Image from "next/image";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Home = () => {
	const { mutate: logout } = useLogout();
	const { data: user } = useFetchUser();
	const { data: resorts } = useFetchResortByOwner(user?.id);
	console.log(resorts);
	return (
		<ProtectedRoutes roles={["resortOwner", ""]}>
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
							<CustomModal
								size="md"
								buttonName="LOGOUT"
								btnColor="secondary"
								handleLogout={() => logout()}
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
						</ul>
					</nav>
				</div>
				<div className="px-[100px] py-[25px]">
					<div>
						<Headerbox
							user={`${user ? user.name : "Owner"}`}
							title="Welcome,"
							type="greeting"
							subtext="Manage and view your spot data here."
						/>
					</div>
					<Tabs color="gray">
						<Tabs.Item title="Guests">
							<div className="flex gap-2">
								<div className="flex-1">
									<OwnersTable />
								</div>
								<div className="border rounded-lg max-w-[350px] p-5 space-y-5">
									<div className="flex justify-between items-center flex-wrap">
										<h3 className="font-semibold text-[18px] mb-2">
											Add Guests
										</h3>
										<div>
											<p className="text-red-500 text-[14px]">
												* required fields.
											</p>
										</div>
									</div>
									<AddGuestForm />
								</div>
							</div>
						</Tabs.Item>
						<Tabs.Item title="Resort">
							<SpotDetailsForm data={resorts && resorts.resorts[0]} />
						</Tabs.Item>
					</Tabs>
				</div>
			</section>
		</ProtectedRoutes>
	);
};

export default Home;
