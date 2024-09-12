import SpotDetailsForm from "@/components/SpotDetailsForm";
import Headerbox from "@/components/shared/HeaderBox";
import React from "react";
import { notFound } from "next/navigation";

const AddNewSpotPage = ({ params }) => {
	const pageType = params.slug[0];
	const spotId = params.slug?.[1];

	if (params.slug[0] !== "add" && !params.slug.includes("edit")) notFound();

	if (params.slug.includes("edit") && params.slug.length <= 1) notFound();

	let data = null;
	return (
		<section>
			<Headerbox
				title={`${pageType} Spot Page`}
				subtext="Create new spot here."
			/>
			<div>
				<SpotDetailsForm data={spotId && data} />
			</div>
		</section>
	);
};

export default AddNewSpotPage;
