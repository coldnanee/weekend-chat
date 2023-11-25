import type { Socket } from "socket.io";

import TokenService from "../../token/token.service";

export const checkAuthForSocket = (socket: Socket) => {
	const cookies = socket.handshake.headers.cookie || "";

	cookies.split(" ").map((cookie) => {
		const [name, value] = cookie.split("=");
		if (name === "accessJwt") {
			const userId = TokenService.validateAccessToken(value.replace(";", ""));

			if (!userId) {
				return socket.disconnect();
			}

			socket.handshake.query.user = userId;
		}
	});
};
