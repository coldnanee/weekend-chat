import cl from "./index.module.scss";

import type { TMessage } from "@/entities/message";
import type { TUser } from "@/entities/user";

import { PiChecksBold } from "react-icons/pi";
import { PiCheckBold } from "react-icons/pi";

import { DefaultAvatar } from "@/shared";

import { getMessageDate } from "../lib/getMessageDate";

export const ChatMessage = ({
	message,
	user
}: {
	message: TMessage;
	user: TUser;
}) => {
	const isMyMessage = user._id !== message.user;

	return (
		<li className={isMyMessage ? [cl.root, cl.root_my].join(" ") : cl.root}>
			<DefaultAvatar
				width={30}
				height={30}
				alt={user.login}
				className={cl.root__avatar}
				src={user.avatar}
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
