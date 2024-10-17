"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

const addGuest = async (guestData) => {
	const response = await api.post("/guest/save-guest", guestData);

	return response.data;
};

export const useAddGuest = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addGuest,
		onSuccess: () => {
			queryClient.invalidateQueries(["guests"]);
		},
	});
};

const getGuests = async () => {
	const response = await api.get("/guest/tourist-list");

	return response.data;
};

export const useGetGuests = () => {
	return useQuery({
		queryKey: ["guests"],
		queryFn: getGuests,
	});
};

const getTouristByResortId = async (id) => {
	const response = await api.get(`/guest/tourist-by-resort/${id}`);

	return response.data;
};

export const useGetTouristByResortId = (resortId) => {
	return useQuery({
		queryKey: ["touristByResortId", resortId],
		queryFn: () => getTouristByResortId(resortId),
		enabled: !!resortId,
	});
};

const updateGuest = async (guest) => {
	const response = await api.put(`/guest/update-guest/${guest.id}`, guest);

	return response.data;
};

export const useUpdateGuest = () => {
	return useMutation({
		mutationFn: updateGuest,
		onSuccess: () => {
			toast({
				title: "Guest updated successfully!",
				variant: "default",
			});
		},
	});
};

const deleteGuest = async (id) => {
	const response = await api.delete(`/guest/delete-tourist/${id}`);

	return response.data;
};

export const useDeleteGuest = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteGuest,
		onSuccess: () => {
			queryClient.invalidateQueries(["guests"]);
		},
	});
};
