export const getSlicedMessage = (message: string, isYou: boolean): string => {
	const messageSize = isYou ? 12 : 15;

	return `${message.slice(0, messageSize)}${
		message.length < messageSize ? "" : "..."
	}`;
};
