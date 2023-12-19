import SettingsPage from "@/pages/settings-page";

import { createMetadata } from "@/shared";

export const metadata = createMetadata("Settings");

export default function Settings() {
	return <SettingsPage />;
}
