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
			keyframes: {
				arrows: {
					"0%": { transform: "rotate(45deg)" },
					"100%": { transform: "rotate(405deg)" },
				},
				ringStroke: {
					"0%, 100%": {
						strokeDashoffset: "452",
						transform: "rotate(-45deg)",
					},
					"50%": {
						strokeDashoffset: "169.5",
						transform: "rotate(-180deg)",
					},
				},
				tick: {
					"0%, 3%, 47%, 100%": { strokeDashoffset: "-12" },
					"14%, 36%": { strokeDashoffset: "0" },
				},
				glimmer: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
			animation: {
				arrows: "arrows 2s linear infinite",
				ringStroke: "ringStroke 2s linear infinite",
				tick: "tick 2s linear infinite",
				glimmer: "glimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
		},
	},

	plugins: [flowbite.plugin()],
};
