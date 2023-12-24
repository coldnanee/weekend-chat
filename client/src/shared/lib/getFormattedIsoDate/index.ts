export const getFormattedIsoDate = (dateFromMsg: string): string => {
	const specifiedDate = new Date(dateFromMsg);
	const dateNow = new Date();

	const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z?$/;

	if (!dateRegex.test(dateFromMsg)) {
		return "";
	}

	const timeDifference = dateNow.getTime() - specifiedDate.getTime();

	const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

	const getTime = () => {
		const formattingTime = (minOrHour: number) => {
			if (String(minOrHour).length < 2) {
				return `0${minOrHour}`;
			}

			return String(minOrHour);
		};

		const minutes = formattingTime(specifiedDate.getMinutes());
		const hours = formattingTime(specifiedDate.getHours());

		return `${hours}:${minutes}`;
	};

	switch (daysDifference) {
		case 0:
			return getTime();
		case 1:
			return "yesterday";
		case 7:
			return "1w.";
	}

	if (daysDifference < 7) {
		return `${daysDifference}d.`;
	}

	return `${Math.floor(daysDifference / 7)}w.`;
};
