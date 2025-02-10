import { Rating } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBus, FaPlaneDeparture, FaCar } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useFetchRatingsByResort } from "../../hooks/useReview";
import { truncateText } from "@/utils/truncateText";

const Place = ({ id, thumbnail, name, description }) => {
	const { data: ratings } = useFetchRatingsByResort(id);

	const averageRating =
		ratings?.data?.length > 0
			? (
					ratings.data.reduce((acc, curr) => acc + curr.rating, 0) /
					ratings.data.length
			  ).toFixed(1)
			: 0;

	return (
		<div className="prom-spot-box">
			<div className="relative w-full h-[55%]">
				<Image
					src={thumbnail}
					alt="place1"
					fill
					className="object-cover rounded-xl"
				/>
			</div>
			<div className="flex justify-between py-2 space-y-2">
				<div className="space-y-1">
					<h3 className="font-medium text-[18px] tracking-wide">{name}</h3>
					<p className="text-gray-400 text-[12px] font-light">
						{truncateText(description, 80)}
					</p>
				</div>
				<div className="space-y-1 flex flex-col items-end">
					<Rating>
						{[...Array(5)].map((_, index) => (
							<Rating.Star
								key={index}
								className={
									index < Math.floor(averageRating)
										? "text-secondary"
										: "text-accent"
								}
								filled={true}
							/>
						))}
					</Rating>
					<p className="text-[14px] font-light">
						{ratings?.data?.length > 0
							? `${averageRating} (${ratings.data.length} rating/s)`
							: "No ratings yet"}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-between mt-2">
				<div className="flex items-center gap-2 ">
					<div className="p-2 rounded-full bg-primary">
						<FaBus size={14} className="text-white" />
					</div>
					<div className="p-2 rounded-full bg-primary">
						<FaPlaneDeparture size={14} className="text-white" />
					</div>
					<div className="p-2 rounded-full bg-primary">
						<FaCar size={14} className="text-white" />
					</div>
				</div>
				<div>
					<Link
						href={`/${id}`}
						className="flex rounded-md items-center gap-1 text-white bg-secondary px-4 tracking-wide py-2 text-[12px] font-normal"
					>
						Visit
						<GoArrowUpRight size={16} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Place;
