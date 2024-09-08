import AddNewSpotForm from "@/components/AddNewSpotForm";
import Headerbox from "@/components/shared/HeaderBox";
import React from "react";

const AddNewSpotPage = () => {
	return (
		<section>
			<Headerbox title="New Spot Page" subtext="Create new spot here." />
			<div>
				<AddNewSpotForm />
			</div>
		</section>
	);
};

export default AddNewSpotPage;
