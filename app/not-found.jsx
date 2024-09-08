import { notfound } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
	return (
		<div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
			<Image src={notfound} alt="404" height={500} width={500} />
			<h1>Page not found.</h1>
			<Link href="/" className="text-primary underline">
				Go back to home
			</Link>
		</div>
	);
};

export default PageNotFound;
