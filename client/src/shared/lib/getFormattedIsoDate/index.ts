export const getFormattedIsoDate = (
	dateFromMsg: string
): { isTranslate: boolean; label: string; count?: number } => {
	const specifiedDate = new Date(dateFromMsg);
	const dateNow = new Date();

	const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z?$/;

	if (!dateRegex.test(dateFromMsg)) {
		return { isTranslate: false, label: "" };
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
			return { isTranslate: false, label: getTime() };
		case 1:
			return { isTranslate: true, label: "user_seen_yesterday" };
		case 7:
			return { isTranslate: true, label: "user_seen_week", count: 1 };
	}

	if (daysDifference < 7) {
		return { isTranslate: true, count: daysDifference, label: "user_seen_day" };
	}

	return {
		isTranslate: true,
		label: "user_seen_week",
		count: Math.floor(daysDifference / 7)
	};
};
