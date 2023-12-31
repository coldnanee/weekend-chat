import SessionModel from "../db/models/SessionModel";
import { ApiError } from "../errors";

import { SessionDto } from "../dtos/session.dto";

import { TSession } from "../types";

import type { Server } from "socket.io";

class SessionService {
	async getSessions(userId: string, sessionId: string) {
		const sessions = await SessionModel.find({ user: userId });

		if (!sessions) {
			throw ApiError.unAuthorizedError();
		}

		const sessionsDto = sessions
			.map((s) => new SessionDto(s, sessionId))
			.filter((s) => !s.isThisDevice);

		return sessionsDto;
	}

	async killSessions(sessionIdArr: string[]) {
		await SessionModel.deleteMany({
			_id: { $in: sessionIdArr }
		});
	}

	emitEventForEachSession(
		io: Server,
		sessions: TSession[],
		usersSessions: Map<string, string[]>,
		event: { name: string; data: unknown }
	) {
		if (event.name === "send-message-client") {
			console.log("my:", sessions); // eslint-disable-line no-console
			console.log("users:", usersSessions); // eslint-disable-line no-console
		}

		sessions.map((s) => {
			const sessionSocketId = usersSessions.get(s._id.toString());

			if (sessionSocketId) {
				if (event.name === "send-message-client") {
					console.log("session socket id", sessionSocketId); // eslint-disable-line no-console
				}

				io.to(sessionSocketId).emit(event.name, event.data);
			}
		});

		// eslint-disable-next-line no-console
		console.log(`/ 
		/
		/
		/
		/
		/
		/
		/
		/
		/
		/
		/
		/
		`);
	}
}

export default new SessionService();
