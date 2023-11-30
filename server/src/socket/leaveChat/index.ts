import { connectionQueryWrapper } from "./../../libs";
import type { Socket } from "socket.io";

export const leaveChatHandler = (
	socket: Socket,
	usersIntoChats: Map<string, string>
) => {
	socket.on("leave-chat", async () => {
		const userId = connectionQueryWrapper(socket.handshake.query.user);
		usersIntoChats.delete(userId);
	});
};
