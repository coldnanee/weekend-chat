"use client";

import { ChatInput } from "./input";
import { ChatMessages } from "@/entities/message";
import { UserNotFound } from "./user-not-found";

import { ChatLoader } from "./loader";

import cl from "./index.module.scss";

import { useParams } from "next/navigation";
import { useGetUserByLogin } from "../lib/useGetUserByLogin";

import { useChatsStore } from "@/entities/chat";

import { ChatInfo } from "./chat-info";

import { useMessagesStore } from "@/entities/message";

import { ChatMessagesPanel } from "./messages-panel";

import { useRef } from "react";

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
