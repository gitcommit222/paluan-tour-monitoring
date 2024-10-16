"use client";
import Loader from "@/components/shared/Loader";
import { useFetchUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoutes = ({ children, roles }) => {
	const { data: user, isLoading, error, isError } = useFetchUser();
	const router = useRouter();

	console.log("User:", user);
	console.log("Roles:", roles);

	useEffect(() => {
		if (!isLoading) {
			if (!user) {
				router.push("/sign-in");
				toast.error("Please sign in.");
			} else if (roles && (!user.role || !roles.includes(user.role))) {
				console.log("User role not found in allowed roles");
				console.log("User role:", user.role);
				console.log("Allowed roles:", roles);
				router.push("/unauthorized");
				toast.error("You don't have permission to access this page.");
			}
		}
	}, [user, isLoading, roles, router]);

	if (isLoading) {
		return <Loader />;
	}

	// Only render children if user is authenticated and authorized
	return <>{user && (!roles || roles.includes(user.role)) && children}</>;
};

export default ProtectedRoutes;
