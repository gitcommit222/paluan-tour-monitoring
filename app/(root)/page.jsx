import DataBox from "@/components/DataBox";
import Headerbox from "@/components/shared/HeaderBox";
import { tourist } from "@/public";
import React from "react";

const Dashboard = () => {
	return (
		<section>
			<Headerbox
				type="greeting"
				title="Hello,"
				user="Admin!"
				subtext="Track tourist spots progress here."
			/>
			<div className="flex gap-4 flex-wrap">
				<DataBox
					icon={tourist}
					title="Tourists Spots"
					data="5"
					color="indigo"
				/>
				<DataBox
					icon={tourist}
					title="Total Tourist"
					data="1,000"
					color="green"
				/>
				<DataBox icon={tourist} title="Male Tourist" data="500" color="red" />
				<DataBox
					icon={tourist}
					title="Female Tourist"
					data="500"
					color="yellow"
				/>
			</div>
			<div></div>
		</section>
	);
};

export default Dashboard;
