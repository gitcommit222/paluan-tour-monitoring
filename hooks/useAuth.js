import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
			queryClient.invalidateQueries(["user"]);
		},
		onError: () => console.log("Error"),
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
