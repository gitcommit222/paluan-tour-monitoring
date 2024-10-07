"use client";
import Headerbox from "@/components/shared/HeaderBox";
import SpotsCard from "@/components/SpotsCard";
import { useFetchSpots } from "@/hooks/useSpot";
import { beach1, beach2, spot } from "@/public";
import { Button, Tooltip } from "flowbite-react";
import React from "react";

const Spots = () => {
	const { data: spots, isLoading: isSpotListFetching } = useFetchSpots();
	return (
		<section>
			<div className="flex justify-between items-center">
				<Headerbox title="Tourist Spots" subtext="Manage spots here." />
				<div>
					<Tooltip content="Add new spot">
						<Button href="/spots/new-spot/add" color="gray">
							NEW SPOT
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className="flex flex-wrap gap-5">
				{spots &&
					!isSpotListFetching &&
					spots.resorts.map((spot) => (
						<div key={spot.id}>
							<SpotsCard
								headerTitle={spot?.name}
								imageUrl={spot?.thumbnail ? spot.thumbnail : beach1}
								description="Paluan, Occidental Mindoro"
								owner="Rheymark Estonanto"
								spotId={spot.id}
							/>
						</div>
					))}
			</div>
		</section>
	);
};

export default Spots;
