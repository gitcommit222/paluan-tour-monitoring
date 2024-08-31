import React from "react";
import { Card } from "flowbite-react";
import Image from "next/image";

const DataBox = ({ data = "1,000", icon, title = "Total", color = "blue" }) => {
	return (
		<Card
			className={`shadow-none bg-${color}-100 min-w-[250px] border-none outline-none flex-1`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-start justify-center flex-col">
					<h3 className="text-[34px] font-medium ">{data}</h3>
					<p className="text-[12px] text-gray-600">{title}</p>
				</div>
				<div className="rounded-full bg-gray-100 w-[55px] h-[55px] flex items-center justify-center">
					{icon && (
						<Image src={icon} height={30} width={30} alt="tourist icon" />
					)}
				</div>
			</div>
		</Card>
	);
};

export default DataBox;
