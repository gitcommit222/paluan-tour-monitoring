import AddNewSpotForm from "@/components/AddNewSpotForm";
import CustomModal from "@/components/shared/CustomModal";
import Headerbox from "@/components/shared/HeaderBox";
import SpotsCard from "@/components/SpotsCard";
import { beach1, beach2 } from "@/public";
import { Button } from "flowbite-react";
import React from "react";

const Spots = () => {
	return (
		<section>
			<div className="flex justify-between items-center">
				<Headerbox title="Tourist Spots" subtext="Manage spots here." />
				<div>
					<CustomModal
						headerTitle="ADD SPOT FORM"
						buttonName="ADD SPOT"
						yesLabel="Save"
						noLabel="Cancel"
						mainContent={<AddNewSpotForm />}
					/>
				</div>
			</div>
			<div className="flex flex-wrap gap-5">
				<div>
					<SpotsCard
						headerTitle="Calawagan Resort"
						imageUrl={beach1}
						description="Paluan, Occidental Mindoro"
						owner="Rheymark Estonanto"
					/>
				</div>
				<div>
					<SpotsCard
						headerTitle="Maslud Cove"
						imageUrl={beach2}
						description="Paluan, Occidental Mindoro"
						owner="Alexis Cadalin"
					/>
				</div>
			</div>
		</section>
	);
};

export default Spots;
