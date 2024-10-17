"use client";
import React, { useState, useEffect } from "react";
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

const BarChart = ({ data, title = "Resort Progress" }) => {
	const [selectedMonth, setSelectedMonth] = useState("all");
	const [selectedResort, setSelectedResort] = useState("all");
	const [filteredData, setFilteredData] = useState(data);

	// Filter data based on selected month and resort
	useEffect(() => {
		const filtered = data.datasets
			.map((dataset) => ({
				...dataset,
				data: dataset.data.filter((_, index) => {
					const monthMatch =
						selectedMonth === "all" ||
						data.labels[index].includes(selectedMonth);
					const resortMatch =
						selectedResort === "all" || dataset.label === selectedResort;
					return monthMatch && resortMatch;
				}),
			}))
			.filter((dataset) => dataset.data.length > 0);

		setFilteredData({
			labels: data.labels.filter((label, index) => {
				const monthMatch =
					selectedMonth === "all" || label.includes(selectedMonth);
				const resortMatch =
					selectedResort === "all" ||
					filtered.some((d) => d.data[index] !== undefined);
				return monthMatch && resortMatch;
			}),
			datasets: filtered,
		});
	}, [data, selectedMonth, selectedResort]);

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
		<div
			className="rounded-lg p-6 
		"
		>
			<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				{title}
			</h2>
			<div className="flex justify-between mb-6">
				<div className="flex items-center">
					<label
						htmlFor="month-select"
						className="mr-2 font-semibold text-gray-700"
					>
						Month:
					</label>
					<select
						id="month-select"
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
						className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All Months</option>
						<option value="Jan">January</option>
						<option value="Feb">February</option>
						{/* ... other months ... */}
					</select>
				</div>
				<div className="flex items-center">
					<label
						htmlFor="resort-select"
						className="mr-2 font-semibold text-gray-700"
					>
						Resort:
					</label>
					<select
						id="resort-select"
						value={selectedResort}
						onChange={(e) => setSelectedResort(e.target.value)}
						className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All Resorts</option>
						{data.datasets.map((dataset, index) => (
							<option key={index} value={dataset.label}>
								{dataset.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="bg-white rounded-lg p-4 shadow-inner h-[400px]">
				<Bar data={filteredData} options={options} />
			</div>
		</div>
	);
};

export default BarChart;
