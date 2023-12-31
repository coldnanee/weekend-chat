"use client";

import { getCookie } from "cookies-next";
import { ReactNode, useEffect, useState } from "react";

import { Loader } from "@/shared";
import { useProfileStore } from "../../model";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const { isLoading: isProfileLoading, fetchProfile } = useProfileStore();

	useEffect(() => {
		const isAuth = getCookie("accessJwt");

		if (isAuth) {
			fetchProfile();
		}

		setIsFetched(true);
	}, []); // eslint-disable-line

	return <>{!isFetched || isProfileLoading ? <Loader /> : children}</>;
};
