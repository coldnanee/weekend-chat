export const i18n: Ti18n = {
	defaultLanguage: "en",
	languages: ["en", "ru"]
};

type Ti18n = {
	defaultLanguage: string;
	languages: Readonly<string[]>;
};

export { useI18nStore } from "./store";
