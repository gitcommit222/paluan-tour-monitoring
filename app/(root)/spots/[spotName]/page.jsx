"use client";
import DataBox from "@/components/DataBox";
import Headerbox from "@/components/shared/HeaderBox";
import SpotReportsTable from "@/components/SpotReportsTable";
import { useGetTouristByResortId } from "@/hooks/useGuest";
import { useFetchSingleSpot } from "@/hooks/useSpot";
import { beach1, child, female, male, tourist } from "@/public";
import { Button, Table, Tooltip } from "flowbite-react";
import Image from "next/image";
import React from "react";
import BarChart from "@/components/BarChartComponent";
import { useFetchRatingsByResort } from "@/hooks/useReview";

const SingeSpotPage = ({ params }) => {
	const { spotName } = params;

	const { data: tourists } = useGetTouristByResortId(parseInt(spotName));

	const { data: resort } = useFetchSingleSpot(parseInt(spotName));

	const { data: ratings } = useFetchRatingsByResort({
		resortId: parseInt(spotName),
	});

	console.log(ratings);

	const totalGuests = tourists?.tourists.length;
	const maleGuests = tourists?.tourists.filter(
		(tourist) => tourist.gender === "Male"
	).length;
	const femaleGuests = tourists?.tourists.filter(
		(tourist) => tourist.gender === "Female"
	).length;
	const childrenGuests = tourists?.tourists.filter(
		(tourist) => tourist.age < 18
	).length;

	const chartData = {
		labels: [
			"Jan 2024",
			"Feb 2024",
			"Mar 2024",
			"Apr 2024",
			"May 2024",
			"Jun 2024",
			"Jul 2024",
			"Aug 2024",
			"Sep 2024",
			"Oct 2024",
			"Nov 2024",
			"Dec 2024",
		],
		datasets: [
			{
				label: resort?.result.name || "Resort",
				data: tourists?.tourists.reduce(
					(acc, tourist) => {
						const visitDate = new Date(tourist.visitDate);
						const monthIndex = visitDate.getMonth();
						acc[monthIndex] = (acc[monthIndex] || 0) + 1;
						return acc;
					},
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor: "rgba(54, 162, 235, 0.5)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
		],
	};

	return (
		<section>
			<div className="flex justify-between items-center">
				<Headerbox
					title={resort?.result.name}
					subtext={`Here is the detailed analysis of ${resort?.result.name} data.`}
				/>
				<div>
					<Button href={`/spots/new-spot/edit/${1}`} color="primary">
						EDIT DETAILS
					</Button>
				</div>
			</div>
			<div className="border w-full min-h-[250px] rounded-t-2xl relative shadow-sm">
				<Image
					src={resort?.result.thumbnail}
					alt="beachimage"
					fill
					className="object-cover rounded-t-2xl filter brightness-75 contrast-90"
				/>
				<h1 className="absolute text-white font-bold text-[65px] bottom-0 px-5">
					{resort?.result.name}
				</h1>
			</div>
			<div>
				<div className="w-full gap-3 flex items-center justify-between py-4 flex-wrap">
					<DataBox title="Guests" data={totalGuests} icon={tourist} />
					<DataBox
						color="green"
						title="Male Guests"
						data={maleGuests}
						icon={male}
					/>
					<DataBox
						color="orange"
						title="Female Guests"
						data={femaleGuests}
						icon={female}
					/>
					<DataBox
						color="red"
						title="Children Guests"
						data={childrenGuests}
						icon={child}
					/>
				</div>

				<div className="mt-8">
					<BarChart
						data={chartData}
						title={`${resort?.result.name || "Resort"} Monthly Progress`}
					/>
				</div>
			</div>
		</section>
	);
};

export default SingeSpotPage;
