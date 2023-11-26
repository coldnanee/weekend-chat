import { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import ChatModel from "../../db/models/ChatModel";
import MessageModel from "../../db/models/MessageModel";

export const readMessageHandler = (io: Server, socket: Socket) => {
	socket.on("read-messages", async (messages: string[]) => {
		const user = connectionQueryWrapper(socket.handshake.query.user);

		const readMessages = messages.map(async (_id) => {
			const message = await MessageModel.find({ _id, user });

			if (!message) {
				return null;
			}

			return message;
		});

		const test = await Promise.all(readMessages);

		console.log(test);
	});
};
