import { Rating } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaBus } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

const Place = ({ imgUrl }) => {
	return (
		<div className="prom-spot-box">
			<div className="relative w-full h-[65%]">
				<Image
					src={imgUrl}
					alt="place1"
					fill
					className="object-cover rounded-xl"
				/>
			</div>
			<div className="flex justify-between py-2 space-y-2">
				<div className="space-y-1">
					<h3 className="font-medium text-[23px] tracking-wide">Spot Name</h3>
					<p className="text-gray-400 text-[12px] font-light">Description...</p>
				</div>
				<div className="space-y-1 flex flex-col items-end">
					<Rating>
						<Rating.Star className="text-secondary" />
						<Rating.Star className="text-secondary" />
						<Rating.Star className="text-secondary" />
						<Rating.Star className="text-secondary" />
						<Rating.Star filled={false} />
					</Rating>
					<p className="text-[14px] font-light">4.0 Ratings</p>
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
					<button className="flex rounded-md items-center gap-1 text-white bg-secondary px-4 tracking-wide py-2 text-[12px] font-normal">
						Visit
						<GoArrowUpRight size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Place;
