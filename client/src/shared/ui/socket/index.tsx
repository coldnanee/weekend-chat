"use client";

import { getCookie } from "cookies-next";

import { type ReactNode, useEffect } from "react";

import {
	getMessageHandler,
	newChatHandler,
	sendMessageHandler,
	deleteChatHandler,
	deleteMessageHandler,
	editMessageHandler,
	pinChatHandler,
	unpinChatHandler
} from "@/features/chat"; // eslint-disable-line boundaries/element-types
import { logoutHandler } from "@/features/profile"; // eslint-disable-line boundaries/element-types
import { newOnlineUserHandler, newOfflineUserHandler } from "@/features/user"; // eslint-disable-line boundaries/element-types
import { unAuthSocketHandler } from "@/shared"; // eslint-disable-line boundaries/element-types
import { useSocketStore, socketErrorHandler } from "../../model";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { socket, error, setError } = useSocketStore();

	useEffect(() => {
		const isAuth = getCookie("accessJwt");
		if (isAuth) {
			socket.connect();
		}
	}, []); //eslint-disable-line

	if (error) {
		alert(error);
		setError(null);
	}

	getMessageHandler(socket);
	sendMessageHandler(socket);
	newOnlineUserHandler(socket);
	newOfflineUserHandler(socket);
	newChatHandler(socket);
	deleteChatHandler(socket);
	deleteMessageHandler(socket);
	logoutHandler(socket);
	editMessageHandler(socket);
	pinChatHandler(socket);
	unpinChatHandler(socket);
	socketErrorHandler(socket);
	unAuthSocketHandler(socket);

	return <>{children}</>;
};
