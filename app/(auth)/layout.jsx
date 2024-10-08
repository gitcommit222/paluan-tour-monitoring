import React from "react";

const AuthLayout = ({ children }) => {
	return (
		<section className="relative">
			<div className="w-full h-screen bg-gray-500  absolute filter brightness-50" />
			{children}
		</section>
	);
};

export default AuthLayout;
