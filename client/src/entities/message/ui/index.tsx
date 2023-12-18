import cl from "./index.module.scss";

import type { TMessage } from "@/entities/message";
import type { TUser } from "@/entities/user";

import { PiChecksBold } from "react-icons/pi";
import { PiCheckBold } from "react-icons/pi";

import { DefaultAvatar } from "@/shared";

import { getMessageDate } from "../lib/getMessageDate";

import { useMessagesStore } from "@/entities/message";
import { useProfileStore } from "@/entities/profile";

export const ChatMessage = ({
	message,
	user
}: {
	message: TMessage;
	user: TUser;
}) => {
	const { profile } = useProfileStore();

	const { selectedMessages, toggleMessage } = useMessagesStore();

	const isMyMessage = user._id !== message.user;

	const rootClasses = [cl.root];

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
					{user._id !== message.user && (
						<>
							{message.isRead ? (
								<PiChecksBold
									color="#fff"
									size="16px"
								/>
							) : (
								<PiCheckBold
									color="#fff"
									size="16px"
								/>
							)}
						</>
					)}
					<p className={cl.root__message__date}>
						{getMessageDate(message.date)}
					</p>
				</div>
			</div>
		</li>
	);
};
