import * as Yup from "yup";

export const addSpotSchema = Yup.object({
	spotName: Yup.string().required("Spot name is a required field."),
	category: Yup.string().required("Category is a required field."),
	permitNumber: Yup.string().required("Permit number is a required field."),
	address: Yup.string().required(),
	specificPlace: Yup.string(),
	description: Yup.string(),
	ownerName: Yup.string().required("Owner name is a required field."),
	ownerEmail: Yup.string().email().required(),
	contactNumber: Yup.string()
		.matches(/^\d+$/, "Must contain only digits")
		.min(11, "Must be exactly 11 digits")
		.max(11, "Must be exactly 11 digits")
		.required("Phone number is required"),
	spotCover: Yup.mixed()
		.test(
			"fileSize",
			"File too large, maximum size is 10MB",
			(value) => value && value.size <= FILE_SIZE
		)
		.test(
			"fileFormat",
			"Unsupported Format, only JPG, PNG, and GIF allowed",
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
});

export const addOwnerGuest = Yup.object({
	fullName: Yup.string().required("Guest name is a required field."),
	age: Yup.number().positive().integer().required("Age is a required field."),
	gender: Yup.string(),
	region: Yup.string().required("Region is a required field."),
	province: Yup.string().required("Spot name is a required field."),
	municipality: Yup.string().required("Spot name is a required field."),
	barangay: Yup.string().required("Spot name is a required field."),
	contactNumber: Yup.string().required("Spot name is a required field."),
});