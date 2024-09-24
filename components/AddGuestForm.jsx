import React from "react";
import { useFormik } from "formik";
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

const AddGuestForm = ({ data }) => {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		trigger,
		setValue,
		getValues,
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
			dateVisited: data
				? data.dateVisited
				: new Date().toISOString().split("T")[0],
		},
		resolver: yupResolver(addOwnerGuest),
	});

	const onSubmit = async (data) => {
		try {
			reset();
		} catch (error) {
			setError("root", {
				message: "Invalid Inputs",
			});
		}
	};

	const handleSelectedDate = (date) => {
		setValue("dateVisited", new Date(date).toISOString().split("T")[0]);
	};

	const provinces = getProvincesByRegion(17);
	const municipalities = getCityMunByProvince(1751);
	const barangays = getBarangayByMun(175106);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-2">
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
						<div>
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
						<div className="w-full">
							<div className="mb-2 block">
								<Label htmlFor="gender" value="Gender" />
							</div>
							<Select
								id="gender"
								name="gender"
								sizing="sm"
								{...register("gender")}
							>
								<option defaultChecked></option>
								<option>Male</option>
								<option>Female</option>
								<option>Prefer not to say</option>
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
							<option defaultChecked></option>
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
						>
							<option defaultChecked></option>
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
						>
							<option defaultChecked></option>
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
						>
							<option defaultChecked></option>
							{barangays.map((brgy) => (
								<option value={brgy.name} key={brgy.name}>
									{brgy.name}
								</option>
							))}
						</Select>
					</div>
					<div className="space-y-2">
						<div>
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
					<div className="space-y-2">
						<div>
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
				</div>
				<div className="flex gap-2 mt-4">
					<Button color="gray" onClick={() => reset()} className="flex-1">
						Reset
					</Button>
					<Button type="submit" className="flex-1" color="primary">
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddGuestForm;
