import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createRating = async ({ resortId, rating, comment, guestId }) => {
	const response = await api.post("/ratings", {
		resortId,
		rating,
		comment,
		guestId,
	});

	return response.data;
};

export const useCreateRating = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createRating,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries(["ratings", variables.resortId]);
		},
	});
};

const fetchRatingsByResort = async ({ resortId }) => {
	const response = await api.get(`/ratings/${resortId}`);
	return response.data;
};

export const useFetchRatingsByResort = (resortId) => {
	return useQuery({
		queryKey: ["ratings", resortId],
		queryFn: () => fetchRatingsByResort({ resortId }),
		enabled: !!resortId,
	});
};

const updateRating = async ({ ratingId, rating, comment }) => {
	const response = await api.put(`/ratings/${ratingId}`, {
		rating,
		comment,
	});

	return response.data;
};

export const useUpdateRating = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateRating,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries(["ratings"]);
		},
	});
};

const deleteRating = async (ratingId) => {
	const response = await api.delete(`/ratings/${ratingId}`);
	return response.data;
};

export const useDeleteRating = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteRating,
		onSuccess: () => {
			queryClient.invalidateQueries(["ratings"]);
		},
	});
};
