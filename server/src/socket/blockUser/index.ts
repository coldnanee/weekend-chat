import type { Socket, Server } from "socket.io";

import UserModel from "../../db/models/UserModel";

import { connectionQueryWrapper } from "../../libs";

import type { TSocketCbError } from "../../types";
import SessionModel from "../../db/models/SessionModel";

import SessionService from "../../session/session.service";

import { checkAuthSocket } from "../../libs";

export const blockUserHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"block-user",
		async (
			data: { recipientId: string },
			accessJwt: string,
			cb: TSocketCbError
		) => {
			const isAuth = checkAuthSocket(accessJwt, cb);

			if (!isAuth) {
				return;
			}

			const { recipientId } = data;
			const myId = connectionQueryWrapper(socket.handshake.query.user);

			const user = await UserModel.findById(myId);

			if (!user) {
				return cb({ status: 401, message: "Unauthorized error" });
			}

			const { blackList } = user;

			if (blackList.includes(recipientId)) {
				return cb({ status: 400, message: "User already blocked" });
			}

			blackList.push(recipientId);

			await user.save();

			const mySessions = await SessionModel.find({ user: myId });
			const recipientSessions = await SessionModel.find({ user: recipientId });

			SessionService.emitEventForEachSession(io, mySessions, usersSessions, {
				name: "block-user-client",
				data: {
					userId: recipientId
				}
			});

			SessionService.emitEventForEachSession(
				io,
				recipientSessions,
				usersSessions,
				{
					name: "block-me-client",
					data: {
						userId: myId
					}
				}
			);
		}
	);
};
