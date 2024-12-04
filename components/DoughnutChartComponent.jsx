// components/DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetGuests } from "@/hooks/useGuest";
import { useFetchSpots } from "@/hooks/useSpot";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const { data: guests } = useGetGuests();
	const { data: spots } = useFetchSpots();

	// Early return if data is not available
	if (!guests?.tourists || !spots?.resorts) {
		return <div>Loading...</div>;
	}

	// Calculate guests per resort
	const resortsData = spots.resorts.map((resort) => {
		const guestCount = guests.tourists.filter(
			(tourist) => tourist.resortId === resort.id
		).length;

		return {
			name: resort.name,
			guests: guestCount,
		};
	});

	// Add safety check for empty array
	if (resortsData.length === 0) {
		return <div>No resort data available</div>;
	}

	const maxGuestsResort = resortsData.reduce(
		(max, resort) => (resort.guests > max.guests ? resort : max),
		resortsData[0] // Provide initial value
	);

	const data = {
		labels: resortsData.map((resort) => resort.name),
		datasets: [
			{
				label: "Number of Guests",
				data: resortsData.map((resort) => resort.guests),
				backgroundColor: resortsData.map(
					(resort) =>
						resort.name === maxGuestsResort.name
							? "rgba(255, 99, 132, 0.6)" // Highlight color
							: "rgba(54, 162, 235, 0.6)" // Default color
				),
				borderColor: resortsData.map(
					(resort) =>
						resort.name === maxGuestsResort.name
							? "rgba(255, 99, 132, 1)" // Highlight border color
							: "rgba(54, 162, 235, 1)" // Default border color
				),
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: `Highlighting Resort with Most Guests: ${maxGuestsResort.name}`,
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
