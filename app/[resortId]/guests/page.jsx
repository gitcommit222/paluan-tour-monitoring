"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
import { Tooltip } from "flowbite-react";
import AddGuestForm from "@/components/AddGuestForm";

const AddGuestPage = ({ params }) => {
	const { resortId } = params;
	const router = useRouter();

	return (
		<section className="h-screen overflow-hidden">
			<div className="h-[60px] w-full bg-primary px-4 sm:px-6 flex items-center gap-2">
				<Tooltip content="Back">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2"
					>
						<IoArrowBackCircle size={24} className="text-white" />
						<h1 className="text-white text-lg font-semibold">Back</h1>
					</button>
				</Tooltip>
			</div>
			<div className="h-[calc(100vh-60px)] p-4 sm:p-6 overflow-y-auto">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-2xl font-semibold mb-6">Add New Guest</h1>
					<div className="bg-white rounded-lg shadow-md p-6">
						<AddGuestForm resortId={resortId} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AddGuestPage;
