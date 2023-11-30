import { Chat } from "@/widgets/chat";

import "./ChatPage.scss";

import { Layout } from "@/layout";

const ChatPage = () => {
	return (
		<div className="chats-page-layout">
			<Layout>
				<Chat />
			</Layout>
		</div>
	);
};

export default ChatPage;
