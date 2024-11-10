import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const addSpot = async ({ file, spotData }) => {
	try {
		const formData = new FormData();
		if (file) {
			formData.append("image", file);
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

const addSpotImage = async ({ resortId, file }) => {
	const formData = new FormData();
	formData.append("resortId", resortId);
	formData.append("image", file);

	const response = await api.post("/spotimages", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
};

export const useAddSpotImage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addSpotImage,
		onSuccess: () => {
			queryClient.invalidateQueries(["spots"]);
		},
	});
};

const deleteSpotImage = async (id) => {
	const response = await api.delete(`/spotimages/${id}`);

	return response.data;
};

export const useDeleteSpotImage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSpotImage,
		onSuccess: () => {
			queryClient.invalidateQueries(["spots"]);
		},
	});
};

const updateSpotImage = async ({ id, file }) => {
	const formData = new FormData();
	formData.append("image", file);

	const response = await api.put(`/spotimages/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
};

export const useUpdateSpotImage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSpotImage,
		onSuccess: () => {
			queryClient.invalidateQueries(["spots"]);
		},
	});
};

const fetchSpotImages = async (resortId) => {
	const response = await api.get(`/spotimages/${resortId}`);

	return response.data;
};

export const useFetchSpotImages = (resortId) => {
	return useQuery({
		queryKey: ["spotImages", resortId],
		queryFn: () => fetchSpotImages(resortId),
		enabled: !!resortId,
	});
};
