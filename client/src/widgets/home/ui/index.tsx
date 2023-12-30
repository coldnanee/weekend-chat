"use client";

import { useI18nStore } from "@/features/i18n";

export const Home = () => {
	const { translate } = useI18nStore();

	return <h1>{translate("title")}</h1>;
};
