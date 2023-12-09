"use client";

import { createContext, useContext } from "react";

import { useEffect } from "react";

import { io, Socket } from "socket.io-client";

import type { ReactNode } from "react";

import {
	getMessageHandler,
	newChatHandler,
	sendMessageHandler,
	entryChatHandler,
	deleteChatHandler
} from "@/entities/chat";
import { newOnlineUserHandler } from "@/entities/user";
import { newOfflineUserHandler } from "@/entities/user";

export const SocketContext = createContext<{ socket?: Socket }>({
	socket: undefined
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const socket = io(process.env.SOCKET_URL || "", {
		transports: ["websocket"],
		autoConnect: false
	});

	useEffect(() => {
		socket.connect();
	});

	getMessageHandler(socket);
	sendMessageHandler(socket);
	newOnlineUserHandler(socket);
	newOfflineUserHandler(socket);
	newChatHandler(socket);
	entryChatHandler(socket);
	deleteChatHandler(socket);

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
