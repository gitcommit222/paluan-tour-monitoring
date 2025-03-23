/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
			},
		],
	},
};

export default nextConfig;
