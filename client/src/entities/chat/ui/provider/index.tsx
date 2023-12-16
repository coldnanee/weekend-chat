"use client";

import { useChatsStore } from "@/entities/chat";
import { useEffect, type ReactNode } from "react";

import { getCookie } from "cookies-next";

export const ChatsProvider = ({ children }: { children: ReactNode }) => {
	const { fetchChats } = useChatsStore();

	useEffect(() => {
		const isAuth = getCookie("auth");
		if (isAuth) {
			fetchChats("");
		}
	}, []);

	return <>{children}</>;
};
