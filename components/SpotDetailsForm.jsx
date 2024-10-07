"use client";
import React, { useEffect, useState } from "react";
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
import { addSpotSchema } from "@/lib/formSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddSpot } from "@/hooks/useSpot";
import toast from "react-hot-toast";

const SpotDetailsForm = ({ data }) => {
	const [selectedImage, setSelectedImage] = useState("");

	const {
		mutateAsync: addSpotMutation,
		isSuccess: isAddSpotSuccess,
		isPending: isAddSpotPending,
	} = useAddSpot();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			spotName: "",
			category: "",
			permitNumber: "",
			address: "",
			specificPlace: "",
			description: "",
			ownerName: "",
			ownerEmail: "",
			contactNumber: "",
			spotCover: "",
		},
		resolver: yupResolver(addSpotSchema),
	});

	// UseEffect to reset form values when `data` becomes available
	useEffect(() => {
		if (data) {
			reset({
				spotName: data.name || "",
				category: data.category || "",
				permitNumber: data.permitNumber || "",
				address: data.Address.barangay || "",
				specificPlace: data.specificPlace || "",
				description: data.description || "",
				ownerName: data.User.name || "",
				ownerEmail: data.User.email || "",
				contactNumber: data.contactNumber || "",
				spotCover: data.spotCover || "",
			});

			if (data.spotCover) {
				setSelectedImage(data.spotCover);
			}
		}
	}, [data, reset]);

	const onSubmit = async (data) => {
		try {
			console.log("Form data:", data);
			const {
				spotName,
				category,
				permitNumber,
				address,
				specificPlace,
				description,
				ownerName,
				ownerEmail,
				contactNumber,
				spotCover,
			} = data;
			const spotData = {
				name: spotName,
				category,
				permitNo: permitNumber,
				barangay: address,
				street: specificPlace,
				description,
				ownerName,
				email: ownerEmail,
				phone: contactNumber,
				thumbnail: spotCover,
			};

			if (!selectedImage) {
				console.error("No file selected");
				return;
			}

			await toast.promise(addSpotMutation({ file: selectedImage, spotData }), {
				success: "Spot added!",
				loading: "Adding spot...",
				error: "Error adding spot.",
			});

			reset();
			setSelectedImage("");
		} catch (error) {
			console.error("Error during submission:", error);
			setError("root", {
				message: "Invalid Inputs",
			});
		}
	};

	if (Object.keys(errors).length) {
		console.log("Validation errors:", errors);
	}

	const barangays = getBarangayByMun(175107);

	console.log(getBarangayByMun(175107));

	return (
		<div className="relative">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${isAddSpotPending ? "pointer-events-none" : ""}`}
			>
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
								{...register("spotName")}
								id="spotName"
								type="text"
								placeholder="e.g. Maslud Cove"
								name="spotName"
								color={`${errors.spotName ? "failure" : "gray"}`}
								helperText={errors.spotName && errors.spotName.message}
							/>
						</div>
						<div>
							<div className="mb-2 block" aria-labelledby="default-popover">
								<Label htmlFor="categories" value="Select Categories" />
							</div>
							<Select
								{...register("category")}
								id="categories"
								color={`${errors.category ? "failure" : "gray"}`}
								name="category"
								helperText={errors.category && errors.category.message}
							>
								<option defaultChecked></option>
								<option value="beach">Beach</option>
								<option value="mountain">Mountain</option>
								<option value="urban">Urban</option>
								<option value="rural">Rural</option>
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="permitNumber" value="Permit No." />
							</div>
							<TextInput
								{...register("permitNumber")}
								id="permitNumber"
								name="permitNumber"
								type="text"
								color={`${errors.permitNumber ? "failure" : "gray"}`}
								helperText={errors.permitNumber && errors.permitNumber.message}
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
										{...register("address")}
										id="barangay"
										name="address"
										color={`${errors.address ? "failure" : "gray"}`}
										helperText={errors.address && errors.address.message}
									>
										<option defaultChecked></option>
										{barangays.map((brgy, i) => (
											<option key={brgy.name} value={i}>
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
										{...register("specificPlace")}
										id="specificPlace"
										type="text"
										name="specificPlace"
										helperText={
											errors.specificPlace && errors.specificPlace.message
										}
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
									{...register("description")}
									id="description"
									name="description"
									placeholder="Describe the place..."
									rows={4}
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
								{...register("ownerName")}
								id="ownerName"
								type="text"
								placeholder="e.g. John Wick"
								name="ownerName"
								color={`${errors.ownerName ? "failure" : "gray"}`}
								helperText={errors.ownerName && errors.ownerName.message}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="ownerEmail" value="Email Address" />
							</div>
							<TextInput
								{...register("ownerEmail")}
								id="ownerEmail"
								type="email"
								placeholder="e.g. sample@email.com"
								name="ownerEmail"
								color={`${errors.ownerEmail ? "failure" : "gray"}`}
								helperText={errors.ownerEmail && errors.ownerEmail.message}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="contactNumber" value="Contact No." />
							</div>
							<TextInput
								{...register("contactNumber")}
								id="contactNumber"
								type="text"
								placeholder="e.g. 09123456789"
								name="contactNumber"
								color={`${errors.contactNumber ? "failure" : "gray"}`}
								helperText={
									errors.contactNumber && errors.contactNumber.message
								}
							/>
						</div>
						<div className=" space-y-4">
							<h3 className="text-[18px] font-medium text-gray-500 font-Montserrat mb-5">
								Spot Cover Image
							</h3>
							<div className="flex w-full items-center justify-center h-full">
								<Label
									htmlFor="dropzone-file"
									className="flex h-80 w-full cursor-pointer flex-col relative items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
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
										{...register("spotCover")}
										id="dropzone-file"
										className="hidden"
										accept="image/*"
										name="spotCover"
										color={`${errors.spotCover ? "failure" : "gray"}`}
										helperText={errors.spotCover && errors.spotCover.message}
										onChange={(e) => {
											const file = e.target.files?.[0];
											setValue("spotCover", file);
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
							reset();
							setSelectedImage("");
						}}
					>
						Reset
					</Button>
					<Button type="submit" disabled={isSubmitting} color="primary">
						{isSubmitting ? "Adding spot..." : "Submit"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SpotDetailsForm;
