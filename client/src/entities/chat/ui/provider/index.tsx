"use client";

import { getCookie } from "cookies-next";
import { useEffect, type ReactNode } from "react";
import { useChatsStore } from "@/entities/chat";

export const ChatsProvider = ({ children }: { children: ReactNode }) => {
	const { fetchChats } = useChatsStore();

	useEffect(() => {
		const isAuth = getCookie("accessJwt");
		if (isAuth) {
			fetchChats("");
		}
	}, []); // eslint-disable-line

	return <>{children}</>;
};
