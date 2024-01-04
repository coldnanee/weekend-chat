import { checkAuthSocket } from "./";

import TokenService from "../../token/token.service";

describe("checkAuthSocket", () => {
	test("must be a true", () => {
		const mockTokenService = jest.spyOn(TokenService, "generateTokens");
		const mockCb = jest.fn();

		const { accessToken } = TokenService.generateTokens({
			_id: "id",
			login: "login"
		});
		const result = checkAuthSocket(accessToken, mockCb);

		expect(mockCb).toHaveBeenCalledTimes(0);
		expect(mockTokenService).toHaveBeenCalledTimes(1);
		expect(result).toBe(true);
	});

	test("must be an error / without access", () => {
		const mockCb = jest.fn();
		const mockTokenService = jest.spyOn(TokenService, "validateAccessToken");

		checkAuthSocket("", mockCb);

		expect(mockTokenService).toHaveBeenCalledTimes(0);
		expect(mockCb).toHaveBeenCalledTimes(1);
	});

	test("must be an error / invalid access", () => {
		const mockCb = jest.fn();
		const mockTokenService = jest.spyOn(TokenService, "validateAccessToken");

		checkAuthSocket("smsksm", mockCb);

		expect(mockTokenService).toHaveBeenCalledTimes(1);
		expect(mockCb).toHaveBeenCalledTimes(1);
	});
});
