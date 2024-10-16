"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function RouteChangeListener() {
	const pathname = usePathname();
	const [isChanging, setIsChanging] = useState(false);

	useEffect(() => {
		setIsChanging(true);
		const timeout = setTimeout(() => setIsChanging(false), 500); // Adjust time as needed

		return () => clearTimeout(timeout);
	}, [pathname]);

	return isChanging ? <Loader /> : null;
}
