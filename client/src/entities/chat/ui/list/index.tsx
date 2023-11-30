"use client";

import cl from "./index.module.scss";

import { Chat } from "..";

import type { TChat } from "../..";

import { ChatSkeleton } from "../..";

export const ChatList = ({
	chats,
	isLoading,
	login
}: {
	chats?: TChat[];
	isLoading: boolean;
	login: string;
}) => {
	if (!chats) {
		return <></>;
	}

	return (
		<section className={cl.root}>
			{isLoading && login && chats.length > 0 && (
				<h2 className={cl.root__title}>Chats:</h2>
			)}
			<ul className={cl.root__body}>
				{isLoading
					? (chats || []).map((_, index) => <ChatSkeleton key={index} />)
					: (chats || []).map((chat) => (
							<Chat
								chat={chat}
								key={chat._id}
							/>
					  ))}
			</ul>
		</section>
	);
};
