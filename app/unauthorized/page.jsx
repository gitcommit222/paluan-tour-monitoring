import React from "react";
import Link from "next/link";

const Unauthorized = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-red-600 mb-4">401</h1>
				<h2 className="text-3xl font-semibold text-gray-800 mb-4">
					Unauthorized Access
				</h2>
				<p className="text-xl text-gray-600 mb-8">
					Oops! You don't have permission to access this page.
				</p>
				<Link
					href="/"
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
				>
					Return Home
				</Link>
			</div>
		</div>
	);
};

export default Unauthorized;
