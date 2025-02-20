"use client";
import BarChart from "@/components/BarChartComponent";
import DataBox from "@/components/DataBox";
import DoughnutChart from "@/components/DoughnutChartComponent";
import Headerbox from "@/components/shared/HeaderBox";
import { useFetchUser } from "@/hooks/useAuth";
import { female, male, spot, tourist } from "@/public";
import { Button, Tooltip } from "flowbite-react";
import React, { useRef } from "react";
import { getFirstWord } from "@/utils/getFirstWord";
import { useGetGuests } from "@/hooks/useGuest";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useFetchSpots } from "@/hooks/useSpot";

const Dashboard = () => {
	const { data: user } = useFetchUser();
	const { data: guests } = useGetGuests();
	const { data: spots } = useFetchSpots();
	const dashboardRef = useRef(null);

	const totalTourists = guests ? guests.tourists.length : 0;
	const maleTourists = guests
		? guests.tourists.filter((guest) => guest?.gender === "Male").length
		: 0;
	const femaleTourists = guests
		? guests.tourists.filter((guest) => guest?.gender === "Female").length
		: 0;

	const handleExport = async () => {
		if (dashboardRef.current) {
			const canvas = await html2canvas(dashboardRef.current);
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("l", "mm", "a4");
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
			pdf.save("dashboard.pdf");
		}
	};

	const prepareChartData = () => {
		if (!spots?.resorts || !guests?.tourists) {
			return {
				labels: [],
				datasets: [],
			};
		}

		const months = Array.from({ length: 12 }, (_, i) => {
			return new Date(2024, i).toLocaleString("default", { month: "long" });
		});

		// Premium color palette with gradient effect
		const gradientColors = [
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

		return {
			labels: months,
			datasets: spots.resorts.map((resort, index) => {
				const resortTourists = Array.isArray(guests.tourists)
					? guests.tourists.filter(
							(tourist) => tourist && tourist.resortId === resort.id
					  )
					: [];

				const touristsByMonth = (resortTourists || []).reduce(
					(acc, tourist) => {
						if (!tourist?.visitDate) return acc;

						const month = new Date(tourist.visitDate).toLocaleString(
							"default",
							{
								month: "long",
							}
						);
						acc[month] = (acc[month] || 0) + 1;
						return acc;
					},
					{}
				);

				return {
					label: resort.name,
					data: months.map((month) => touristsByMonth[month] || 0),
					backgroundColor: gradientColors[index % gradientColors.length].bg,
					borderColor: gradientColors[index % gradientColors.length].border,
					borderWidth: 1.5,
					borderRadius: 4,
					barThickness: 16,
					maxBarThickness: 20,
				};
			}),
		};
	};

	const chartData = prepareChartData();

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Number of Guests",
					padding: { bottom: 10 },
					font: {
						size: 13,
						weight: 500,
					},
					color: "#64748b",
				},
				grid: {
					color: "rgba(226, 232, 240, 0.8)",
					drawBorder: false,
				},
				ticks: {
					padding: 10,
					color: "#64748b",
					font: {
						size: 11,
					},
				},
				border: {
					display: false,
				},
			},
			x: {
				title: {
					display: true,
					text: "Months",
					padding: { top: 10 },
					font: {
						size: 13,
						weight: 500,
					},
					color: "#64748b",
				},
				grid: {
					display: false,
				},
				ticks: {
					padding: 5,
					color: "#64748b",
					font: {
						size: 11,
					},
				},
				border: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				position: "top",
				align: "center",
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
				text: "Resort Guest Distribution",
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
			},
		},
	};

	return (
		<section className="p-4 max-w-full overflow-x-hidden" ref={dashboardRef}>
			<div className="flex flex-col sm:flex-row justify-between items-center mb-1">
				<Headerbox
					type="greeting"
					title="Hello,"
					user={`${user && getFirstWord(user.name)}!`}
					subtext="Track tourist spots progress here."
				/>
				<Tooltip content="Export as PDF" className="mt-4 sm:mt-0">
					<Button color="primary" onClick={handleExport}>
						EXPORT
					</Button>
				</Tooltip>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
				<DataBox
					icon={spot}
					title="Tourists Spots"
					data={spots?.resorts?.length}
					color="blue"
				/>
				<DataBox
					icon={tourist}
					title="Total Tourist"
					data={totalTourists.toString()}
					color="green"
				/>
				<DataBox
					icon={male}
					title="Male Tourist"
					data={maleTourists.toString()}
					color="red"
				/>
				<DataBox
					icon={female}
					title="Female Tourist"
					data={femaleTourists.toString()}
					color="yellow"
				/>
			</div>
			<div className="flex flex-col gap-4 mt-10">
				<div className="border p-5 w-full rounded-lg overflow-hidden">
					<BarChart
						data={chartData}
						options={options}
						title="Resort Guest Distribution"
					/>
				</div>
				<div className="border p-5 h-[400px] lg:h-[500px] w-full lg:w-2/5 rounded-lg overflow-hidden">
					<DoughnutChart />
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
