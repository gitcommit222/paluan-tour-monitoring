import React from "react";

const WhiteBackdrop = () => {
	return (
		<div className="fixed inset-0 bg-white bg-opacity-80 z-50 overflow-hidden">
			<div className="absolute inset-0 -translate-x-full animate-glimmer bg-gradient-to-r from-transparent via-white to-transparent" />
		</div>
	);
};

export default WhiteBackdrop;
