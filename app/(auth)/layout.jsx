import React from "react";

const AuthLayout = ({ children }) => {
	return (
		<section className="relative">
			<div className="w-full h-screen bg-bg-image bg-cover absolute filter brightness-50" />
			{children}
		</section>
	);
};

export default AuthLayout;
