import type { Socket } from "socket.io-client";

import { useProfileStore } from "@/entities/profile";

export const unBlockUserHandler = (socket: Socket) => {
	socket.on("unblock-user-client", (data: { userId: string }) => {
		useProfileStore.getState().toggleBlacklist(data.userId);
	});
};
