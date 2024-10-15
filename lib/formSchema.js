import * as Yup from "yup";

export const signInSchema = Yup.object({
	username: Yup.string().required("Username is required."),
	password: Yup.string().required("Password is required."),
}).required();

const FILE_SIZE = 1024 * 1024 * 10; // 2 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const addSpotSchema = Yup.object({
	spotName: Yup.string().required("Spot name is a required field."),
	category: Yup.string().required("Category is a required field."),
	permitNumber: Yup.string().required("Permit number is a required field."),
	address: Yup.string(),
	specificPlace: Yup.string(),
	description: Yup.string(),
	ownerName: Yup.string().required("Owner name is a required field."),
	ownerEmail: Yup.string().email().required(),
	contactNumber: Yup.string(),
	spotCover: Yup.mixed(),
}).required();

export const addOwnerGuest = Yup.object({
	fullName: Yup.string().required("Guest name is a required field."),
	age: Yup.string().required("Age is a required field."),
	gender: Yup.string(),
	region: Yup.string().required("Region is a required field."),
	province: Yup.string().required("Province is a required field."),
	municipality: Yup.string().required("Municipality is a required field."),
	barangay: Yup.string().required("Barangay is a required field."),
	contactNumber: Yup.string().required("Contact number is a required field."),
	dateVisited: Yup.date().required("This is a required field"),
}).required();
