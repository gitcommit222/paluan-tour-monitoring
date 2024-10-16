import Image from "next/image";
import React from "react";
import { logo } from "@/public";

const Loader = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
			<div className="bg-white rounded-lg p-6 shadow-xl">
				<div className="animate-spin">
					<Image src={logo} alt="Loading" width={64} height={64} />
				</div>
				<p className="mt-4 text-gray-700 text-center">Loading...</p>
			</div>
		</div>
	);
};

export default Loader;
