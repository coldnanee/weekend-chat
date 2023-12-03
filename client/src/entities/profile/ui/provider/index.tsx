"use client";

import { ReactNode, useEffect, useState } from "react";

import { useProfileStore } from "../../model/store";

import { Loader } from "@/shared";

import { getCookie } from "cookies-next";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const { isLoading, fetchProfile } = useProfileStore();

	useEffect(() => {
		const isProfileFetched = localStorage.getItem("fetchUser");

		if (!isProfileFetched) {
			const isAuth = getCookie("auth");
			if (isAuth) {
				fetchProfile();
			}
			localStorage.setItem("fetchUser", "+");
			setIsFetched(true);
		} else {
			localStorage.removeItem("fetchUser");
		}
	}, []);

	return <>{!isFetched || isLoading ? <Loader /> : children}</>;
};
