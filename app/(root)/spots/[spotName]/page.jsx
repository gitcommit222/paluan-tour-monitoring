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
			<div className="border w-full min-h-[250px] rounded-t-2xl relative shadow-sm">
				<Image
					src={beach1}
					alt="beachimage"
					fill
					className="object-cover rounded-t-2xl filter brightness-75 contrast-90"
				/>
				<h1 className="absolute text-white font-bold text-[65px] bottom-0 px-5">
					{newSpotName}
				</h1>
			</div>
			<div className="h-screen">
				<div className="w-full gap-3 flex items-center justify-between py-4 flex-wrap">
					<DataBox title="Guests" />
					<DataBox color="green" title="Male Guests" />
					<DataBox color="orange" title="Female Guests" />
					<DataBox color="red" title="Children Guests" />
				</div>
			</div>
		</section>
	);
};

export default SingeSpotPage;
