"use client";
import SpotDetailsForm from "@/components/SpotDetailsForm";
import Headerbox from "@/components/shared/HeaderBox";
import React from "react";
import { notFound } from "next/navigation";
import { useFetchSingleSpot } from "@/hooks/useSpot";

const AddNewSpotPage = ({ params }) => {
	const pageType = params.slug[0];
	const spotId = params.slug?.[1];

	if (params.slug[0] !== "add" && !params.slug.includes("edit")) notFound();

	if (params.slug.includes("edit") && params.slug.length <= 1) notFound();

	const { data: spot, isLoading: isSpotLoading } = useFetchSingleSpot(spotId);

	if (spot && !isSpotLoading) console.log(spot.result);

	return (
		<section>
			<Headerbox
				title={`${pageType} Spot Page`}
				subtext="Create new spot here."
			/>
			<div>
				<SpotDetailsForm data={spotId && spot && spot.result} />
			</div>
		</section>
	);
};

export default AddNewSpotPage;
