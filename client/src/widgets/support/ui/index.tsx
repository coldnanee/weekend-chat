"use client";

import { useI18nStore } from "@/features/i18n";

export const Support = () => {
	const { translate } = useI18nStore();

	return <h1>{translate("support_title")}</h1>;
};
