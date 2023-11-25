"use client";

import { ChatInput } from "./input";
import { ChatMessages } from "@/entities/message";
import { UserNotFound } from "./user-not-found";

import cl from "./index.module.scss";

import { useParams } from "next/navigation";
import { ChatInfo } from "./chat-info";
import { StartChat } from "./start-chat";

import { useGetChatsQuery } from "@/entities/chat";

export const Chat = () => {
	const params = useParams<{ login: string }>();

	const { data, isError } = useGetChatsQuery("");

	if (!data) {
		return <></>;
	}

	if (isError) {
		return <UserNotFound />;
	}

	const chat = data.chats.find((chat) => chat.user.login === params?.login);

	if (!chat) {
		return <StartChat name={params?.login || ""} />;
	}

	return (
		<div className={cl.root}>
			<ChatInfo
				user={chat.user}
				chat={chat}
			/>
			<ChatMessages chat={chat} />
			<ChatInput recipientId={chat.user._id} />
		</div>
	);
};
