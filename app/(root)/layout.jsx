import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
	return (
		<main className="root">
			<Sidebar />
			<section className="p-10 ml-[250px] w-full">{children}</section>
		</main>
	);
}