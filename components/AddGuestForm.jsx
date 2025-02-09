import React from "react";
import { addOwnerGuest } from "@/lib/formSchema";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import {
	getProvincesByRegion,
	getCityMunByProvince,
	getBarangayByMun,
	regions,
} from "phil-reg-prov-mun-brgy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddGuest } from "@/hooks/useGuest";
import toast from "react-hot-toast";
import { useFetchSpots } from "@/hooks/useSpot";

const AddGuestForm = ({ data, resortId }) => {
	const { mutateAsync: addGuest, isLoading } = useAddGuest();
	const { data: resorts } = useFetchSpots();

	// Format initial date properly
	const getInitialDate = () => {
		if (data?.dateVisited) {
			return new Date(data.dateVisited);
		}
		return new Date();
	};

	const {
		register,
		handleSubmit,
		reset,
		setError,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			fullName: data ? data.fullName : "",
			age: data ? data.age : "",
			gender: data ? data.gender : "",
			region: data ? data.region : "",
			province: data ? data.province : "",
			municipality: data ? data.municipality : "",
			barangay: data ? data.barangay : "",
			contactNumber: data ? data.contactNumber : "",
			dateVisited: getInitialDate(),
		},
		resolver: yupResolver(addOwnerGuest),
	});

	const watchRegion = watch("region");
	const watchProvince = watch("province");
	const watchMunicipality = watch("municipality");

	const [provinces, setProvinces] = React.useState([]);
	const [municipalities, setMunicipalities] = React.useState([]);
	const [barangays, setBarangays] = React.useState([]);

	React.useEffect(() => {
		if (watchRegion) {
			const newProvinces = getProvincesByRegion(watchRegion);
			setProvinces(newProvinces);
			setValue("province", "");
			setValue("municipality", "");
			setValue("barangay", "");
		}
	}, [watchRegion, setValue]);

	React.useEffect(() => {
		if (watchProvince) {
			const newMunicipalities = getCityMunByProvince(watchProvince);
			setMunicipalities(newMunicipalities);
			setValue("municipality", "");
			setValue("barangay", "");
		}
	}, [watchProvince, setValue]);

	React.useEffect(() => {
		if (watchMunicipality) {
			const newBarangays = getBarangayByMun(watchMunicipality);
			setBarangays(newBarangays);
			setValue("barangay", "");
		}
	}, [watchMunicipality, setValue]);

	const onSubmit = async (formData) => {
		try {
			let formattedDate;

			// Handle both Date object and string inputs
			if (formData.dateVisited instanceof Date) {
				formattedDate = formData.dateVisited;
			} else if (typeof formData.dateVisited === "string") {
				formattedDate = new Date(formData.dateVisited);
			} else {
				setError("dateVisited", {
					type: "manual",
					message: "Invalid date format",
				});
				return;
			}

			// Check if date is valid
			if (isNaN(formattedDate.getTime())) {
				setError("dateVisited", {
					type: "manual",
					message: "Please select a valid date",
				});
				return;
			}

			// Format date as YYYY-MM-DD
			const year = formattedDate.getFullYear();
			const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
			const day = String(formattedDate.getDate()).padStart(2, "0");
			const dateString = `${year}-${month}-${day}`;

			await toast.promise(
				addGuest({
					name: formData.fullName,
					age: parseInt(formData.age),
					gender: formData.gender,
					region: formData.region,
					province: formData.province,
					municipality: formData.municipality,
					barangay: formData.barangay,
					resortId,
					contactNumber: formData.contactNumber,
					visitDate: dateString,
				}),
				{
					loading: "Adding Guest...",
					success: "Guest added successfully!",
					error: "Failed to add guest",
				}
			);
			reset();
		} catch (error) {
			console.error("Error adding guest:", error);
			setError("root", {
				message: "Invalid Inputs",
			});
		}
	};

	const handleSelectedDate = (date) => {
		if (date instanceof Date && !isNaN(date)) {
			setValue("dateVisited", date);
		}
	};

	return (
		<div>
			{resortId ? (
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Full Name *" />
						</div>
						<TextInput
							id="name"
							{...register("fullName")}
							type="text"
							sizing="sm"
							name="fullName"
							color={`${errors.fullName ? "failure" : "gray"}`}
							helperText={errors.fullName && errors.fullName.message}
						/>
					</div>

					<div className="flex gap-2 w-full">
						<div className="flex-1">
							<div className="mb-2 block">
								<Label htmlFor="age" value="Age *" />
							</div>
							<TextInput
								{...register("age")}
								id="age"
								type="number"
								sizing="sm"
								name="age"
								color={`${errors.age ? "failure" : "gray"}`}
								helperText={errors.age && errors.age.message}
							/>
						</div>
						<div className="flex-1">
							<div className="mb-2 block">
								<Label htmlFor="gender" value="Gender *" />
							</div>
							<Select
								id="gender"
								name="gender"
								sizing="sm"
								{...register("gender")}
								color={`${errors.gender ? "failure" : "gray"}`}
								helperText={errors.gender && errors.gender.message}
							>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Prefer not to say">Prefer not to say</option>
							</Select>
						</div>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="region" value="Region *" />
						</div>
						<Select
							{...register("region")}
							id="region"
							sizing="sm"
							name="region"
							color={`${errors.region ? "failure" : "gray"}`}
							helperText={errors.region && errors.region.message}
						>
							<option value="">Select Region</option>
							{regions.map((reg) => (
								<option value={reg.reg_code} key={reg.reg_code}>
									{reg.name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="province" value="Province *" />
						</div>
						<Select
							{...register("province")}
							id="province"
							name="province"
							sizing="sm"
							color={`${errors.province ? "failure" : "gray"}`}
							helperText={errors.province && errors.province.message}
							disabled={!watchRegion}
						>
							<option value="">Select Province</option>
							{provinces.map((prov) => (
								<option value={prov.prov_code} key={prov.prov_code}>
									{prov.name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="municipality" value="Municipality *" />
						</div>
						<Select
							{...register("municipality")}
							id="municipality"
							name="municipality"
							sizing="sm"
							color={`${errors.municipality ? "failure" : "gray"}`}
							helperText={errors.municipality && errors.municipality.message}
							disabled={!watchProvince}
						>
							<option value="">Select Municipality</option>
							{municipalities.map((mun) => (
								<option value={mun.mun_code} key={mun.mun_code}>
									{mun.name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="barangay" value="Barangay *" />
						</div>
						<Select
							{...register("barangay")}
							id="barangay"
							name="barangay"
							sizing="sm"
							color={`${errors.barangay ? "failure" : "gray"}`}
							helperText={errors.barangay && errors.barangay.message}
							disabled={!watchMunicipality}
						>
							<option value="">Select Barangay</option>
							{barangays.map((brgy) => (
								<option value={brgy.brgy_code} key={brgy.brgy_code}>
									{brgy.name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="contact" value="Contact No. *" />
						</div>
						<TextInput
							{...register("contactNumber")}
							id="contact"
							type="text"
							name="contactNumber"
							sizing="sm"
							color={`${errors.contactNumber ? "failure" : "gray"}`}
							helperText={errors.contactNumber && errors.contactNumber.message}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="dateVisited" value="Date Visited *" />
						</div>
						<Datepicker
							{...register("dateVisited")}
							weekStart={1}
							name="dateVisited"
							color={`${errors.dateVisited ? "failure" : "gray"}`}
							helperText={errors.dateVisited ? errors.dateVisited.message : ""}
							onSelectedDateChanged={handleSelectedDate}
						/>
					</div>

					<div className="flex gap-2 mt-6">
						<Button
							type="button"
							color="gray"
							onClick={() => reset()}
							className="flex-1"
							disabled={isSubmitting}
						>
							Reset
						</Button>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="flex-1"
							color="primary"
						>
							{isSubmitting ? "Saving..." : "Save"}
						</Button>
					</div>

					{errors.root && (
						<div className="mt-4 text-red-500 text-sm text-center">
							{errors.root.message}
						</div>
					)}
				</form>
			) : (
				<div className="text-center p-4 bg-gray-100 rounded-lg">
					<p className="text-gray-600">
						Please select a resort to add a guest.
					</p>
				</div>
			)}
		</div>
	);
};

export default AddGuestForm;
