"use client";
import Loader from "@/components/Loader";
import { useFetchUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoutes = ({ children, roles }) => {
	const { data: user, isLoading, error, isError } = useFetchUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			if (!user) {
				router.push("/sign-in");
				toast.error("Please sign in.");
			} else if (roles && (!user.userType || !roles.includes(user.userType))) {
				router.push("/unauthorized");
				toast.error("You don't have permission to access this page.");
			}
		}
	}, [user, isLoading, roles, router]);

	if (isLoading) {
		return <Loader />;
	}

	// Only render children if user is authenticated and authorized
	return <>{user && (!roles || roles.includes(user.userType)) && children}</>;
};

export default ProtectedRoutes;
