import Sidebar from "@/components/Sidebar";
import ProtectedRoutes from "@/hoc/ProtectedRoutes";

export default function RootLayout({ children }) {
	return (
		<main className="root">
			<ProtectedRoutes roles={["admin"]}>
				<Sidebar />
				<section className="p-10 ml-[250px] w-full">{children}</section>
			</ProtectedRoutes>
		</main>
	);
}
