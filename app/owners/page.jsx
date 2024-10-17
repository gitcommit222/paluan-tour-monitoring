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
import { getFirstWord } from "@/utils/getFirstWord";
import { Button, Label, Tabs, Textarea } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Home = () => {
	const [showReplyInput, setShowReplyInput] = useState(false);
	const { mutate: logout } = useLogout();
	const { data: user } = useFetchUser();
	const { data: resorts } = useFetchResortByOwner(user?.id);
	const [replyInputId, setReplyInputId] = useState(null);

	return (
		<ProtectedRoutes roles={["resortOwner", "admin"]}>
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
							user={`${user ? getFirstWord(user.name) : "Owner"}!`}
							title="Welcome,"
							type="greeting"
							subtext={`Manage and view ${
								resorts ? resorts?.resorts[0]?.name : "your spot"
							} data here.`}
						/>
					</div>
					<Tabs color="gray">
						{/* <Tabs.Item title="Dashboard"></Tabs.Item> */}
						<Tabs.Item title="Guests">
							<div className="flex gap-2">
								<div className="flex-1">
									<OwnersTable resortId={resorts?.resorts[0]?.id} />
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
						<Tabs.Item title="Resort Details">
							{resorts ? (
								<SpotDetailsForm data={resorts && resorts?.resorts[0]} />
							) : (
								<p className="text-center text-gray-500">No resort found.</p>
							)}
						</Tabs.Item>
						<Tabs.Item title="Ratings & Reviews">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<h2 className="text-2xl font-medium">
										3 REVIEWS OF {resorts?.resorts[0]?.name.toUpperCase()}
									</h2>
									<div className="flex items-center">
										<div className="text-yellow-400 text-2xl">★★★★☆</div>
										<span className="ml-2 text-gray-600">
											4.7 rating based on 3 ratings
										</span>
									</div>
								</div>
								<div className="space-y-4">
									{[
										{
											name: "Dave",
											date: "March 16, 2024 at 11:02 am",
											rating: 5,
											title: "The best almond latte in town!",
											content:
												"I always start my day with an almond latte from Marco's Cafe!",
										},
										{
											name: "Martha",
											date: "September 29, 2024 at 10:59 am",
											rating: 4,
											title: "Great atmosphere",
											content:
												"The staff are friendly and the coffee was good.",
										},
										{
											name: "Casey",
											date: "October 3, 2024 at 11:35 am",
											rating: 5,
											title: "Incredible coffee",
											content:
												"This place is fantastic! Best resort in town ☕",
										},
									].map((review, index) => (
										<div key={index} className="border-b pb-4">
											<div className="flex justify-between items-start">
												<div>
													<p className="font-semibold">
														{index + 1}. By {review.name}
													</p>
													<p className="text-sm text-gray-500">{review.date}</p>
													<div className="text-yellow-400">
														{"★".repeat(review.rating)}
														{"☆".repeat(5 - review.rating)}
													</div>
												</div>
												<div>
													<button
														onClick={() =>
															setReplyInputId(
																replyInputId === index ? null : index
															)
														}
														className="text-blue-500 hover:underline"
													>
														{replyInputId === index
															? "Cancel"
															: "Comment on this review"}
													</button>
												</div>
											</div>
											<div className="flex justify-between">
												<div>
													<h3 className="font-bold mt-2">{review.title}</h3>
													<p>{review.content}</p>
												</div>
												{replyInputId === index && (
													<div className="flex flex-col justify-end items-end">
														<Textarea
															id={`reply-${index}`}
															name={`reply-${index}`}
															placeholder="Reply to this review..."
															cols={50}
															rows={4}
														/>
														<Button className="mt-2 " color="primary">
															Send
														</Button>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</Tabs.Item>
					</Tabs>
				</div>
			</section>
		</ProtectedRoutes>
	);
};

export default Home;
