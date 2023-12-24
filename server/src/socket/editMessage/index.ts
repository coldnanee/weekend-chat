import type { Server, Socket } from "socket.io";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper } from "../../libs";
import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "../../libs";

export const editMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on(
		"edit-message",
		async (
			data: { messageId: string; updateText: string },
			accessJwt: string
		) => {
			try {
				const isAuth = checkAuthSocket(
					socket,
					{
						name: "edit-message",
						data
					},
					accessJwt
				);

				if (!isAuth) {
					return;
				}

				const { messageId, updateText } = data;

				const myId = connectionQueryWrapper(socket.handshake.query.user);

				const message = await MessageModel.findById(messageId);

				if (!message) {
					io.emit("error-client", "Message not found");
					return;
				}

				const chat = await ChatModel.findById(message.chat);

				if (!chat) {
					io.emit("error-client", "Chat not found");
					return;
				}

				if (myId === message.user.toString()) {
					const recipientId = chat.members.filter((m) => m !== myId).join("");

					const mySessions = await SessionModel.find({ user: myId });
					const recipientSessions = await SessionModel.find({
						user: recipientId
					});

					message.text = updateText;
					message.isUpdated = true;

					await message.save();

					mySessions.map((s) => {
						const sessionSocketId = usersSessions.get(s._id.toString());
						if (sessionSocketId) {
							io.to(sessionSocketId).emit("edit-message-client", {
								...data,
								chat: chat._id
							});
						}
					});

					recipientSessions.map((s) => {
						const sessionSocketId = usersSessions.get(s._id.toString());
						if (sessionSocketId) {
							io.to(sessionSocketId).emit("edit-message-client", {
								...data,
								chat: chat._id
							});
						}
					});
				}
			} catch (e) {
				io.emit("error-client", e);
			}
		}
	);
};
