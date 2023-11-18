import { validationResult } from "express-validator";
import type { Request } from "express";

import { ApiError } from "../../errors";

export const getValidationError = (req: Request) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		let errorMessage = "";
		errors.array().forEach((error) => (errorMessage += `${error.msg}. `));
		throw ApiError.badRequestError(errorMessage);
	}
};
