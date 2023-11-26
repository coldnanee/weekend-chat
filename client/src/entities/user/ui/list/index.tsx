"use client";

import cl from "./index.module.scss";

import { ChatUser } from "..";

import { useChatUsersQuery } from "../../lib/useChatUsersQuery";

export const ChatUsers = ({ login }: { login: string }) => {
	const { data, isLoading } = useChatUsersQuery(login);

	if (!data) {
		return <></>;
	}

	if (isLoading) {
		return <>loading</>;
	}

	return (
		<section className={cl.root}>
			<h2 className={cl.root__title}>Users:</h2>
			<ul className={cl.root__body}>
				{data.map((user) => (
					<ChatUser
						key={user._id}
						user={user}
					/>
				))}
			</ul>
		</section>
	);
};
