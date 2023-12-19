"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";
import { ChatInfo, ChatInput, ChatMessagesPanel } from "@/features/chat";
import { useChatsStore } from "@/entities/chat";
import { ChatMessages, useMessagesStore } from "@/entities/message";
import { useGetUserByLogin } from "../model";
import cl from "./index.module.scss";
import { ChatLoader } from "./loader";
import { UserNotFound } from "./user-not-found";

export const Chat = () => {
	const { selectedMessages } = useMessagesStore();

	const params = useParams<{ login: string }>();

	const messagesContainer = useRef<HTMLElement | null>(null);

	const { chats, isLoading: isChatsLoading } = useChatsStore();
	const {
		data: user,
		isError: userError,
		isLoading: isUserLoading
	} = useGetUserByLogin(params?.login || "");

	if (isChatsLoading || isUserLoading) {
		return <ChatLoader />;
	}

	if (!chats || !user) {
		return <></>;
	}

	if (userError || typeof user === "string") {
		return <UserNotFound />;
	}

	const chat = chats.find((chat) => chat.user.login === params?.login);

	return (
		<div className={cl.root}>
			{selectedMessages.length > 0 && <ChatMessagesPanel chat={chat} />}
			<ChatInfo
				user={user}
				chat={chat}
			/>
			<ChatMessages
				chat={chat}
				messagesContainer={messagesContainer}
			/>
			<ChatInput
				recipientId={user._id}
				messagesContainer={messagesContainer}
			/>
		</div>
	);
};
