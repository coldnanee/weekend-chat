import SessionModel from "../db/models/SessionModel";
import { ApiError } from "../errors";

import { SessionDto } from "../dtos/session.dto";

class SessionService {
	async getSessions(userId: string, sessionId: string) {
		const sessions = await SessionModel.find({ user: userId });

		if (!sessions) {
			throw ApiError.unAuthorizedError();
		}

		const sessionsDto = sessions.map((s) => new SessionDto(s, sessionId));

		return sessionsDto;
	}
}

export default new SessionService();
