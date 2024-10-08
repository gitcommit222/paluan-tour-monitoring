"use client";
import Promos from "@/components/promotions/promos";
import { promotionNavLinks } from "@/constants";
import { about, b1, b2, b3, b4, b5, beach1, logo } from "@/public";
import { Button, FloatingLabel, Rating, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { IoPricetagsOutline } from "react-icons/io5";
import { FaVirusCovidSlash } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { MdOutlineNearMe } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";

import { useInView } from "@/lib/useInView";
import Place from "@/components/promotions/Place";

const PromotionsPage = () => {
	const [activeSection, setActiveSection] = useState("");
	const [scrolling, setScrolling] = useState(false);

	const homeSection = useInView({ threshold: 0.5 });
	const aboutSection = useInView({ threshold: 0.5 });
	const placesSection = useInView({ threshold: 0.5 });
	const blogSection = useInView({ threshold: 0.5 });

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

	return (
		<section>
			<nav
				className={` w-full h-[50px] px-16 py-10 flex justify-between items-center z-10 ${
					scrolling ? "fixed bg-white shadow-md" : ""
				}`}
			>
				<div className="w-[250px]">
					<Link
						href="/promotions"
						onClick={() => {
							setActive("Home");
							window.scrollTo(0, 0);
						}}
					>
						<Image src={logo} height={150} width={150} alt="logo" />
					</Link>
				</div>
				<div>
					<ul className="flex items-center gap-10">
						{promotionNavLinks.map((links) => (
							<li
								key={links.label}
								className={`hover:text-primary hover:font-medium ${
									activeSection == links.url ? "text-primary" : ""
								}`}
							>
								<Link href={`/promotions#${links.url}`}>{links.label}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="w-[250px] flex justify-end">
					<Button size="sm" color="primary" href="/sign-in">
						Login
					</Button>
				</div>
			</nav>
			<div ref={homeSection.ref} className="prom-content" id="home">
				<div className="relative rounded-2xl w-full h-[60%] min-h-[400px] flex items-center justify-center">
					<div className="bg-prom-bg-image bg-no-repeat rounded-2xl bg-cover filter w-full hidden md:block lg:h-[400px] brightness-75 shadow-md" />
					<div className="absolute space-y-5">
						<div>
							<h1 className="font-bold  text-[45px] text-center text-white tracking-wider">
								TRAVEL AND TOUR IN PALUAN
							</h1>
							<p className="text-center text-white font-light">
								Paluan, Occidental Mindoro, Philippines
							</p>
						</div>
						<div className="backdrop-blur-lg rounded-lg  md:w-[600px] shadow-md p-4  flex items-center justify-between flex-wrap">
							<div className="md:flex-1 pr-28">
								<FloatingLabel
									variant="standard"
									label="Where you want to go?"
									className="text-white"
								/>
							</div>
							<Button className="h-full tracking-wider bg-cyan-600" size="lg">
								EXPLORE NOW
							</Button>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-3 py-8 mt-3">
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
				<h1 className="font-semibold text-[35px]">Recommended Destinations</h1>
				<div className=" w-full flex flex-wrap gap-7 justify-center py-5">
					<Place imgUrl={b1} />
					<Place imgUrl={b2} />
					<Place imgUrl={b3} />
					<Place imgUrl={b4} />
					<Place imgUrl={b5} />
					<Place imgUrl={beach1} />
				</div>
			</div>
			<div className="prom-content" id="blogs" ref={blogSection.ref}>
				<h1 className="font-semibold text-[35px] text-center mb-10">Blogs</h1>
				<div className="flex gap-5 justify-between py-5">
					<Link
						href="/promotions"
						className="relative flex-1 flex items-center justify-center"
					>
						<h1 className="text-white text-[34px] font-bold absolute z-10 text-center">
							The ultimate guide on climbing Mt. Calavite.
						</h1>
						<Image
							src={b1}
							alt="b1"
							fill
							className="filter object-cover brightness-50 rounded-xl"
						/>
					</Link>
					<div className=" flex-1 flex flex-col gap-5">
						<Link
							href="#"
							className="w-full relative h-[200px] flex items-center justify-center"
						>
							<h1 className="text-white text-[34px] font-bold absolute z-10 text-center">
								12 things I'd tell to any new Traveller
							</h1>
							<Image
								src={b2}
								alt="b"
								fill
								className="filter object-cover brightness-50 rounded-xl"
							/>
						</Link>
						<Link
							href="#"
							className="w-full relative h-[200px] flex items-center justify-center"
						>
							<h1 className="text-white text-[34px] font-bold absolute z-10 text-center">
								The ultimate packing list for female travelers.
							</h1>
							<Image
								src={b3}
								alt="b"
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
		</section>
	);
};

export default PromotionsPage;