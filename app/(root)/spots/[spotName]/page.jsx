"use client";
import DataBox from "@/components/DataBox";
import CustomCarousel from "@/components/shared/CustomCarousel";
import Headerbox from "@/components/shared/HeaderBox";
import { tourist } from "@/public";
import { Table } from "flowbite-react";
import Link from "next/link";
import React from "react";

const SingeSpotPage = ({ params }) => {
	const { spotName } = params;
	const newSpotName = spotName.replace("%20", " ");
	return (
		<section>
			<Headerbox
				title={newSpotName}
				subtext={`Here is the detailed analysis of ${newSpotName} data.`}
			/>
			<div className="flex gap-4 flex-wrap w-full">
				<DataBox
					icon={tourist}
					title="Current Guests"
					data="104"
					color="blue"
				/>
				<DataBox
					icon={tourist}
					title="Total Guests"
					data="1,290"
					color="green"
				/>
				<DataBox icon={tourist} title="Male Guests" data="500" color="red" />
				<DataBox
					icon={tourist}
					title="Female Guests"
					data="500"
					color="yellow"
				/>
			</div>
			<div className="mt-5 w-full min-h-[500px]">
				<Table>
					<Table.Head>
						<Table.HeadCell>Name</Table.HeadCell>
						<Table.HeadCell>Age</Table.HeadCell>
						<Table.HeadCell>Gender</Table.HeadCell>
						<Table.HeadCell>Address</Table.HeadCell>
						<Table.HeadCell>Contact</Table.HeadCell>
						<Table.HeadCell>
							<span>Actions</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						<Table.Row className="bg-white">
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								Rheymark Estonanto
							</Table.Cell>
							<Table.Cell>22</Table.Cell>
							<Table.Cell>Male</Table.Cell>
							<Table.Cell>Sta. Cruz</Table.Cell>
							<Table.Cell>09123123123</Table.Cell>
							<Table.Cell className="flex gap-2">
								<Link
									href="#"
									className="font-medium text-cyan-600 hover:underline"
								>
									Edit
								</Link>
								<Link
									href="#"
									className="font-medium text-red-600 hover:underline"
								>
									Delete
								</Link>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
		</section>
	);
};

export default SingeSpotPage;
