/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		flowbite.content(),
	],
	theme: {
		extend: {
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
			colors: {
				primary: "#70B1E1",
				secondary: "#FFD835",
				accent: "#BFBFBF",
			},
			backgroundImage: {
				"bg-image": "url(/images/paluanjpg.jpg)",
				"prom-bg-image": "url(/images/prom.jpg)",
			},
		},
	},
	plugins: [flowbite.plugin()],
};
