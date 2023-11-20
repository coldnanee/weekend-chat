export const connectionQueryWrapper = (query?: string | string[]): string => {
	if (!query) {
		return "";
	}

	if (typeof query === "string") return query;

	return query.join(" ");
};
