"use client";

import { ChatInput } from "./input";
import { ChatMessages } from "@/entities/message";
import { UserNotFound } from "./user-not-found";

import { ChatLoader } from "./loader";

import cl from "./index.module.scss";

import { useParams } from "next/navigation";
import { useGetChatsQuery } from "@/entities/chat";
import { useGetUserByLogin } from "../lib/useGetUserByLogin";

import { ChatInfo } from "./chat-info";

export const Chat = () => {
	const params = useParams<{ login: string }>();

	const {
		data: chats,
		isError,
		isLoading: isChatsLoading
	} = useGetChatsQuery("");
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

	if (isError || userError || typeof user === "string") {
		return <UserNotFound />;
	}

	const chat = chats.chats.find((chat) => chat.user.login === params?.login);

	return (
		<div className={cl.root}>
			<ChatInfo user={user} />
			<ChatMessages chat={chat} />
			<ChatInput recipientId={user._id} />
		</div>
	);
};
