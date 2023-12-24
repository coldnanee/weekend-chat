import type { Socket } from "socket.io";

import TokenService from "../../token/token.service";

export const checkAuthSocket = (
	socket: Socket,
	errorData: { name: string; data?: unknown } | null,
	accessJwt: string
) => {
	const unAuthFn = () => {
		socket.emit("socket-unauth", errorData);
	};

	if (!accessJwt) {
		unAuthFn();
		return false;
	}

	const userId = TokenService.validateAccessToken(accessJwt);

	if (!userId) {
		unAuthFn();
		return false;
	}

	return true;
};
