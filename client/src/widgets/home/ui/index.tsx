"use client";

import { useI18nStore } from "@/shared";

export const Home = () => {
	const { translate } = useI18nStore();

	return <h1>{translate("title")}</h1>;
};
