"use client";

import { type MouseEvent, useMemo } from "react";

import { BsThreeDots } from "react-icons/bs";
import { BsFillPinFill as PinImage } from "react-icons/bs";
import { BsPin as UnpinImage } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { TChat } from "@/entities/chat";
import { useSocketContext } from "@/shared";
import { useMessageStore } from "../../model";
import { TChatOptionItem } from "../../types";

import { ChatMenuItem } from "../menu-item";

import cl from "./index.module.scss";

export const ChatMenu = ({ chat }: { chat?: TChat }) => {
	const { socket } = useSocketContext();
	const { isMenuShow, setMenuShow } = useMessageStore();

	const rootClasses = [cl.root__body];

	if (isMenuShow) {
		rootClasses.push(cl.root__body_visible);
	}
	const isTouchDevice = useMemo(() => {
		return "ontouchstart" in window || navigator.maxTouchPoints;
	}, []);

	const deleteChat = () => {
		if (chat) socket?.emit("delete-chat", chat._id);
	};

	const showConfirmWindow = () => {
		const result = confirm("Do you want to delete the chat?");

		if (result) deleteChat();
	};

	const pinChat = () => {};

	const unpinChat = () => {};

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
		}
	];

	const toggleShowMenu = (e: MouseEvent<HTMLButtonElement>) => {
		if (!isTouchDevice) {
			return;
		}
		e.stopPropagation();
		setMenuShow(!isMenuShow);
	};

	return (
		<div className={cl.root}>
			<button className={cl.root__label}>
				<BsThreeDots
					size="25px"
					color="#6C6F75"
					onClick={toggleShowMenu}
				/>
			</button>
			<ul className={rootClasses.join(" ")}>
				{chatOptionsArr.map((i) => (
					<ChatMenuItem
						item={i}
						key={i.label}
					/>
				))}
			</ul>
		</div>
	);
};
