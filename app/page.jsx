"use client";
import Promos from "../components/promotions/Promos";
import { promotionNavLinks } from "@/constants";
import { about, b1, b2, b3, b4, b5, beach1, logo } from "@/public";
import {
	Avatar,
	Button,
	FloatingLabel,
	Rating,
	TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { IoPricetagsOutline } from "react-icons/io5";
import { FaVirusCovidSlash } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { MdOutlineNearMe } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";

import { useInView } from "@/lib/useInView";
import Place from "@/components/promotions/Place";
import { useFetchUser, useLogout } from "@/hooks/useAuth";
import { useFetchSpots } from "@/hooks/useSpot";
import NavDrawer from "@/components/promotions/NavDrawer";
const PromotionsPage = () => {
	const [activeSection, setActiveSection] = useState("");
	const [scrolling, setScrolling] = useState(false);

	const router = useRouter();
	const { mutate: logout } = useLogout();

	const { data: places } = useFetchSpots();

	const homeSection = useInView({ threshold: 0.5 });
	const aboutSection = useInView({ threshold: 0.5 });
	const placesSection = useInView({ threshold: 0.5 });
	const blogSection = useInView({ threshold: 0.5 });

	const { data: user } = useFetchUser();

	useEffect(() => {
		const handleScroll = () => {
			setScrolling(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (homeSection.isInView) setActiveSection("home");
		else if (aboutSection.isInView) setActiveSection("about");
		else if (placesSection.isInView) setActiveSection("places");
		else if (blogSection.isInView) setActiveSection("blogs");
	}, [
		homeSection.isInView,
		aboutSection.isInView,
		placesSection.isInView,
		blogSection.isInView,
	]);

	const handleLogout = () => {
		logout();
	};

	return (
		<section className="promotions-page">
			<nav
				className={`w-full h-20 px-4 sm:px-8 md:px-16 flex items-center justify-between z-50 fixed top-0 left-0 right-0 transition-all duration-300 ${
					scrolling ? "bg-white shadow-md" : "bg-transparent"
				}`}
			>
				<div className="flex-shrink-0">
					<Link
						href="/"
						onClick={() => {
							setActive("Home");
							window.scrollTo(0, 0);
						}}
					>
						<Image
							src={logo}
							height={100}
							width={100}
							alt="logo"
							className="object-contain"
						/>
					</Link>
				</div>
				<div className="hidden lg:flex items-center space-x-10">
					<ul className="flex items-center gap-10">
						{promotionNavLinks.map((links) => (
							<li
								key={links.label}
								className={`hover:text-primary hover:font-medium transition-colors ${
									activeSection == links.url ? "text-primary" : ""
								}`}
							>
								<Link href={`#${links.url}`}>{links.label}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="hidden sm:flex items-center gap-4">
					{user ? (
						<div className="flex items-center gap-4">
							<Avatar size="sm" rounded>
								{user.name}
							</Avatar>
							<Button size="sm" color="secondary" onClick={handleLogout}>
								Logout
							</Button>
						</div>
					) : (
						<Button size="sm" color="primary" href="/sign-in">
							Login
						</Button>
					)}
				</div>
				<div className="lg:hidden">
					<NavDrawer
						activeSection={activeSection}
						user={user}
						onLogout={handleLogout}
					/>
				</div>
			</nav>
			<div className="mt-20">
				<div ref={homeSection.ref} className="prom-content" id="home">
					<div className="relative rounded-2xl w-full min-h-[400px] flex items-center justify-center">
						<div className="bg-prom-bg-image bg-no-repeat rounded-2xl bg-cover filter w-full hidden md:block h-[400px] brightness-75 shadow-md" />
						<div className="absolute space-y-5 px-4 text-center">
							<div>
								<h1 className="font-bold text-3xl md:text-[45px] text-white tracking-wider">
									TRAVEL AND TOUR IN PALUAN
								</h1>
								<p className="text-white font-light">
									Paluan, Occidental Mindoro, Philippines
								</p>
							</div>
							<div className="backdrop-blur-lg rounded-lg w-full max-w-[600px] shadow-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
								<div className="w-full sm:w-2/3">
									<FloatingLabel
										variant="standard"
										label="Where you want to go?"
										className="text-white"
									/>
								</div>
								<Button
									className="w-full sm:w-auto tracking-wider bg-cyan-600"
									size="lg"
								>
									EXPLORE NOW
								</Button>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap justify-center gap-6 py-8 mt-3">
						<Promos
							title="Get Best Prices"
							icon={<IoPricetagsOutline size={65} className="text-primary" />}
							description="Unlock the best travel deals with our exclusive offers! Book now to enjoy unbeatable prices on top destinations in Paluan, Occidental Mindoro."
						/>
						<Promos
							title="Covid Safe"
							icon={<FaVirusCovidSlash size={65} className="text-primary" />}
							description="Travel with peace of mind knowing our COVID-safe protocols are in place. We prioritize your health with enhanced cleaning, safety measures, and flexible bookings, ensuring a safe and enjoyable journey."
						/>
						<Promos
							title="Flexible Payment"
							icon={<MdPayment size={65} className="text-primary" />}
							description="Make your dream trip a reality with our flexible payment options. Split the cost into manageable installments and travel without the financial worry. Book now, pay later, and enjoy the journey stress-free!ces on top destinations in Paluan, Occidental Mindoro."
						/>
						<Promos
							title="Find The Best Near You"
							icon={<MdOutlineNearMe size={65} className="text-primary" />}
							description="Find the best experiences, dining, and attractions near you with just a click! Explore top-rated local spots and hidden gems right around the corner."
						/>
					</div>
				</div>
				<div
					className="prom-content h-full flex flex-col items-center space-y-10"
					id="places"
					ref={placesSection.ref}
				>
					<h1 className="font-semibold text-[35px]">
						Recommended Destinations
					</h1>
					<div className=" w-full flex flex-wrap gap-7 justify-center py-5">
						{places?.resorts?.map((place) => (
							<Place key={place.id} {...place} />
						))}
					</div>
				</div>
				<div className="prom-content" id="blogs" ref={blogSection.ref}>
					<h1 className="font-semibold text-[35px] text-center mb-10">Blogs</h1>
					<div className="flex flex-col md:flex-row gap-5 justify-between py-5">
						<Link
							href="/promotions"
							className="relative flex-1 min-h-[400px] flex items-center justify-center"
						>
							<h1 className="text-white text-2xl md:text-[34px] font-bold absolute z-10 text-center px-4">
								The ultimate guide on climbing Mt. Calavite.
							</h1>
							<Image
								src={b1}
								alt="b1"
								fill
								className="filter object-cover brightness-50 rounded-xl"
							/>
						</Link>
						<div className="flex-1 flex flex-col gap-5">
							<Link
								href="#"
								className="w-full relative h-[200px] flex items-center justify-center"
							>
								<h1 className="text-white text-2xl md:text-[34px] font-bold absolute z-10 text-center px-4">
									12 things I'd tell to any new Traveller
								</h1>
								<Image
									src={b2}
									alt="b2"
									fill
									className="filter object-cover brightness-50 rounded-xl"
								/>
							</Link>
							<Link
								href="#"
								className="w-full relative h-[200px] flex items-center justify-center"
							>
								<h1 className="text-white text-2xl md:text-[34px] font-bold absolute z-10 text-center px-4">
									The ultimate packing list for female travelers.
								</h1>
								<Image
									src={b3}
									alt="b3"
									fill
									className="filter object-cover brightness-50 rounded-xl"
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="prom-content" id="about" ref={aboutSection.ref}>
					<h1 className="font-semibold text-[35px] text-center mb-10">About</h1>
					<div className="relative h-[700px] w-full ">
						<Image
							src={about}
							fill
							alt="about"
							className="object-contain rounded-2xl"
						/>
					</div>
				</div>
				<div className="prom-footer">
					<div className="flex flex-col items-center justify-center gap-2">
						<div className="flex items-center gap-4">
							<Link href="#">
								<FaFacebook size={25} />
							</Link>
							<Link href="#">
								<BsLinkedin size={25} />
							</Link>
							<Link href="#">
								<FaInstagramSquare size={25} />
							</Link>
						</div>
						<div className="flex flex-col items-center">
							<p className="font-light text-[14px]">
								Copyright © Paluan Tour 2024
							</p>
							<p className="font-light text-[14px]">All Rights Reserved</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromotionsPage;
