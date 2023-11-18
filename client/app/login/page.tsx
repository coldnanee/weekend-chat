import LoginPage from "@/pages/login-page";

import { generateMetadata } from "@/shared";

export const metadata = generateMetadata("Login", "Login");

export default function Login() {
	return <LoginPage />;
}
