"use client";

import { createContext, useContext } from "react";

import { useEffect } from "react";

import { io, Socket } from "socket.io-client";

import type { ReactNode } from "react";

import { getMessageHandler } from "@/entities/chat";
import { sendMessageHandler } from "@/entities/chat";
import { newOnlineUserHandler } from "@/entities/user";
import { newOfflineUserHandler } from "@/entities/user";

import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

export const SocketContext = createContext<{ socket?: Socket }>({
	socket: undefined
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const dispatch = useAppDispatch();

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
		autoConnect: false
	});

	useEffect(() => {
		socket.connect();
	});

	getMessageHandler(socket, dispatch);
	sendMessageHandler(socket, dispatch);
	newOnlineUserHandler(socket, dispatch);
	newOfflineUserHandler(socket, dispatch);

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
