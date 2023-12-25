import TokenService from "../../token/token.service";

export const checkAuthSocket = (
	accessJwt: string,
	cb: (err: { status: number; message: string }) => void
) => {
	if (!accessJwt) {
		return cb({ status: 401, message: "Unauthorized error" });
	}

	const userId = TokenService.validateAccessToken(accessJwt);

	if (!userId) {
		return cb({ status: 401, message: "Unauthorized error" });
	}

	return true;
};
