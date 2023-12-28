"use client";

import { getCookie } from "cookies-next";

import { type ReactNode, useEffect, useState } from "react";
import { Loader } from "@/shared";
import { useProfileSettingsStore } from "../..";

export const ProfileSettingsProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const { isSettingsLoading, fetchSettings } = useProfileSettingsStore();

	const [isFetched, setIsFetched] = useState<boolean>(false);

	useEffect(() => {
		const isAuth = getCookie("accessJwt");

		if (isAuth) {
			fetchSettings();
		}
		setIsFetched(true);
	}, []); // eslint-disable-line

	return <>{!isFetched || isSettingsLoading ? <Loader /> : children}</>;
};
