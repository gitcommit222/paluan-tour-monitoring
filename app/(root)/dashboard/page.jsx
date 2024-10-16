"use client";
import BarChart from "@/components/BarChartComponent";
import DataBox from "@/components/DataBox";
import DoughnutChart from "@/components/DoughnutChartComponent";
import Headerbox from "@/components/shared/HeaderBox";
import { useFetchUser } from "@/hooks/useAuth";
import { spot, tourist } from "@/public";
import { Button } from "flowbite-react";
import React from "react";

const Dashboard = () => {
	const { data: user } = useFetchUser();

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
		<section className="p-4 max-w-full overflow-x-hidden">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-6">
				<Headerbox
					type="greeting"
					title="Hello,"
					user={`${user && user.name}!`}
					subtext="Track tourist spots progress here."
				/>
				<div className="mt-4 sm:mt-0">
					<Button color="primary">EXPORT</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
				<DataBox icon={spot} title="Tourists Spots" data="5" color="blue" />
				<DataBox
					icon={tourist}
					title="Total Tourist"
					data="1,000"
					color="green"
				/>
				<DataBox icon={tourist} title="Male Tourist" data="500" color="red" />
				<DataBox
					icon={tourist}
					title="Female Tourist"
					data="500"
					color="yellow"
				/>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 mt-10">
				<div className="border p-5 h-[400px] lg:h-[500px] w-full lg:w-3/5 rounded-lg overflow-hidden">
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
