import React from "react";

const Promos = ({ icon, title, description }) => {
	return (
		<div className="offers-box">
			<div className="flex flex-col gap-2">
				{icon}
				<p className="text-black font-semibold tracking-wider">{title}</p>
				<div>
					<p className="font-light text-[14px]">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default Promos;
