import { createMetadata } from "@/shared";

import ChatPage from "@/pages/chat-page/ui";

export const generateMetadata = async ({
	params: { login }
}: {
	params: { login: string };
}) => {
	return createMetadata(`Chat | ${login}`, "Messenger");
};

export default function Chat() {
	return <ChatPage />;
}
