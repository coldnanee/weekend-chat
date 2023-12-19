"use client";

import { getCookie } from "cookies-next";
import { ReactNode, useEffect, useState } from "react";

import { Loader } from "@/shared";
import { useProfileStore } from "../../model";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const { isLoading, fetchProfile } = useProfileStore();

	useEffect(() => {
		const isAuth = getCookie("auth");
		if (isAuth) {
			fetchProfile();
		}

		setIsFetched(true);
	}, []); // eslint-disable-line

	return <>{!isFetched || isLoading ? <Loader /> : children}</>;
};
