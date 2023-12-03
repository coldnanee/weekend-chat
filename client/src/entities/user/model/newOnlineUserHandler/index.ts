import { Socket } from "socket.io-client";

import { useOnlineUsersStore } from "../store";

export const newOnlineUserHandler = (socket: Socket) => {
	socket.on("new-online-user", (users: string[]) => {
		useOnlineUsersStore.getState().updateOnlineUsers(users);
	});
};
