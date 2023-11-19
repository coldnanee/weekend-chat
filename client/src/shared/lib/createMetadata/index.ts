import type { Metadata } from "next";

export const createMetadata = (
	title: string,
	description?: string
): Metadata => {
	return {
		title,
		description,
		robots: {
			index: description !== undefined
		}
		// openGraph: {
		// 	title,
		// 	description
		// }
	};
};
