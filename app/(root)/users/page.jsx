import Headerbox from "@/components/shared/HeaderBox";
import UserForm from "@/components/UserForm";
import UsersTable from "@/components/UsersTable";
import React from "react";

const UsersPage = () => {
	return (
		<section>
			<div className="flex justify-between items-center">
				<Headerbox title="Users" subtext="Manage and View Users here." />
				<UserForm />
			</div>
			<UsersTable />
		</section>
	);
};

export default UsersPage;
