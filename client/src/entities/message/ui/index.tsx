import cl from "./index.module.scss";

import type { TMessage } from "@/entities/message";
import type { TUser } from "@/entities/user";

import { PiChecksBold } from "react-icons/pi";
import { PiCheckBold } from "react-icons/pi";

import { DefaultAvatar } from "@/shared";

export const ChatMessage = ({
	message,
	user
}: {
	message: TMessage;
	user: TUser;
}) => {
	const rootCl = [cl.root__message, cl.root__message_my];

	return (
		<div className={cl.root}>
			<DefaultAvatar
				width={30}
				height={30}
				alt={user.login}
				className={cl.root__avatar}
				src={user.avatar}
			/>
			<div
				className={
					user._id !== message.user ? rootCl.join(" ") : cl.root__message
				}>
				<p className={cl.root__message__text}>{message.text}</p>
				<div className={cl.root__message__info}>
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
					<p className={cl.root__message__date}>10:57</p>
				</div>
			</div>
		</div>
	);
};
