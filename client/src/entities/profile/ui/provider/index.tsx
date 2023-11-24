"use client";

import { ReactNode, useEffect, useRef } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

import { Loader } from "@/shared";

import { fetchMyProfile } from "../../model/slice/fetchMyProfile";

import { getCookie } from "cookies-next";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const isFetched = useRef(false);

	const dispatch = useAppDispatch();

	const { status } = useAppSelector((store) => store.profile);

	useEffect(() => {
		const isProfileFetched = localStorage.getItem("fetchUser");

		if (!isProfileFetched) {
			getCookie("auth") && dispatch(fetchMyProfile());
			localStorage.setItem("fetchUser", "+");
			isFetched.current = true;
		} else {
			localStorage.removeItem("fetchUser");
		}
	}, []);

	// FIX:

	return (
		<>{!isFetched.current || status === "loading" ? <Loader /> : children}</>
	);
};
