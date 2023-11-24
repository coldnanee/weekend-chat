"use client";

import type { TChat } from "@/entities/chat";

import cl from "./index.module.scss";

import { ChatMessage } from "..";

export const ChatMessages = ({ chat }: { chat: TChat }) => {
	return (
		<section className={cl.root}>
			{chat.messages.map((message) => (
				<ChatMessage
					user={chat.user}
					message={message}
					key={message._id}
				/>
			))}
		</section>
	);
};
