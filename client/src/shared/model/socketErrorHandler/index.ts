import type { Socket } from "socket.io-client";

import { useSocketStore } from "..";

export const socketErrorHandler = (socket: Socket) => {
	socket.on("error-client", (e: string) => {
		useSocketStore.getState().setError(e);
	});
};
