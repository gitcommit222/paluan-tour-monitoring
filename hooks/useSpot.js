import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const addSpot = async ({ file, spotData }) => {
	try {
		const formData = new FormData();
		if (file) {
			formData.append("image", file);
		} else {
			throw new Error("No file selected");
		}

		for (const key in spotData) {
			if (spotData.hasOwnProperty(key)) {
				formData.append(key, spotData[key]);
			}
		}

		const response = await api.post("/resorts/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Detailed error:", error);
		throw new Error(error.response?.data?.message || "Error uploading item");
	}
};

export const useAddSpot = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addSpot,
		onSuccess: () => {
			queryClient.invalidateQueries(["spots"]);
		},
		onError: (error) => {
			console.error("Upload failed:", error);
		},
	});
};

const fetchSpots = async () => {
	const response = await api.get("/resorts");

	return response.data;
};

export const useFetchSpots = () => {
	return useQuery({
		queryKey: ["spots"],
		queryFn: fetchSpots,
	});
};

const deleteResort = async (resortId) => {
	const response = await api.delete(`/resorts/${resortId}`);

	return response.data;
};

export const useDeleteResort = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteResort,
		onSuccess: () => {
			queryClient.invalidateQueries(["spots"]);
		},
	});
};

const fetchSingleSpot = async (spotId) => {
	const response = await api.get(`/resorts/${spotId}`);

	return response.data;
};

export const useFetchSingleSpot = (spotId) => {
	return useQuery({
		queryKey: ["spot", spotId],
		queryFn: () => fetchSingleSpot(spotId),
		enabled: !!spotId,
	});
};

const updateSpot = async ({ file, spotData, id }) => {
	const formData = new FormData();
	if (file) {
		formData.append("image", file);
	} else {
		throw new Error("No file selected");
	}

	for (const key in spotData) {
		if (spotData.hasOwnProperty(key)) {
			formData.append(key, spotData[key]);
		}
	}

	const response = await api.put(`/resorts/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
};

export const useUpdateSpot = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSpot,
		onSuccess: () => {
			queryClient.invalidateQueries(["spots"]);
		},
	});
};

const fetchResortByOwner = async (ownerId) => {
	const response = await api.get(`/resorts/owner/${ownerId}`);

	return response.data;
};

export const useFetchResortByOwner = (ownerId) => {
	return useQuery({
		queryKey: ["resortByOwner", ownerId],
		queryFn: () => fetchResortByOwner(ownerId),
		enabled: !!ownerId,
	});
};

const addGuest = async (guestData) => {
	const response = await api.post("/guests", guestData);

	return response.data;
};

export const useAddGuest = () => {};
