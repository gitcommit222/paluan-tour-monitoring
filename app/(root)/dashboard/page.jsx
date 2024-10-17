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

const Dashboard = () => {
	const { data: user } = useFetchUser();
	const { data: guests } = useGetGuests();
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

	const data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "Resort 1",
				data: [150, 200, 180, 220, 170, 210, 190],
				backgroundColor: "rgb(254 226 226)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
			{
				label: "Resort 2",
				data: [130, 170, 160, 180, 150, 190, 170],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
			{
				label: "Resort 3",
				data: [110, 140, 130, 160, 120, 150, 140],
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

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
				<DataBox icon={spot} title="Tourists Spots" data="5" color="blue" />
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
					<BarChart data={data} options={options} />
				</div>
				<div className="border p-5 h-[400px] lg:h-[500px] w-full lg:w-2/5 rounded-lg overflow-hidden">
					<DoughnutChart />
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
