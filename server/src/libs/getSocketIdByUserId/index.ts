export const getSocketIdByUserId = (
	users: Map<string, string>,
	userId: string
) => {
	for (let [key, value] of users) {
		if (value === userId) {
			return key;
		}
	}

	return null;
};
