"use client";
import { truncateText } from "@/utils/truncateText";
import { Button, Card, Rating, Tooltip } from "flowbite-react";
import Image from "next/image";

import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomPopover from "./shared/CustomPopOver";
import { MdPreview } from "react-icons/md";
import Link from "next/link";

const SpotsCard = ({
	imageUrl,
	headerTitle,
	description,
	owner = "Unknown",
}) => {
	return (
		<Card className="max-w-[300px] min-w-[280px] rounded-lg">
			<div className="border w-full h-[250px] relative">
				<Image src={imageUrl} objectFit="cover" fill alt="spot image" />
			</div>
			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<h5 className="text-[18px] font-bold tracking-wide text-gray-900 ">
						{headerTitle}
					</h5>
					<div className="py-1 rounded-sm hover:bg-gray-50">
						<CustomPopover
							trigger="hover"
							button={
								<button>
									<BsThreeDotsVertical />
								</button>
							}
							mainContent={
								<div className="flex gap-1 flex-col justify-center items-center">
									<Tooltip content="View Details" placement="right">
										<Link href={`/spots/${headerTitle}`}>
											<MdPreview className="text-green-500" size={19} />
										</Link>
									</Tooltip>
									<Tooltip content="Edit" placement="right">
										<button>
											<CiEdit className="text-blue-400" size={20} />
										</button>
									</Tooltip>
									<Tooltip content="Delete" placement="right">
										<button>
											<FaRegTrashCan className="text-red-500" />
										</button>
									</Tooltip>
								</div>
							}
						/>
					</div>
				</div>
				<div>
					<Rating>
						<Rating.Star />
						<Rating.Star />
						<Rating.Star />
						<Rating.Star />
						<Rating.Star filled={false} />
					</Rating>
				</div>
				<div>
					<p className="text-[12px] text-gray-500">
						Owned by{" "}
						<span className="font-semibold tracking-wider"> {owner}</span>
					</p>
				</div>
				<p className="font-normal text-gray-700 text-[12px]">
					{truncateText(description, 80)}
				</p>
			</div>
		</Card>
	);
};

export default SpotsCard;
