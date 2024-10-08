import "./globals.css";
import { Flowbite } from "flowbite-react";
import { customTheme } from "@/lib/customTheme";
import Providers from "@/hoc/Providers";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

const poppins = localFont({
	src: "./fonts/Poppins-Regular.ttf",
	variable: "--font-poppins",
	weight: "100 300 400 900",
});

export const metadata = {
	title: "PTMS",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`${poppins.className} antialiased`}>
				<Flowbite theme={{ theme: customTheme }}>
					<Providers>
						{children}
						<Toaster position="bottom-center" />
					</Providers>
				</Flowbite>
			</body>
		</html>
	);
}
