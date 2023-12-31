import { Chat } from "@/widgets/chat"; // eslint-disable-line import/order
import { Layout } from "@/layout"; // eslint-disable-line import/order

import "./ChatPage.scss";

const ChatPage = () => {
	return (
		<div
			data-testid="chat-page"
			className="chats-page-layout">
			<Layout>
				<Chat />
			</Layout>
		</div>
	);
};

export default ChatPage;
