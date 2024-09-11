"use client";
import DataBox from "@/components/DataBox";
import CustomCarousel from "@/components/shared/CustomCarousel";
import Headerbox from "@/components/shared/HeaderBox";
import { beach1, tourist } from "@/public";
import { Table } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingeSpotPage = ({ params }) => {
	const { spotName } = params;
	const newSpotName = spotName.replace("%20", " ");
	return (
		<section>
			<Headerbox
				title={newSpotName}
				subtext={`Here is the detailed analysis of ${newSpotName} data.`}
			/>
			<div className="border w-full min-h-[250px] rounded-t-2xl relative p-5">
				<Image
					src={beach1}
					alt="beachimage"
					fill
					className="object-cover rounded-t-2xl"
				/>
				<h1 className="z-100 absolute text-[100px] font-bold">{newSpotName}</h1>
			</div>
		</section>
	);
};

export default SingeSpotPage;
