import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetGuests } from "@/hooks/useGuest";
import { useFetchSpots } from "@/hooks/useSpot";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const { data: guests } = useGetGuests();
	const { data: spots } = useFetchSpots();

	if (!guests?.tourists || !spots?.resorts) {
		return <div>Loading...</div>;
	}

	// Define colors matching BarChart
	const colors = [
		{ bg: "rgb(219 234 254)", border: "rgb(59 130 246)" }, // blue-100, blue-500
		{ bg: "rgb(220 252 231)", border: "rgb(34 197 94)" }, // green-100, green-500
		{ bg: "rgb(254 226 226)", border: "rgb(239 68 68)" }, // red-100, red-500
		{ bg: "rgb(254 249 195)", border: "rgb(234 179 8)" }, // yellow-100, yellow-500
		{ bg: "rgb(237 233 254)", border: "rgb(139 92 246)" }, // purple-100, purple-500
		{ bg: "rgb(251 207 232)", border: "rgb(236 72 153)" }, // pink-100, pink-500
	];

	const resortsData = spots.resorts.map((resort) => {
		const guestCount = guests.tourists.filter(
			(tourist) => tourist.resortId === resort.id
		).length;

		return {
			name: resort.name,
			guests: guestCount,
		};
	});

	if (resortsData.length === 0) {
		return <div>No resort data available</div>;
	}

	const maxGuestsResort = resortsData.reduce(
		(max, resort) => (resort.guests > max.guests ? resort : max),
		resortsData[0]
	);

	const data = {
		labels: resortsData.map((resort) => resort.name),
		datasets: [
			{
				label: "Number of Guests",
				data: resortsData.map((resort) => resort.guests),
				backgroundColor: resortsData.map(
					(_, index) => colors[index % colors.length].bg
				),
				borderColor: resortsData.map(
					(_, index) => colors[index % colors.length].border
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
				text: `Resort Guest Distribution`,
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
