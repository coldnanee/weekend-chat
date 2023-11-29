import type { Server, Socket } from "socket.io";

export const endTypingMessageHandler = (io: Server, socket: Socket) => {
	socket.on("stop-typing", () => {
		console.log("stop!");
	});
};
