"use client";

import cl from "./index.module.scss";

import { Chat } from "..";

import type { TChat } from "../..";

export const ChatList = ({
	chats,
	login
}: {
	chats?: TChat[];
	login: string;
}) => {
	if (!chats) {
		return <></>;
	}

	return (
		<section className={cl.root}>
			{login && chats.length > 0 && <h2 className={cl.root__title}>Chats:</h2>}
			<ul className={cl.root__body}>
				{(chats || []).map((chat) => (
					<Chat
						chat={chat}
						key={chat._id}
					/>
				))}
			</ul>
		</section>
	);
};
