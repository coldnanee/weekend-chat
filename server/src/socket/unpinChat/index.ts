import type { Server, Socket } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import SessionModel from "../../db/models/SessionModel";
import ChatModel from "../../db/models/ChatModel";

import type { TSocketCbError } from "../../types";

import { checkAuthSocket } from "../../libs";

import SessionService from "../../session/session.service";

export const unpinChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"unpin-chat",
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

				chat.isPinned = false;

				await chat.save();

				SessionService.emitEventForEachSession(io, sessions, usersSessions, {
					name: "unpin-chat-client",
					data: {
						chatId
					}
				});
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
