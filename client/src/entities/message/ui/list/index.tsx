"use client";

import { StartChat } from "../start-chat";

import { useParams } from "next/navigation";

import type { TChat } from "@/entities/chat";

import { useRef, useEffect, useState } from "react";

import cl from "./index.module.scss";

import { ChatMessage } from "..";

export const ChatMessages = ({ chat }: { chat?: TChat }) => {
	const params = useParams<{ login: string }>();

	const [isTyping, setIsTyping] = useState<boolean>(false);

	const messagesContainer = useRef<null | HTMLElement>(null);

	useEffect(() => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	}, [chat]);

	if (!chat) {
		return <StartChat name={params?.login || ""} />;
	}

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
			{isTyping && (
				<p className={cl.root__typing}>
					{chat.user.login} is typing<span> . . .</span>
				</p>
			)}
		</section>
	);
};
