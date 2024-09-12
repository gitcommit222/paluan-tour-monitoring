import Headerbox from "@/components/shared/HeaderBox";
import SpotsCard from "@/components/SpotsCard";
import { beach1, beach2, spot } from "@/public";
import { Button, Tooltip } from "flowbite-react";
import React from "react";

const Spots = () => {
	return (
		<section>
			<div className="flex justify-between items-center">
				<Headerbox title="Tourist Spots" subtext="Manage spots here." />
				<div>
					<Tooltip content="Add new spot">
						<Button href="/spots/new-spot/add" color="primary">
							NEW SPOT
						</Button>
					</Tooltip>
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
						owner="Alexis Cadahin"
					/>
				</div>
			</div>
		</section>
	);
};

export default Spots;
