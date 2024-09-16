"use client";
import { useState, useEffect, useRef } from "react";

export function useInView(options = {}) {
	const [isInView, setIsInView] = useState(false);
	const [currentSection, setCurrentSection] = useState("");
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsInView(entry.isIntersecting);
			if (entry.isIntersecting) {
				setCurrentSection(entry.target.id);
			}
		}, options);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [ref, options]);

	return { ref, isInView, currentSection };
}
