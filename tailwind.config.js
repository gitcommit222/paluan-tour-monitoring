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
				accentg: "#BFBFBF",
			},
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(103deg, rgba(22,240,234,0.5410539215686274) 0%, rgba(167,255,244,0.17970938375350143) 100%);",
			},
		},
	},
	plugins: [flowbite.plugin()],
};
