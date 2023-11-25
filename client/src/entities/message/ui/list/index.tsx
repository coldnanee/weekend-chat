"use client";

import type { TChat } from "@/entities/chat";

import { useRef, useEffect } from "react";

import cl from "./index.module.scss";

import { ChatMessage } from "..";

export const ChatMessages = ({ chat }: { chat: TChat }) => {
	const messagesContainer = useRef<null | HTMLElement>(null);

	useEffect(() => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	}, [chat]);

	return (
		<section
			ref={messagesContainer}
			className={cl.root}>
			<ul className={cl.root__list}>
				{chat.messages.map((message) => (
					<ChatMessage
						user={chat.user}
						message={message}
						key={message._id}
					/>
				))}
			</ul>
		</section>
	);
};
