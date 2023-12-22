"use client";

import { getCookie } from "cookies-next";

import { createContext, useContext, type ReactNode, useEffect } from "react";

import { io, Socket } from "socket.io-client";

import {
	getMessageHandler,
	newChatHandler,
	sendMessageHandler,
	deleteChatHandler,
	deleteMessageHandler
} from "@/features/chat"; // eslint-disable-line boundaries/element-types
import { newOnlineUserHandler, newOfflineUserHandler } from "@/features/user"; // eslint-disable-line boundaries/element-types

export const SocketContext = createContext<{ socket?: Socket }>({
	socket: undefined
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const socket = io(process.env.NEXT_PUBLIC_SERVER_URL || "", {
		path: "/ws",
		transports: ["websocket"],
		autoConnect: false
	});

	useEffect(() => {
		const isAuth = getCookie("auth");
		if (isAuth) {
			socket.connect();
		}
	}, []); //eslint-disable-line

	getMessageHandler(socket);
	sendMessageHandler(socket);
	newOnlineUserHandler(socket);
	newOfflineUserHandler(socket);
	newChatHandler(socket);
	deleteChatHandler(socket);
	deleteMessageHandler(socket);

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
