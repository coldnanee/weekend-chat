import type { Server, Socket } from "socket.io";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper } from "../../libs";
import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "../../libs";

import type { TSocketCbError } from "../../types";

import SessionService from "../../session/session.service";

export const pinChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"pin-chat",
		async (data: { chatId: string }, accessJwt: string, cb: TSocketCbError) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { chatId } = data;

				const user = connectionQueryWrapper(socket.handshake.query.user);

				const chat = await ChatModel.findById(chatId);

				if (!chat) {
					return cb({ status: 400, message: "Chat not found" });
				}

				const sessions = await SessionModel.find({ user });

				chat.isPinned = true;

				await chat.save();

				SessionService.emitEventForEachSession(io, sessions, usersSessions, {
					name: "pin-chat-client",
					data: {
						chatId
					}
				});
			} catch (e) {
				return cb({ status: 400, message: "Unexpected error" });
			}
		}
	);
};
