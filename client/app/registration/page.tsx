import RegistrationPage from "@/pages/registration-page";

import { createMetadata } from "@/shared";

export const metadata = createMetadata("Registration", "Registration");

export default function Registration() {
	return <RegistrationPage />;
}
