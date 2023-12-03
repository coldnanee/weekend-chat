import { Socket } from "socket.io-client";

import { useOnlineUsersStore } from "../store";

export const newOfflineUserHandler = (socket: Socket) => {
	socket.on("new-offline-user", (users: string[]) => {
		useOnlineUsersStore.getState().updateOnlineUsers(users);
	});
};
