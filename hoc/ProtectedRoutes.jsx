"use client";
import Loader from "@/components/shared/Loader";
import { useFetchUser } from "@/hooks/useAuth";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoutes = ({ children, roles }) => {
	const { data: user, isLoading, error, isError } = useFetchUser();
	const router = useRouter();

	console.log(user);

	useEffect(() => {
		if (!user && !isLoading) {
			router.push("/sign-in");
		}

		if (isError) {
			toast.error("Please sign-in.");
		}
	});

	if (!user && !isLoading) {
		return (
			<p>
				<Loader />
			</p>
		);
	}

	// if (roles && !roles.includes(user?.role)) {
	// 	notFound();
	// }

	return <>{user && children}</>;
};

export default ProtectedRoutes;
