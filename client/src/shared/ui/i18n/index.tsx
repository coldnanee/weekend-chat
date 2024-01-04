"use client";

import { useState, useEffect, type ReactNode } from "react";

import { Loader } from "@/shared";
import { useI18nStore } from "../../lib";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
	const [isRead, setIsRead] = useState<boolean>(false);
	const { fetchDictionary, isDictionaryLoading } = useI18nStore();

	useEffect(() => {
		fetchDictionary();
		setIsRead(true);
	}, []); // eslint-disable-line

	return (
		<div data-testid="i18n-provider">
			{!isRead || isDictionaryLoading ? <Loader /> : children}
		</div>
	);
};
