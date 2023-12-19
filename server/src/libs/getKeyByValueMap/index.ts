export const getKeyByValueMap = (
	values: Map<string, string>,
	valueName: string
) => {
	for (const [key, value] of values) {
		if (value === valueName) {
			return key;
		}
	}

	return null;
};
