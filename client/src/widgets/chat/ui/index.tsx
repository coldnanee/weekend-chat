"use client";

import { ChatInput } from "./input";
import { ChatMessages } from "./messages";

import cl from "./index.module.scss";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchChatByLogin } from "../model/fetchChatByLogin";

export const Chat = () => {
	const params = useParams<{ login: string }>();

	const { data } = useQuery({
		queryFn: () => fetchChatByLogin(params?.login || ""),
		queryKey: ["active-chat"]
	});

	if (!data) {
		return <></>;
	}

	return (
		<div className={cl.root}>
			<ChatMessages />
			<ChatInput recipientId={data.recipientId} />
		</div>
	);
};
