import type { Socket, Server } from "socket.io";

export const startTypingMessageHandler = (io: Server, socket: Socket) => {
	socket.on("start-typing", () => {
		console.log("start");
	});
};
