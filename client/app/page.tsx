import HomePage from "@/pages/home-page";
import { generateMetadata } from "@/shared";

export const metadata = generateMetadata("Home", "Home");

export default function Home() {
	return <HomePage />;
}
