"use client";

import { createContext, useContext, type ReactNode, useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

import { io, Socket } from "socket.io-client";

import {
	getMessageHandler,
	newChatHandler,
	sendMessageHandler,
	entryChatHandler,
	deleteChatHandler,
	deleteMessageHandler
} from "@/entities/chat";
import { newOnlineUserHandler } from "@/entities/user";
import { newOfflineUserHandler } from "@/entities/user";

import { getCookie } from "cookies-next";

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

	const router = useRouter();
	const path = usePathname();

	useEffect(() => {
		const isAuth = getCookie("auth");
		if (isAuth) {
			socket.connect();
		}
	}, []);

	getMessageHandler(socket);
	sendMessageHandler(socket);
	newOnlineUserHandler(socket);
	newOfflineUserHandler(socket);
	newChatHandler(socket);
	entryChatHandler(socket);
	deleteChatHandler(router, path || "", socket);
	deleteMessageHandler(socket);

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
