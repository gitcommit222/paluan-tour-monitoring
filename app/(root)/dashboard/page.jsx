"use client";
import BarChart from "@/components/BarChartComponent";
import DataBox from "@/components/DataBox";
import DoughnutChart from "@/components/DoughnutChartComponent";
import Headerbox from "@/components/shared/HeaderBox";
import { useFetchUser } from "@/hooks/useAuth";
import { female, male, spot, tourist } from "@/public";
import { Button, Tooltip } from "flowbite-react";
import React, { useRef, useState } from "react";
import { getFirstWord } from "@/utils/getFirstWord";
import { useGetGuests } from "@/hooks/useGuest";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useFetchSpots } from "@/hooks/useSpot";
import Loader from "@/components/Loader";
import Weather from "@/components/Weather";

const Dashboard = () => {
	const { data: user, isLoading: isUserLoading } = useFetchUser();
	const { data: guests, isLoading: isGuestsLoading } = useGetGuests();
	const { data: spots, isLoading: isSpotsLoading } = useFetchSpots();
	const dashboardRef = useRef(null);
	const [timeFilter, setTimeFilter] = useState("year");

	// Show loader while data is being fetched
	if (isUserLoading || isGuestsLoading || isSpotsLoading) {
		return <Loader />;
	}

	// Handle error states
	if (!user || !guests || !spots) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-red-500">
					Error loading dashboard data. Please try again later.
				</p>
			</div>
		);
	}

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

		let labels;
		const currentDate = new Date();

		if (timeFilter === "year") {
			labels = Array.from({ length: 12 }, (_, i) => {
				return new Date(currentDate.getFullYear(), i).toLocaleString(
					"default",
					{ month: "long" }
				);
			});
		} else if (timeFilter === "month") {
			const daysInMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + 1,
				0
			).getDate();
			labels = Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
		} else {
			// week
			labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		}

		const colors = [
			{ bg: "rgb(219 234 254)", border: "rgb(59 130 246)" }, // blue-100, blue-500
			{ bg: "rgb(220 252 231)", border: "rgb(34 197 94)" }, // green-100, green-500
			{ bg: "rgb(254 226 226)", border: "rgb(239 68 68)" }, // red-100, red-500
			{ bg: "rgb(254 249 195)", border: "rgb(234 179 8)" }, // yellow-100, yellow-500
			{ bg: "rgb(237 233 254)", border: "rgb(139 92 246)" }, // purple-100, purple-500
			{ bg: "rgb(251 207 232)", border: "rgb(236 72 153)" }, // pink-100, pink-500
		];

		return {
			labels,
			datasets: spots.resorts.map((resort, index) => {
				const resortTourists = Array.isArray(guests.tourists)
					? guests.tourists.filter(
							(tourist) => tourist && tourist.resortId === resort.id
					  )
					: [];

				const touristsByPeriod = (resortTourists || []).reduce(
					(acc, tourist) => {
						if (!tourist?.visitDate) return acc;

						const visitDate = new Date(tourist.visitDate);
						let key;

						if (timeFilter === "year") {
							key = visitDate.toLocaleString("default", { month: "long" });
						} else if (timeFilter === "month") {
							key = `Day ${visitDate.getDate()}`;
						} else {
							// week
							key = visitDate.toLocaleString("default", { weekday: "short" });
						}

						acc[key] = (acc[key] || 0) + 1;
						return acc;
					},
					{}
				);

				return {
					label: resort.name,
					data: labels.map((label) => touristsByPeriod[label] || 0),
					backgroundColor: colors[index % colors.length].bg,
					borderColor: colors[index % colors.length].border,
					borderWidth: 1,
					barThickness: 15,
					maxBarThickness: 20,
					minBarLength: 0,
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
		barPercentage: 0.9, // Controls the width of the bars relative to the category
		categoryPercentage: 0.9, // Controls the width of the category containing the bars
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
					<div className="flex flex-col sm:flex-row justify-between items-start mb-6">
						<div className="flex flex-col sm:flex-row items-center gap-4">
							<h2 className="text-xl font-semibold mb-4 sm:mb-0">
								Resort Guest Distribution
							</h2>
						</div>
						<div className="flex gap-2">
							<Button.Group>
								<Button
									color={timeFilter === "week" ? "primary" : "gray"}
									onClick={() => setTimeFilter("week")}
								>
									Week
								</Button>
								<Button
									color={timeFilter === "month" ? "primary" : "gray"}
									onClick={() => setTimeFilter("month")}
								>
									Month
								</Button>
								<Button
									color={timeFilter === "year" ? "primary" : "gray"}
									onClick={() => setTimeFilter("year")}
								>
									Year
								</Button>
							</Button.Group>
						</div>
					</div>
					<div className="h-[500px] lg:h-[600px]">
						<BarChart
							data={chartData}
							options={{
								...options,
								maintainAspectRatio: false,
								responsive: true,
							}}
							title="Resort Guest Distribution"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<div className="border p-5 h-[400px] rounded-lg overflow-hidden">
						<DoughnutChart />
					</div>
					<div className="border p-5 h-[400px] rounded-lg overflow-hidden bg-gray-50">
						<h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
						<div className="space-y-4">
							<div>
								<Weather bg="bg-primary" />
							</div>
							<div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
								<span>Average Daily Visitors</span>
								<span className="font-semibold">
									{Math.round(totalTourists / 30)}
								</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
								<span>Gender Ratio (M:F)</span>
								<span className="font-semibold">
									{maleTourists}:{femaleTourists}
								</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
								<span>Most Popular Resort</span>
								<span className="font-semibold">
									{spots.resorts[0]?.name || "N/A"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
