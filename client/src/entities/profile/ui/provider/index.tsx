"use client";

import { ReactNode, useEffect, useState } from "react";

import { useProfileStore } from "../../model/store";

import { Loader } from "@/shared";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	const [isFetched, setIsFetched] = useState<boolean>(false);

	const { isLoading, fetchProfile } = useProfileStore();

	useEffect(() => {
		const isAuth = getCookie("auth");
		if (isAuth) {
			fetchProfile(router);
		}
		setIsFetched(true);
	}, []);

	return <>{!isFetched || isLoading ? <Loader /> : children}</>;
};
