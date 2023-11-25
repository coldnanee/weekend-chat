import { Socket } from "socket.io-client";

import { updateOnlineUsersAction } from "../slice";

export const newOfflineUserHandler = (socket: Socket, dispatch: any) => {
	socket.on("new-offline-user", (users: string[]) => {
		dispatch(updateOnlineUsersAction(users));
	});
};
