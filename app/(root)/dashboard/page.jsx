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

		return {
			labels: months,
			datasets: spots.resorts.map((resort, index) => {
				const colors = [
					{ bg: "rgb(254 226 226)", border: "rgba(255, 99, 132, 1)" },
					{ bg: "rgba(54, 162, 235, 0.2)", border: "rgba(54, 162, 235, 1)" },
					{ bg: "rgba(75, 192, 192, 0.2)", border: "rgba(75, 192, 192, 1)" },
				];

				const resortTourists = Array.isArray(guests.tourists)
					? guests.tourists.filter(
							(tourist) => tourist && tourist.resortId === resort.id
					  )
					: [];

				const touristsByMonth = (resortTourists || []).reduce(
					(acc, tourist) => {
						if (!tourist?.createdAt) return acc;

						const month = new Date(tourist.createdAt).toLocaleString(
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
					backgroundColor: colors[index % colors.length].bg,
					borderColor: colors[index % colors.length].border,
					borderWidth: 1,
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
				},
			},
			x: {
				title: {
					display: true,
					text: "Months",
				},
			},
		},
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Number of Guests per Month for Different Resorts",
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
			<div className="flex flex-col lg:flex-row gap-4 mt-10">
				<div className="border p-5 w-full lg:w-3/5 rounded-lg overflow-hidden">
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
