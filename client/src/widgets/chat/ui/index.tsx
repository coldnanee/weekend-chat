"use client";

import { useParams } from "next/navigation";
import { useRef, useMemo } from "react";
import { ChatInfo, ChatInput, ChatMessagesPanel } from "@/features/chat";
import { useMessageStore } from "@/features/chat";
import { useChatsStore } from "@/entities/chat";
import { ChatMessages, useMessagesStore } from "@/entities/message";
import { useGetUserByLogin } from "../model";
import cl from "./index.module.scss";
import { ChatLoader } from "./loader";
import { UserNotFound } from "./user-not-found";

export const Chat = () => {
	const { selectedMessages } = useMessagesStore();
	const { setMenuShow } = useMessageStore();

	const params = useParams<{ login: string }>();

	const messagesContainer = useRef<HTMLElement | null>(null);

	const { chats, isLoading: isChatsLoading } = useChatsStore();

	const isTouchDevice = useMemo(() => {
		return "ontouchstart" in window || navigator.maxTouchPoints;
	}, []);

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

	const closeMenu = () => {
		if (!isTouchDevice) {
			return;
		}

		setMenuShow(false);
	};

	return (
		<div
			className={cl.root}
			onClick={closeMenu}>
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
