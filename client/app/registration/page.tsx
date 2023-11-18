import RegistrationPage from "@/pages/registration-page";

import { generateMetadata } from "@/shared";

export const metadata = generateMetadata("Registration", "Registration");

export default function Registration() {
	return <RegistrationPage />;
}
