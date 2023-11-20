export const getDateForMessage = () => {
	const months = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december"
	];

	const fullDate = new Date();
	const hours = fullDate.getHours();
	const minutes = fullDate.getMinutes();
	const day = fullDate.getDate();
	const month = fullDate.getMonth();
	const year = fullDate.getFullYear();

	const getFormattedTime = (minnOrHour: number) => {
		if (`${minnOrHour}`.length < 2) {
			return `0${minnOrHour}`;
		}

		return minnOrHour;
	};

	return `${getFormattedTime(hours)}:${getFormattedTime(minutes)} ${day} ${
		months[month]
	} ${year}`;
};
