"use client";

import { useParams } from "next/navigation";

import { useEffect, useState, type MutableRefObject } from "react";

import { useChatsStore, type TChat } from "@/entities/chat"; // eslint-disable-line boundaries/element-types

import { useOnlineUsersStore } from "@/entities/user"; // eslint-disable-line boundaries/element-types
import { ChatMessage } from "../item";
import { StartChat } from "../start-chat";
import cl from "./index.module.scss";
import { useSocketContext } from "@/layout"; // eslint-disable-line import/order

export const ChatMessages = ({
	chat,
	messagesContainer
}: {
	chat?: TChat;
	messagesContainer: MutableRefObject<HTMLElement | null>;
}) => {
	const params = useParams<{ login: string }>();
	const { readMessagesLocal } = useChatsStore();

	const users = useOnlineUsersStore((state) => state.users);

	const { socket } = useSocketContext();

	const [isTyping, setIsTyping] = useState<boolean>(false);

	useEffect(() => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	}, [chat]); //eslint-disable-line

	useEffect(() => {
		readMessagesLocal(chat?._id || "");
		socket?.emit("entry-chat", chat?._id);

		return () => {
			socket?.emit("leave-chat");
		};
	}, []); //eslint-disable-line

	if (!chat) {
		return <StartChat name={params?.login || ""} />;
	}

	socket?.on("start-typing-client", (user: string) => {
		if (chat.user._id === user) {
			setIsTyping(true);
		}
	});

	socket?.on("stop-typing-client", (user: string) => {
		if (chat.user._id === user) {
			setIsTyping(false);
		}
	});

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
			{isTyping && users.includes(chat.user._id) && (
				<p className={cl.root__typing}>
					{chat.user.login} is typing<span> . . .</span>
				</p>
			)}
		</section>
	);
};
