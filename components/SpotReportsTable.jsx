import { Table } from "flowbite-react";
import Link from "next/link";
import React from "react";

const SpotReportsTable = () => {
	return (
		<div className="overflow-x-auto">
			<Table>
				<Table.Head>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Age</Table.HeadCell>
					<Table.HeadCell>Gender</Table.HeadCell>
					<Table.HeadCell>Address</Table.HeadCell>
					<Table.HeadCell>Contact</Table.HeadCell>
					<Table.HeadCell>Date</Table.HeadCell>
					<Table.HeadCell>
						<span>Actions</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y text-[12px]">
					<Table.Row className="bg-white">
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							Rheymark Estonanto
						</Table.Cell>
						<Table.Cell>22</Table.Cell>
						<Table.Cell>Male</Table.Cell>
						<Table.Cell>Sta. Cruz</Table.Cell>
						<Table.Cell>09123123123</Table.Cell>
						<Table.Cell>09-23-24</Table.Cell>
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
	);
};

export default SpotReportsTable;
