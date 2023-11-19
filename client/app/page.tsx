import HomePage from "@/pages/home-page";
import { createMetadata } from "@/shared";

export const metadata = createMetadata("Home", "Home");

export default function Home() {
	return <HomePage />;
}
