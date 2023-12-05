"use client";

import { ReactNode, useEffect, useState } from "react";

import { useProfileStore } from "../../model/store";

import { Loader } from "@/shared";

import { getCookie } from "cookies-next";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const { isLoading, fetchProfile } = useProfileStore();

	useEffect(() => {
		const isAuth = getCookie("auth");
		if (isAuth) {
			fetchProfile();
		}

		setIsFetched(true);
	}, []);

	return <>{!isFetched || isLoading ? <Loader /> : children}</>;
};
