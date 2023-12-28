"use client";

import { type MouseEvent, useEffect, useRef } from "react";
import { BsFillPinFill as PinImage } from "react-icons/bs";
import { BsPin as UnpinImage } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useBlacklistStore } from "@/features/black-list"; // eslint-disable-line boundaries/element-types
import type { TChat } from "@/entities/chat";
import { useProfileStore } from "@/entities/profile";
import type { TUser } from "@/entities/user";
import { useSocketStore, DefaultAvatar } from "@/shared";
import { useMessageStore } from "../../model";
import { TChatOptionItem } from "../../types";

import { ChatMenuItem } from "../menu-item";

import cl from "./index.module.scss";

export const ChatMenu = ({ chat, user }: { chat?: TChat; user?: TUser }) => {
	const { socketEvent } = useSocketStore();
	const { isMenuShow, setMenuShow } = useMessageStore();
	const { profile } = useProfileStore();

	const isTouchDevice = useRef<number | boolean>(false);

	const isUserBlock = chat?.user && profile?.blackList.includes(chat.user._id);

	const rootClasses = [cl.root__body];

	const { blockUser, unblockUser } = useBlacklistStore();

	if (isMenuShow) {
		rootClasses.push(cl.root__body_visible);
	}

	useEffect(() => {
		isTouchDevice.current =
			"ontouchstart" in window || navigator.maxTouchPoints;
	}, []);

	const deleteChat = () => {
		if (chat) socketEvent("delete-chat", { chatId: chat._id });
	};

	const showConfirmWindow = () => {
		const result = confirm("Do you want to delete the chat?");

		if (result) deleteChat();
	};

	const pinChat = () => {
		socketEvent("pin-chat", { chatId: chat?._id });
	};

	const unpinChat = () => {
		socketEvent("unpin-chat", { chatId: chat?._id });
	};

	const chatOptionsArr: TChatOptionItem[] = [
		{
			label: chat?.isPinned ? "Unpin chat" : "Pin chat",
			Picture: chat?.isPinned ? PinImage : UnpinImage,
			cb: chat?.isPinned ? unpinChat : pinChat
		},
		{
			label: "Delete chat",
			Picture: RiDeleteBin6Line,
			cb: showConfirmWindow
		},
		{
			label: isUserBlock ? "Unblock user" : "Block user",
			Picture: isUserBlock ? FiMinusCircle : MdBlock,
			cb: isUserBlock
				? () => unblockUser(chat.user._id)
				: () => {
						if (chat?.user) blockUser(chat?.user);
				} // prettier-ignore
		}
	];

	const toggleShowMenu = (e: MouseEvent<HTMLButtonElement>) => {
		if (!isTouchDevice.current) {
			return;
		}
		e.stopPropagation();
		setMenuShow(!isMenuShow);
	};

	return (
		<div className={cl.root}>
			<button
				className={cl.root__label}
				onClick={toggleShowMenu}>
				<DefaultAvatar
					src={user?.avatar}
					width={30}
					height={30}
					alt={user?.login || ""}
				/>
			</button>
			{chat?.messages && chat?.messages.length > 0 && (
				<ul className={rootClasses.join(" ")}>
					{chatOptionsArr.map((i) => (
						<ChatMenuItem
							item={i}
							key={i.label}
						/>
					))}
				</ul>
			)}
		</div>
	);
};
