import LoginPage from "@/pages/login-page";

import { createMetadata } from "@/shared";

export const metadata = createMetadata("Login", "Login");

export default function Login() {
	return <LoginPage />;
}
