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

const BarChart = ({ data, options, title = "Resort Progress", showResortFilter = true }) => {
	const [selectedMonth, setSelectedMonth] = useState("all");
	const [selectedResort, setSelectedResort] = useState("all");
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		if (!data?.datasets) return;

		let filtered = {
			labels: [...data.labels],
			datasets: [...data.datasets],
		};

		// Filter by month
		if (selectedMonth !== "all") {
			const monthIndex = data.labels.findIndex((label) =>
				label.toLowerCase().startsWith(selectedMonth.toLowerCase())
			);

			filtered.labels = [data.labels[monthIndex]];
			filtered.datasets = data.datasets.map((dataset) => ({
				...dataset,
				data: [dataset.data[monthIndex]],
			}));
		}

		// Filter by resort
		if (selectedResort !== "all") {
			filtered.datasets = filtered.datasets.filter(
				(dataset) => dataset.label === selectedResort
			);
		}

		setFilteredData(filtered);
	}, [data, selectedMonth, selectedResort]);

	return (
		<div className="rounded-lg p-6">
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
						{data?.labels?.map((month, index) => (
							<option key={index} value={month}>
								{month}
							</option>
						))}
					</select>
				</div>
				{showResortFilter && (
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
							{data?.datasets?.map((dataset, index) => (
								<option key={index} value={dataset.label}>
									{dataset.label}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			<div className="bg-white rounded-lg p-4 shadow-inner h-[400px]">
				<Bar data={filteredData} options={options} />
			</div>
		</div>
	);
};

export default BarChart;
