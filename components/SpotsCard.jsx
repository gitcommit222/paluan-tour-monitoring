"use client";
import { truncateText } from "@/utils/truncateText";
import { Button, Card, Rating, Tooltip } from "flowbite-react";
import Image from "next/image";

import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import Link from "next/link";
import { useDeleteResort } from "@/hooks/useSpot";
import toast from "react-hot-toast";
import CustomPopOver from "@/components/shared/CustomPopOver";

const SpotsCard = ({
	imageUrl,
	headerTitle,
	description,
	owner = "Unknown",
	spotId,
}) => {
	const { mutateAsync: deleteSpot, isPending: isDeleteResortPending } =
		useDeleteResort();

	const handleDeleteSpot = async (spotId) => {
		try {
			await toast.promise(deleteSpot(spotId), {
				success: "Spot deleted!",
				loading: "Deleting spot...",
				error: "Error deleting spot.",
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="max-w-[300px] min-w-[330px] rounded-xl shadow-md">
			<div className="border w-full h-[250px] rounded-t-xl  relative">
				<Image
					src={imageUrl}
					fill
					alt="spot image"
					className="rounded-t-xl object-cover"
				/>
			</div>
			<div className="space-y-1 p-4">
				<div className="flex items-center justify-between">
					<h5 className="text-[18px] font-bold tracking-wide text-gray-900 ">
						{headerTitle}
					</h5>
					<div className="py-1 rounded-sm hover:bg-gray-50">
						<CustomPopOver
							trigger="hover"
							button={
								<button>
									<BsThreeDotsVertical />
								</button>
							}
							mainContent={
								<div className="flex gap-1 flex-col justify-center items-center">
									<Tooltip content="View Details" placement="right">
										<Link href={`/spots/${spotId}`}>
											<MdPreview className="text-green-500" size={19} />
										</Link>
									</Tooltip>
									<Tooltip content="Edit" placement="right">
										<Link href={`/spots/new-spot/edit/${spotId}`}>
											<CiEdit className="text-blue-400" size={20} />
										</Link>
									</Tooltip>
									<Tooltip content="Delete" placement="right">
										<button onClick={() => handleDeleteSpot(spotId)}>
											<FaRegTrashCan className="text-red-500" />
										</button>
									</Tooltip>
								</div>
							}
						/>
					</div>
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
		</div>
	);
};

export default SpotsCard;
