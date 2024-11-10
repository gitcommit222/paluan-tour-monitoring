import React from "react";
import { getPlaiceholder } from "plaiceholder";

const getBase64 = async (imageUrl) => {
	try {
		const response = await fetch(imageUrl);
		const arrayBuffer = await response.arrayBuffer();
		const base64 = Buffer.from(arrayBuffer).toString("base64");

		return base64;
	} catch (error) {
		console.error("Error fetching base64:", error);
	}
};

export default getBase64;
