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
			colors: {
				primary: "#70B1E1",
				secondary: "#FFD835",
				accent: "#BFBFBF",
			},
			backgroundImage: {
				"bg-image": "url(/images/paluanjpg.jpg)",
			},
		},
	},
	plugins: [flowbite.plugin()],
};
