"use client";
import DataBox from "@/components/DataBox";
import Headerbox from "@/components/shared/HeaderBox";
import SpotReportsTable from "@/components/SpotReportsTable";
import { beach1, tourist } from "@/public";
import { Button, Table, Tooltip } from "flowbite-react";
import Image from "next/image";
import React from "react";

const SingeSpotPage = ({ params }) => {
	const { spotName } = params;
	const newSpotName = spotName.replace(/%20/g, " ");

	console.log(spotName);
	return (
		<section>
			<div className="flex justify-between items-center">
				<Headerbox
					title={newSpotName}
					subtext={`Here is the detailed analysis of ${newSpotName} data.`}
				/>
				<div>
					<Button href={`/spots/new-spot/edit/${1}`} color="primary">
						EDIT DETAILS
					</Button>
				</div>
			</div>
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
			<div>
				<div className="w-full gap-3 flex items-center justify-between py-4 flex-wrap">
					<DataBox title="Guests" />
					<DataBox color="green" title="Male Guests" />
					<DataBox color="orange" title="Female Guests" />
					<DataBox color="red" title="Children Guests" />
				</div>
			</div>
			<SpotReportsTable />
		</section>
	);
};

export default SingeSpotPage;
