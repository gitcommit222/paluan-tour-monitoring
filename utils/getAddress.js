import {
	barangays,
	provinces,
	regions,
	city_mun,
} from "phil-reg-prov-mun-brgy";

const getAddress = (reg, prov, mun, brgy) => {
	const region = regions.find((r) => r.reg_code === reg);
	const province = provinces.find((p) => p.prov_code === prov);
	const municipality = city_mun.find((m) => m.mun_code === mun);
	const barangay = barangays.find((b) => b.name === brgy);

	return `${barangay?.name}, ${municipality?.name}, ${province?.name}, ${region?.name}`;
};

export default getAddress;
