import { Socket } from "socket.io-client";

import { updateOnlineUsersAction } from "../slice";

export const newOnlineUserHandler = (socket: Socket, dispatch: any) => {
	socket.on("new-online-user", (users: string[]) => {
		dispatch(updateOnlineUsersAction(users));
	});
};
