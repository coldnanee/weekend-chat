import type { Socket } from "socket.io-client";

import { refreshToken } from "@/shared";

import { useSocketStore } from "@/shared";

import type { TSocketEvent } from "../types";

export const unAuthSocketHandler = (socket: Socket) => {
	const {
		isRefreshLoading,
		addEventToStack,
		runEvents,
		setIsRefreshLoading,
		socketEvent
	} = useSocketStore.getState();

	socket.on("socket-unauth", (event: TSocketEvent) => {
		// if (isRefreshLoading) {
		// 	console.log(event);
		// 	addEventToStack(event);
		// } else {
		// 	setIsRefreshLoading(true);
		refreshToken().then((refresh) => {
			refresh
				? socketEvent(event.name, event.data)
				: window && location.replace("/login");
		});
		// .finally(() => setIsRefreshLoading(false));
		// }
	});
};
