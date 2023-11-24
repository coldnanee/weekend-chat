"use client";

import { ChatInput } from "./input";
import { ChatMessages } from "@/entities/message";
import { UserNotFound } from "./user-not-found";

import cl from "./index.module.scss";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchChatByLogin } from "../model/fetchChatByLogin";
import { ChatInfo } from "./chat-info";
import { StartChat } from "./start-chat";

export const Chat = () => {
	const params = useParams<{ login: string }>();

	const { data, isError } = useQuery({
		queryFn: () => fetchChatByLogin(params?.login || ""),
		queryKey: ["active-chat"]
	});

	if (!data) {
		return <></>;
	}

	if (isError) {
		return <UserNotFound />;
	}

	if (!data.chat) {
		return <StartChat name="login" />;
	}

	return (
		<div className={cl.root}>
			<ChatInfo
				user={data.chat?.user}
				chat={data.chat}
			/>
			<ChatMessages chat={data.chat} />
			<ChatInput recipientId={data.recipientId} />
		</div>
	);
};
