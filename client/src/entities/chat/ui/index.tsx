import type { TChat } from "@/entities/chat";

import cl from "./index.module.scss";

import { DefaultAvatar } from "@/shared";

import { getMessageDate } from "../lib/getMessageDate";
import { useParams } from "next/navigation";
import { getSlicedMessage } from "../lib/getSlicedMessage";

import { useProfileStore } from "@/entities/profile";

import Image from "next/image";

import PinnedImage from "../images/pinned.svg";
import Link from "next/link";
import { useSocketContext } from "@/widgets/socket";
import { useState, useRef } from "react";

import { useOnlineUsersStore } from "@/entities/user";

export const Chat = ({ chat }: { chat: TChat }) => {
	const { socket } = useSocketContext();

	const [isTyping, setIsTyping] = useState<boolean>(false);

	const params = useParams<{ login: string }>();

	const { profile } = useProfileStore();

	const users = useOnlineUsersStore((state) => state.users);

	const isOnline = users.includes(chat.user._id);

	const { text, date, user } = chat.messages[chat.messages.length - 1];

	const rootClasses = [cl.root, cl.root_active];

	const isActive = params?.login === chat.user.login;

	const messageDate = getMessageDate(date);

	socket?.on("start-typing-client", (user: string) => {
		if (chat.user._id === user) {
			setIsTyping(true);
		}
	});

	socket?.on("stop-typing-client", (user: string) => {
		if (chat.user._id === user) {
			setIsTyping(false);
		}
	});

	return (
		<li>
			<Link
				className={isActive ? rootClasses.join(" ") : cl.root}
				href={`/chat/${chat.user.login}`}>
				<div className={cl.root__body}>
					<div className={cl.root__avatar}>
						<DefaultAvatar
							width={45}
							height={45}
							alt={chat.user.login}
							src={chat.user.avatar}
						/>
						{isOnline && <span className={cl.root__status} />}
					</div>
					<div className={cl.root__body__chat}>
						<h4 className={cl.root__body__chat__name}>{chat.user.login}</h4>
						<div className={cl.root__body__chat__message}>
							{isTyping ? (
								"typing..."
							) : user === profile?._id ? (
								<>
									<span>You: </span>
									<p>{getSlicedMessage(text, true)}</p>
								</>
							) : (
								<p>{getSlicedMessage(text, false)}</p>
							)}
						</div>
					</div>
				</div>
				<div className={cl.root__info}>
					{chat.isPinned && chat.unread > 0 && (
						<div className={cl.root__info__counter}>
							<p>{chat.unread}</p>
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
						{!chat.isPinned && chat.unread > 0 && (
							<div className={cl.root__info__counter}>
								<p>{chat.unread}</p>
							</div>
						)}
					</div>
				</div>
			</Link>
		</li>
	);
};
