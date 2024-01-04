"use client";

import { getCookie } from "cookies-next";

import { type ReactNode, useEffect } from "react";

import { useSocketStore } from "../../model";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { socket } = useSocketStore();

	useEffect(() => {
		const isAuth = getCookie("accessJwt");
		if (isAuth) {
			socket.connect();
		}
	}, []); //eslint-disable-line

	return <div data-testid="socket-provider">{children}</div>;
};
