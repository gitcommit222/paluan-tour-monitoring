import React from "react";

const AuthLayout = ({ children }) => {
	return (
		<section className="relative min-h-screen flex items-center justify-center">
			<div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-80" />
			<div className="relative z-10">{children}</div>
		</section>
	);
};

export default AuthLayout;
