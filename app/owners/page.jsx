"use client";
import OwnersTable from "@/components/OwnersTable";
import Headerbox from "@/components/shared/HeaderBox";
import { logo } from "@/public";
import { Button, Label, Select, TextInput } from "flowbite-react";
import Image from "next/image";
import React from "react";

import {
	regions,
	getProvincesByRegion,
	getCityMunByProvince,
	getBarangayByMun,
} from "phil-reg-prov-mun-brgy";

const Home = () => {
	const provinces = getProvincesByRegion(17);

	const municipalities = getCityMunByProvince(1751);

	const barangays = getBarangayByMun(175106);
	return (
		<section className="relative">
			<div className="w-full shadow-sm z-100 bg-white h-[80px] flex items-center justify-between px-[100px]">
				<div>
					<Image
						src={logo}
						alt="logo"
						height={150}
						width={150}
						className="object-contain"
					/>
				</div>
				<nav>
					<ul>
						<Button
							color="secondary"
							className="text-white uppercase tracking-wide font-medium"
						>
							Logout
						</Button>
					</ul>
				</nav>
			</div>
			<div className="px-[100px] py-[25px]">
				<div>
					<Headerbox
						user="Owner!"
						title="Welcome,"
						type="greeting"
						subtext="Manage and view your spot data here."
					/>
				</div>
				<div className="flex gap-2">
					<div className="flex-1">
						<OwnersTable />
					</div>
					<div className="border rounded-lg min-w-[350px] p-5 space-y-5">
						<h3 className="font-semibold text-[18px] mb-2">Add Guests</h3>
						<form>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="name" value="Full Name" />
								</div>
								<TextInput id="name" type="text" name="name" sizing="sm" />
							</div>
							<div className="flex gap-2 w-full">
								<div>
									<div className="mb-2 block">
										<Label htmlFor="age" value="Age" />
									</div>
									<TextInput id="age" type="number" name="age" sizing="sm" />
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
								<Select id="region" name="region" sizing="sm">
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
								<TextInput
									id="contact"
									type="text"
									name="contact"
									sizing="sm"
								/>
							</div>
							<div className="flex gap-2 mt-4">
								<Button color="gray" className="flex-1">
									Reset
								</Button>
								<Button type="submit" className="flex-1" color="primary">
									Save
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
