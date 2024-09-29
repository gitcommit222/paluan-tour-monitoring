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
