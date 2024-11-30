import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const createUser = async ({
	name,
	email,
	username,
	password,
	userType = "guest",
}) => {
	const response = await api.post("/auth/", {
		name,
		username,
		password,
		userType,
		email,
	});

	return response.data;
};

export const useSignup = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message || "Error creating account";
			toast.error(errorMessage);
		},
	});
};

const loginUser = async ({ username, password }) => {
	const response = await api.post("/auth/login", { username, password });

	return response.data;
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			localStorage.setItem("accessToken", data.accessToken);
			queryClient.setQueryData(["user"], data.user);
			queryClient.invalidateQueries(["user"]);
		},
		onError: () => console.log("Error"),
	});
};

const logoutUser = async () => {
	const response = await api.post("/auth/logout");

	return response.data;
};

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logoutUser,
		onSuccess: () => {
			router.push("/");
			queryClient.clear(["user"]);
			localStorage.removeItem("accessToken");
		},
		onError: () => {
			toast.error("Error logging out.");
		},
	});
};

const fetchUser = async () => {
	const response = await api.get("/auth/me");

	return response.data;
};

export const useFetchUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: fetchUser,
		retry: false,
		staleTime: Infinity,
		cacheTime: Infinity,
	});
};

const fetchUsers = async () => {
	const response = await api.get("/auth/");

	return response.data;
};

export const useFetchUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
};

const deleteUser = async (id) => {
	await api.delete(`/auth/${id}`);
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries(["users"]);
		},
	});
};

const updateProfile = async ({ name, email, phone, username }) => {
	const response = await api.put("/auth/profile", {
		name,
		email,
		phone,
		username,
	});
	return response.data;
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateProfile,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], (oldData) => ({
				...oldData,
				...data,
			}));
			queryClient.invalidateQueries(["user"]);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message || "Error updating profile";
			toast.error(errorMessage);
		},
	});
};

const changePassword = async ({ oldPassword, newPassword }) => {
	const response = await api.put("/auth/change-password", {
		oldPassword,
		newPassword,
	});
	return response.data;
};

export const useChangePassword = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: changePassword,
	});
};
