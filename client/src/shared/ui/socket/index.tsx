"use client";

import { useEffect } from "react";

import { io } from "socket.io-client";

import type { ReactNode } from "react";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const socket = io("http://localhost:4000", {
		transports: ["websocket"]
	});

	useEffect(() => {
		console.log("ss");
		socket.connect();
	}, []);

	return <>{children}</>;
};
