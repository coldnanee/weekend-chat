import TokenService from "../../token/token.service";

import type { Request } from "express";

export const getAccessJwt = (req: Request) => {
	const { accessJwt } = req.cookies as { accessJwt: string };

	if (!accessJwt) {
		return null;
	}

	const id = TokenService.validateAccessToken(accessJwt);

	return id;
};
