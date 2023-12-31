"use client";

import { useProfileStore } from "@/entities/profile"; // eslint-disable-line boundaries/element-types
import type { TUser } from "@/entities/user"; // eslint-disable-line boundaries/element-types
import { useI18nStore } from "@/shared";

import { DefaultAvatar } from "@/shared";

import { getFormattedIsoDate } from "@/shared";
import { useMessagesStore } from "../../model";
import type { TMessage } from "../../types";
import cl from "./index.module.scss";

export const ChatMessage = ({
	message,
	user
}: {
	message: TMessage;
	user: TUser;
}) => {
	const { translate } = useI18nStore();
	const { profile } = useProfileStore();

	const { selectedMessages, toggleMessage } = useMessagesStore();

	const isMyMessage = user._id !== message.user;

	const rootClasses = [cl.root];

	const { label, isTranslate, count } = getFormattedIsoDate(message.date);

	const messageDate = isTranslate
		? `${count || ""}${translate("other", label)}`
		: label;

	if (isMyMessage) {
		rootClasses.push(cl.root_my);
	}

	if (selectedMessages.includes(message._id)) {
		rootClasses.push(cl.root_active);
	}

	return (
		<li
			onClick={() => toggleMessage(message._id)}
			className={rootClasses.join(" ")}>
			<DefaultAvatar
				width={30}
				height={30}
				alt={user.login}
				className={cl.root__avatar}
				src={isMyMessage ? profile?.avatar : user.avatar}
			/>
			<div
				className={
					isMyMessage
						? [cl.root__message, cl.root__message_my].join(" ")
						: cl.root__message
				}>
				<p className={cl.root__message__text}>{message.text}</p>
				<div className={cl.root__message__info}>
					<p className={cl.root__message__info__date}>{messageDate}</p>
				</div>
			</div>
		</li>
	);
};
