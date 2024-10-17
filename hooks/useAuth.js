import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

const logoutUser = () => {
	localStorage.removeItem("accessToken");
};

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logoutUser,
		onSuccess: () => {
			router.push("/");
			queryClient.clear(["user"]);
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
