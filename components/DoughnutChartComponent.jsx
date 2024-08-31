// components/DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const resortsData = [
		{ name: "Resort 1", guests: 190 },
		{ name: "Resort 2", guests: 170 },
		{ name: "Resort 3", guests: 140 },
	];

	const maxGuestsResort = resortsData.reduce((max, resort) =>
		resort.guests > max.guests ? resort : max
	);

	const data = {
		labels: resortsData.map((resort) => resort.name),
		datasets: [
			{
				label: "Number of Guests in July",
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
				text: `Highlighting Resort with Most Guests in July: ${maxGuestsResort.name}`,
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
