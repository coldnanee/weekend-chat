"use client";

import { useEffect } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { io } from "socket.io-client";

import type { ReactNode } from "react";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { profile } = useAppSelector((state) => state.profile);

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
		query: {
			user: profile?._id
		},
		autoConnect: false
	});

	useEffect(() => {
		socket.connect();
	}, []);

	return <>{children}</>;
};
