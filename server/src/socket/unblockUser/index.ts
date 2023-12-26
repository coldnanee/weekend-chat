import type { Server, Socket } from "socket.io";
import { TSocketCbError } from "../../types";
import { checkAuthSocket, connectionQueryWrapper } from "../../libs";
import UserModel from "../../db/models/UserModel";

import SessionModel from "../../db/models/SessionModel";

import SessionService from "../../session/session.service";

export const unblockUserHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"unblock-user",
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

			if (!blackList.includes(recipientId)) {
				return cb({ status: 400, message: "User is not blocked" });
			}

			const updatedBlackList = [...blackList].filter((u) => u !== recipientId);

			user.blackList = updatedBlackList;

			await user.save();

			const mySessions = await SessionModel.find({ user: myId });
			const recipientSessions = await SessionModel.find({ user: recipientId });

			SessionService.emitEventForEachSession(io, mySessions, usersSessions, {
				name: "unblock-user-client",
				data: {
					userId: recipientId
				}
			});

			SessionService.emitEventForEachSession(
				io,
				recipientSessions,
				usersSessions,
				{
					name: "unblock-me-client",
					data: {
						userId: myId
					}
				}
			);
		}
	);
};
