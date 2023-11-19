import { createMetadata } from "@/shared";

import SettingsPage from "@/pages/settings-page";

export const metadata = createMetadata("Settings");

export default function Settings() {
	return <SettingsPage />;
}
