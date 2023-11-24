"use client";

import { ReactNode, useEffect, useState } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

import { Loader } from "@/shared";

import { fetchMyProfile } from "../../model/slice/fetchMyProfile";

import { getCookie } from "cookies-next";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const { status } = useAppSelector((store) => store.profile);

	useEffect(() => {
		const isProfileFetched = localStorage.getItem("fetchUser");

		if (!isProfileFetched) {
			const isAuth = getCookie("auth");
			if (isAuth) {
				dispatch(fetchMyProfile());
			}
			localStorage.setItem("fetchUser", "+");
			setIsFetched(true);
		} else {
			localStorage.removeItem("fetchUser");
		}
	}, []);

	return <>{!isFetched || status === "loading" ? <Loader /> : children}</>;
};
