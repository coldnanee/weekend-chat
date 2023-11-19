import { createMetadata } from "@/shared";

export const generateMetadata = async ({
	params: { id }
}: {
	params: { id: string };
}) => {
	return createMetadata(id);
};

export default function Chat() {}
