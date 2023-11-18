export class ApiError extends Error {
	constructor(
		public status: number,
		public message: string
	) {
		super(message);
	}

	static unAuthorizedError() {
		return new ApiError(401, "You unauthorized!");
	}

	static badRequestError(message: string) {
		return new ApiError(400, message);
	}
}
