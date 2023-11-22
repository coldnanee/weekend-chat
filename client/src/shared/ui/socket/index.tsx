"use client";

import { createContext, useContext, useState } from "react";

import { useEffect, useRef } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { io, Socket } from "socket.io-client";

import type { ReactNode } from "react";

import type { TMessage } from "@/entities/message";

export const SocketContext = createContext<{ socket?: Socket }>({
	socket: undefined
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { profile } = useAppSelector((state) => state.profile);

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
		autoConnect: false,
		query: {
			user: profile?._id
		}
	});

	useEffect(() => {
		if (profile) {
			socket.connect();
		}
	}, [profile]);

	// socket.current?.on("new-online-user", (data) => {
	// 	// console.log(data);
	// });

	socket.on("get-message", (data: TMessage) => {
		console.log(data);
	});

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
