import type { TChat } from "@/entities/chat";

import cl from "./index.module.scss";

import { DefaultAvatar } from "@/shared";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { useCountUnreadMessages } from "../../lib/useCountUnreadMessages";
import { getMessageDate } from "../../lib/getMessageDate";

import Image from "next/image";

import PinnedImage from "../../images/pinned.svg";
import Link from "next/link";

export const ChatBySearchChat = ({ chat }: { chat: TChat }) => {
	const { profile } = useAppSelector((state) => state.profile);

	const { text, date, user } = chat.messages[chat.messages.length - 1];

	const rootClasses = [cl.root, cl.root_active];

	const { unreadMessagesCounter } = useCountUnreadMessages(
		profile?._id || "",
		chat.messages
	);

	const messageDate = getMessageDate(date);

	return (
		<li>
			<Link
				className={unreadMessagesCounter > 0 ? rootClasses.join(" ") : cl.root}
				href={`chat/${chat.user.login}`}>
				<div className={cl.root__body}>
					<DefaultAvatar
						width={45}
						height={45}
						alt={chat.user.login}
						src={chat.user.avatar}
						className={cl.root__avatar}
					/>
					<div className={cl.root__body__chat}>
						<h4 className={cl.root__body__chat__name}>{chat.user.login}</h4>
						<p className={cl.root__body__chat__message}>
							{user === profile?._id && <span>You: </span>}
							{text}
						</p>
					</div>
				</div>
				<div className={cl.root__info}>
					{chat.isPinned && unreadMessagesCounter > 0 && (
						<div className={cl.root__info__counter}>
							<p>{unreadMessagesCounter}</p>
						</div>
					)}
					<div className={cl.root__info__body}>
						<p className={cl.root__info__date}>{messageDate}</p>
						{chat.isPinned && (
							<Image
								src={PinnedImage}
								alt="pinned"
								width={15}
								height={15}
							/>
						)}
						{!chat.isPinned && unreadMessagesCounter > 0 && (
							<div className={cl.root__info__counter}>
								<p>{unreadMessagesCounter}</p>
							</div>
						)}
					</div>
				</div>
			</Link>
		</li>
	);
};
