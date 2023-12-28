import { useProfileSettingsStore } from "@/entities/settings";
import { i18n } from "@/shared";

const userLanguage = useProfileSettingsStore.getState().settings?.language;

const language =
	userLanguage && i18n.languages.includes(userLanguage) ? userLanguage : "ru";

export const getDictionary = () =>
	import(`../../../../../__dictionaries/${language}.json`).then(
		(module) => module.default
	);
