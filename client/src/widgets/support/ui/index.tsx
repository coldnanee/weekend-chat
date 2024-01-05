"use client";

import { useI18nStore } from "@/shared";

export const Support = () => {
	const { translate } = useI18nStore();

	return <h1>{translate("support", "support_title")}</h1>;
};
