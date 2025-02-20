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
		return (
			<div className="flex items-center justify-center h-full text-slate-500">
				Loading...
			</div>
		);
	}

	// Premium color palette matching the bar chart
	const colors = [
		{ bg: "rgba(101, 116, 205, 0.2)", border: "rgb(101, 116, 205)" }, // Royal Blue
		{ bg: "rgba(89, 193, 189, 0.2)", border: "rgb(89, 193, 189)" }, // Teal
		{ bg: "rgba(176, 132, 199, 0.2)", border: "rgb(176, 132, 199)" }, // Lavender
		{ bg: "rgba(255, 181, 152, 0.2)", border: "rgb(255, 181, 152)" }, // Peach
		{ bg: "rgba(149, 175, 192, 0.2)", border: "rgb(149, 175, 192)" }, // Steel Blue
		{ bg: "rgba(134, 168, 132, 0.2)", border: "rgb(134, 168, 132)" }, // Sage
		{ bg: "rgba(205, 164, 133, 0.2)", border: "rgb(205, 164, 133)" }, // Warm Beige
		{ bg: "rgba(182, 184, 220, 0.2)", border: "rgb(182, 184, 220)" }, // Periwinkle
		{ bg: "rgba(157, 193, 170, 0.2)", border: "rgb(157, 193, 170)" }, // Mint
		{ bg: "rgba(203, 158, 175, 0.2)", border: "rgb(203, 158, 175)" }, // Dusty Rose
	];

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
		return (
			<div className="flex items-center justify-center h-full text-slate-500">
				No resort data available
			</div>
		);
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
				backgroundColor: resortsData.map((resort, index) =>
					resort.name === maxGuestsResort.name
						? colors[0].bg // Highlight color (Royal Blue)
						: colors[(index + 1) % colors.length].bg
				),
				borderColor: resortsData.map((resort, index) =>
					resort.name === maxGuestsResort.name
						? colors[0].border // Highlight border (Royal Blue)
						: colors[(index + 1) % colors.length].border
				),
				borderWidth: 1.5,
				hoverBorderWidth: 2,
				hoverOffset: 8,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "70%",
		plugins: {
			legend: {
				position: "top",
				align: "start",
				labels: {
					padding: 15,
					usePointStyle: true,
					pointStyle: "circle",
					font: {
						size: 11,
					},
					color: "#64748b",
				},
			},
			title: {
				display: true,
				text: `Most Popular Resort: ${maxGuestsResort.name}`,
				padding: {
					top: 10,
					bottom: 25,
				},
				font: {
					size: 15,
					weight: 600,
				},
				color: "#334155",
			},
			tooltip: {
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				titleColor: "#334155",
				bodyColor: "#64748b",
				bodyFont: {
					size: 11,
				},
				titleFont: {
					size: 12,
					weight: 600,
				},
				padding: 12,
				borderColor: "rgba(226, 232, 240, 0.8)",
				borderWidth: 1,
				boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
				usePointStyle: true,
				callbacks: {
					label: function (context) {
						const label = context.label || "";
						const value = context.raw || 0;
						const total = context.dataset.data.reduce(
							(acc, curr) => acc + curr,
							0
						);
						const percentage = ((value / total) * 100).toFixed(1);
						return `${label}: ${value} guests (${percentage}%)`;
					},
				},
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
