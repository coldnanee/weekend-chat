"use client";

import Image from "next/image";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useProfileStore } from "@/entities/profile"; // eslint-disable-line boundaries/element-types
import { useOnlineUsersStore } from "@/entities/user"; // eslint-disable-line boundaries/element-types
import { useI18nStore } from "@/shared";

import { DefaultAvatar } from "@/shared";
import { getFormattedIsoDate } from "@/shared";
import { getSlicedMessage } from "../../lib";
import type { TChat } from "../../types";
import cl from "./index.module.scss";
import PinnedImage from "./pinned.svg";

import { useSocketStore } from "@/shared"; // eslint-disable-line import/order

export const ChatItem = ({ chat }: { chat: TChat }) => {
	const { socket } = useSocketStore();
	const { translate } = useI18nStore();
	const [isTyping, setIsTyping] = useState<boolean>(false);

	const params = useParams<{ login: string }>();

	const { profile } = useProfileStore();

	const users = useOnlineUsersStore((state) => state.users);

	const isOnline = users.includes(chat.user._id);

	const chatBody = chat.messages[chat.messages.length - 1];

	const rootClasses = [cl.root, cl.root_active];

	const isActive = params?.login === chat.user.login;

	const { label, isTranslate, count } = getFormattedIsoDate(chatBody.date);

	const messageDate = isTranslate
		? `${count || ""}${translate("other", label)}`
		: label;

	socket.on("start-typing-client", (data: { userId: string }) => {
		console.log(
			profile?.blackList,
			data.userId,
			profile?.blackList.includes(data.userId)
		);
		if (
			chat.user._id === data.userId &&
			!profile?.blackList.includes(data.userId)
		) {
			setIsTyping(true);
		}
	});

	socket.on("stop-typing-client", (data: { userId: string }) => {
		if (chat.user._id === data.userId) {
			setIsTyping(false);
		}
	});

	if (chat.messages.length === 0) {
		return <></>;
	}

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
								translate("other", "aside_chats_typing")
							) : chatBody.user === profile?._id ? (
								<>
									<span>{translate("other", "aside_chats_you")}</span>
									<p>{getSlicedMessage(chatBody.text, true)}</p>
								</>
							) : (
								<p>{getSlicedMessage(chatBody.text, false)}</p>
							)}
						</div>
					</div>
				</div>
				<div className={cl.root__info}>
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
					</div>
				</div>
			</Link>
		</li>
	);
};
