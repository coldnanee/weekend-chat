import { generateMetadata } from "@/shared";

import SettingsPage from "@/pages/settings-page";

export const metadata = generateMetadata("Settings");

export default function Settings() {
	return <SettingsPage />;
}
