// components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = ({ data, title }) => {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
				labels: {
					font: {
						size: 14,
						weight: "bold",
					},
				},
			},
			title: {
				display: true,
				text: title,
				font: {
					size: 20,
					weight: "bold",
				},
				padding: {
					top: 10,
					bottom: 30,
				},
			},
			tooltip: {
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				titleFont: {
					size: 16,
				},
				bodyFont: {
					size: 14,
				},
				padding: 12,
				cornerRadius: 6,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 12,
					},
				},
			},
			y: {
				grid: {
					color: "rgba(0, 0, 0, 0.1)",
				},
				ticks: {
					font: {
						size: 12,
					},
				},
			},
		},
	};

	return (
		<div style={{ height: "400px", width: "100%" }}>
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
