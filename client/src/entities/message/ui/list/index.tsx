"use client";

import { useParams } from "next/navigation";

import { useEffect, useState, type MutableRefObject } from "react";

import { useI18nStore } from "@/features/i18n"; // eslint-disable-line boundaries/element-types
import { type TChat } from "@/entities/chat"; // eslint-disable-line boundaries/element-types

import { useOnlineUsersStore } from "@/entities/user"; // eslint-disable-line boundaries/element-types
import { ChatMessage } from "../item";
import { StartChat } from "../start-chat";
import cl from "./index.module.scss";
import { useSocketStore } from "@/shared"; // eslint-disable-line import/order

export const ChatMessages = ({
	chat,
	messagesContainer
}: {
	chat?: TChat;
	messagesContainer: MutableRefObject<HTMLElement | null>;
}) => {
	const params = useParams<{ login: string }>();

	const { translate } = useI18nStore();

	const { users } = useOnlineUsersStore();
	const { socket } = useSocketStore();

	const [isTyping, setIsTyping] = useState<boolean>(false);

	const scrollToChatDown = () => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToChatDown();
	}, [chat]); //eslint-disable-line

	if (!chat) {
		return <StartChat name={params?.login || ""} />;
	}

	socket.on("start-typing-client", ({ userId }: { userId: string }) => {
		if (chat.user._id === userId && !isTyping) {
			scrollToChatDown();
			setIsTyping(true);
		}
	});

	socket.on("stop-typing-client", ({ userId }: { userId: string }) => {
		if (chat.user._id === userId && isTyping) {
			setIsTyping(false);
		}
	});

	const rootTypingClasses = [cl.root__typing];

	if (isTyping && users.includes(chat.user._id)) {
		rootTypingClasses.push(cl.root__typing_visible);
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
			<p className={rootTypingClasses.join(" ")}>
				{chat.user.login} {translate("chat_typing")}
				<span> . . .</span>
			</p>
		</section>
	);
};
