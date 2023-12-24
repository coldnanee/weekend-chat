import type { Socket } from "socket.io";

import TokenService from "../../token/token.service";

export const handshakeSocket = (socket: Socket) => {
	const unAuthFn = () => socket.disconnect();

	const cookies = socket.handshake.headers.cookie;

	if (!cookies) {
		return unAuthFn();
	}

	if (!cookies.includes("accessJwt") || !cookies.includes("sessionId")) {
		return unAuthFn();
	}

	cookies.split(" ").map((cookie) => {
		const [name, value] = cookie.split("=");
		if (name === "accessJwt") {
			const userId = TokenService.validateAccessToken(value.replace(";", ""));

			if (!userId) {
				return unAuthFn();
			}

			socket.handshake.query.user = userId;
		}
		if (name === "sessionId") {
			const sessionId = value.replace(";", "");

			if (!sessionId) {
				return unAuthFn();
			}

			socket.handshake.query.session = sessionId;
		}
	});
};
