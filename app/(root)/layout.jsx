import Sidebar from "@/components/Sidebar";
import ProtectedRoutes from "@/hoc/ProtectedRoutes";

export default function RootLayout({ children }) {
	return (
		<main className="root">
			<ProtectedRoutes allowedRoles={["admin"]}>
				<Sidebar />
				<section className="p-10 ml-[250px] w-full">{children}</section>
			</ProtectedRoutes>
		</main>
	);
}
