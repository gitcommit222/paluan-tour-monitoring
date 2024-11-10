import { Suspense, lazy } from "react";
import WhiteBackdrop from "@/components/WhiteBackdrop";

const Sidebar = lazy(() => import("@/components/Sidebar"));
const ProtectedRoutes = lazy(() => import("@/hoc/ProtectedRoutes"));

export default function RootLayout({ children }) {
	return (
		<main className="root">
			<Suspense fallback={<WhiteBackdrop />}>
				<ProtectedRoutes roles={["admin"]}>
					<div className="fixed">
						<Sidebar />
					</div>
					<section className="p-10 ml-[250px] w-full">{children}</section>
				</ProtectedRoutes>
			</Suspense>
		</main>
	);
}
