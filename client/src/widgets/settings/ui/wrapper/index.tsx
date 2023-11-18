import { SettingsAccount } from "../account";
import { SettingsGeneral } from "../general";

import { useSettingsContext } from "../../lib/useSettingsContext";

export const SettingsWrapper = () => {
	const { activeChapter } = useSettingsContext();

	return activeChapter === "account" ? (
		<SettingsAccount />
	) : (
		<SettingsGeneral />
	);
};
