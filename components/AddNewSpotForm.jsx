"use client";
import React, { useState } from "react";
import {
	Button,
	FileInput,
	Label,
	Select,
	Textarea,
	TextInput,
} from "flowbite-react";
import Image from "next/image";

import { getBarangayByMun } from "phil-reg-prov-mun-brgy";
import { useFormik } from "formik";
import { addSpotSchema } from "@/lib/formSchema";

const FILE_SIZE = 1024 * 1024 * 2; // 2 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const AddNewSpotForm = ({ data }) => {
	const [selectedImage, setSelectedImage] = useState("");

	const formik = useFormik({
		initialValues: {
			spotName: data ? data.spotName : "",
			category: data ? data.category : "",
			permitNumber: data ? data.permitNumber : "",
			address: data ? data.address : "",
			specificPlace: data ? data.specificPlace : "",
			description: data ? data.description : "",
			ownerName: data ? data.ownerName : "",
			ownerEmail: data ? data.ownerEmail : "",
			contactNumber: data ? data.contactNumber : "",
			spotCover: data ? data.spotCover : "",
		},
		validationSchema: addSpotSchema,
		onSubmit: ({ spotCover }) => {
			console.log(`spotCover: ${spotCover}`);
		},
	});

	const {
		errors,
		touched,
		values,
		handleChange,
		handleSubmit,
		resetForm,
		setFieldValue,
	} = formik;

	const barangays = getBarangayByMun(175107);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-wrap min-w-[400px] gap-10 ">
					<div className="add-spot-forms space-y-4 min-w-[200px]">
						<h3 className="text-[18px] font-medium text-gray-500 font-Montserrat mb-4">
							Place Info
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="spotName" value="Place Name" />
							</div>
							<TextInput
								id="spotName"
								type="text"
								placeholder="e.g. Maslud Cove"
								name="spotName"
								value={values.spotName}
								onChange={handleChange}
								color={`${
									errors.spotName && touched.spotName ? "failure" : "gray"
								}`}
								helperText={errors.spotName}
							/>
						</div>
						<div>
							<div className="mb-2 block" aria-labelledby="default-popover">
								<Label htmlFor="categories" value="Select Categories" />
							</div>
							<Select
								id="categories"
								color={`${
									errors.category && touched.category ? "failure" : "gray"
								}`}
								name="category"
								onChange={handleChange}
								value={values.category}
								helperText={errors.category}
							>
								<option defaultChecked></option>
								<option>Historial significance</option>
								<option>Cultural value</option>
								<option>Political significance</option>
								<option>Nature</option>
								<option>Natural or built beauty</option>
								<option>Leisure</option>
								<option>Amusement and fun</option>
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="permitNumber" value="Permit No." />
							</div>
							<TextInput
								id="permitNumber"
								name="permitNumber"
								type="text"
								onChange={handleChange}
								value={values.permitNumber}
								color={`${
									errors.permitNumber && touched.permitNumber
										? "failure"
										: "gray"
								}`}
								helperText={errors.permitNumber}
							/>
						</div>
						<div>
							<h3 className="text-[18px] font-medium text-gray-500 font-Montserrat mb-2">
								Address
							</h3>
							<div className="space-y-3">
								<div>
									<div className="mb-2 block" aria-labelledby="default-popover">
										<Label htmlFor="barangay" value="Select Barangay" />
									</div>
									<Select
										id="barangay"
										name="address"
										color={`${
											errors.address && touched.address ? "failure" : "gray"
										}`}
										onChange={handleChange}
										value={values.address}
										helperText={errors.address}
									>
										<option defaultChecked></option>
										{barangays.map((brgy) => (
											<option key={brgy.name} value={brgy.name}>
												{brgy.name}
											</option>
										))}
									</Select>
								</div>
								<div>
									<div className="mb-2 block">
										<Label htmlFor="specificPlace" value="Specific Place" />
									</div>
									<TextInput
										id="specificPlace"
										type="text"
										name="specificPlace"
										onChange={handleChange}
										value={values.specificPlace}
										helperText={errors.specificPlace}
									/>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-[18px] font-medium text-gray-500 font-Montserrat mb-2">
								Other Info
							</h3>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="description" value="Description" />
								</div>
								<Textarea
									id="description"
									name="description"
									placeholder="Describe the place..."
									rows={4}
									onChange={handleChange}
									value={values.description}
								/>
							</div>
						</div>
					</div>
					<div className=" add-spot-forms space-y-4 min-w-[200px]">
						<h3 className="text-[18px] font-medium text-gray-500 font-Montserrat">
							Owner Info
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="ownerName" value="Full Name" />
							</div>
							<TextInput
								id="ownerName"
								type="text"
								placeholder="e.g. John Wick"
								name="ownerName"
								onChange={handleChange}
								value={values.ownerName}
								color={`${
									errors.ownerName && touched.ownerName ? "failure" : "gray"
								}`}
								helperText={errors.ownerName}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="ownerEmail" value="Email Address" />
							</div>
							<TextInput
								id="ownerEmail"
								type="email"
								placeholder="e.g. sample@email.com"
								name="ownerEmail"
								onChange={handleChange}
								value={values.ownerEmail}
								color={`${
									errors.ownerEmail && touched.ownerEmail ? "failure" : "gray"
								}`}
								helperText={errors.ownerEmail}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="contactNumber" value="Contact No." />
							</div>
							<TextInput
								id="contactNumber"
								type="text"
								placeholder="e.g. 09123456789"
								name="contactNumber"
								onChange={handleChange}
								value={values.contactNumber}
								color={`${
									errors.contactNumber && touched.contactNumber
										? "failure"
										: "gray"
								}`}
								helperText={errors.contactNumber}
							/>
						</div>
						<div className=" space-y-4">
							<h3 className="text-[18px] font-medium text-gray-500 font-Montserrat mb-5">
								Spot Cover Image
							</h3>
							<div className="flex w-full items-center justify-center">
								<Label
									htmlFor="dropzone-file"
									className="flex h-64 w-full cursor-pointer flex-col relative items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
								>
									<div className="flex flex-col items-center justify-center pb-6 pt-5 ">
										{selectedImage ? (
											<Image
												src={selectedImage}
												alt="selectedImage"
												fill
												className="object-contain"
											/>
										) : (
											<>
												<svg
													className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 20 16"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
													/>
												</svg>
												<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
													<span className="font-semibold">Click to upload</span>{" "}
													or drag and drop
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-400">
													SVG, PNG, JPG or GIF (MAX. 800x400px)
												</p>
											</>
										)}
									</div>
									<FileInput
										id="dropzone-file"
										className="hidden"
										accept="image/*"
										name="spotCover"
										onChange={(e) => {
											const file = e.target.files?.[0];
											setFieldValue("spotCover", file);
											setSelectedImage(
												file ? URL.createObjectURL(file) : undefined
											);
										}}
									/>
								</Label>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-end gap-2 items-end mt-3">
					<Button
						color="gray"
						onClick={() => {
							resetForm();
							setSelectedImage("");
						}}
					>
						Reset
					</Button>
					<Button type="submit" color="primary">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddNewSpotForm;
