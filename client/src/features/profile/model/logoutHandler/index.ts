import type { Socket } from "socket.io-client";

import { useProfileStore } from "@/entities/profile";

export const logoutHandler = (socket: Socket) => {
	socket.on("logout-client", () => {
		useProfileStore.getState().logoutUser();
	});
};
