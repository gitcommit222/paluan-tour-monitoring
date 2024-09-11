import React from "react";
import { useFormik } from "formik";
import { addOwnerGuest } from "@/lib/formSchema";
import { Button, Label, Select, TextInput } from "flowbite-react";
import {
	getProvincesByRegion,
	getCityMunByProvince,
	getBarangayByMun,
	regions,
} from "phil-reg-prov-mun-brgy";

const AddGuestForm = ({ data }) => {
	const formik = useFormik({
		initialValues: {
			fullName: data ? data.fullName : "",
			age: data ? data.age : "",
			gender: data ? data.gender : "",
			region: data ? data.region : "",
			province: data ? data.province : "",
			municipality: data ? data.municipality : "",
			barangay: data ? data.barangay : "",
		},
		validationSchema: addOwnerGuest,
		onSubmit: ({ fullName }) => {
			console.log(`fullName: ${fullName}`);
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

	const provinces = getProvincesByRegion(17);
	const municipalities = getCityMunByProvince(1751);
	const barangays = getBarangayByMun(175106);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Full Name" />
					</div>
					<TextInput
						id="name"
						type="text"
						sizing="sm"
						name="fullName"
						value={values.fullName}
						onChange={handleChange}
						color={`${errors.fullName && touched.fullName && "failure"}`}
					/>
					{errors.fullName && touched.fullName && (
						<span className="text-red-500 text-[12px] pt-2 block">
							{errors.fullName}
						</span>
					)}
				</div>
				<div className="flex gap-2 w-full">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="age" value="Age" />
						</div>
						<TextInput
							id="age"
							type="number"
							sizing="sm"
							name="age"
							value={values.age}
							onChange={handleChange}
							color={`${errors.age && touched.age && "failure"}`}
						/>
						{errors.age && touched.age && (
							<span className="text-red-500 text-[12px] pt-2 block">
								{errors.age}
							</span>
						)}
					</div>
					<div className="w-full">
						<div className="mb-2 block">
							<Label htmlFor="gender" value="Gender" />
						</div>
						<Select id="gender" name="gender" sizing="sm">
							<option defaultChecked></option>
							<option>Male</option>
							<option>Female</option>
							<option>Prefer not to say</option>
						</Select>
					</div>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="region" value="Region" />
					</div>
					<Select
						id="region"
						name="region"
						sizing="sm"
						color={`${errors.region && touched.region && "failure"}`}
						onChange={handleChange}
						value={values.region}
					>
						<option defaultChecked></option>
						{regions.map((reg) => (
							<option value={reg.reg_code} key={reg.reg_code}>
								{reg.name}
							</option>
						))}
					</Select>
					{errors.region && touched.region && (
						<span className="text-red-500 text-[12px] pt-2 block">
							{errors.region}
						</span>
					)}
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="province" value="Province" />
					</div>
					<Select id="province" name="province" sizing="sm">
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
						<Label htmlFor="municipality" value="Municipality" />
					</div>
					<Select id="municipality" name="municipality" sizing="sm">
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
						<Label htmlFor="barangay" value="Barangay" />
					</div>
					<Select id="barangay" name="barangay" sizing="sm">
						<option defaultChecked></option>
						{barangays.map((brgy) => (
							<option value={brgy.name} key={brgy.name}>
								{brgy.name}
							</option>
						))}
					</Select>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="contact" value="Contact No." />
					</div>
					<TextInput id="contact" type="text" name="contact" sizing="sm" />
				</div>
				<div className="flex gap-2 mt-4">
					<Button color="gray" onClick={resetForm} className="flex-1">
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