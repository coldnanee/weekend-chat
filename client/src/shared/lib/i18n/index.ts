export const i18n: Ti18n = {
	defaultLanguage: "en",
	languages: ["en", "ru"]
} as const;

type Ti18n = {
	defaultLanguage: string;
	languages: string[];
};
