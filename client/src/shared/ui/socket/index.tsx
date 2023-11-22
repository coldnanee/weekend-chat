"use client";

import { useEffect } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { useSocket } from "@/shared";

import type { ReactNode } from "react";

import type { TMessage } from "@/entities/message";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { profile } = useAppSelector((state) => state.profile);

	const { socket } = useSocket();

	useEffect(() => {
		if (profile) {
			socket.connect();
		}
	}, [profile]);

	socket.on("new-online-user", (data) => {
		// console.log(data);
	});

	socket.on("get-message", (data: TMessage) => {
		console.log(data);
	});

	return <>{children}</>;
};
