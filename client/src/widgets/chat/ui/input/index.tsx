"use client";

import { KeyboardEvent, useState, type ChangeEvent } from "react";
import cl from "./index.module.scss";

import { HiOutlinePaperAirplane } from "react-icons/hi2";

import { useSocketContext } from "@/shared";

export const ChatInput = ({ recipientId }: { recipientId?: string }) => {
	const { socket } = useSocketContext();

	const [message, setMessage] = useState<string>("");

	const sendMessage = () => {
		if (socket && message) {
			socket.emit("send-message", {
				recipientId,
				message
			});
			setMessage("");
		}
	};

	const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		sendMessage();
	};

	return (
		<section className={cl.root}>
			<input
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setMessage(e.target.value)
				}
				onKeyDown={handlePressEnter}
				className={cl.root__input}
				placeholder="Write a message..."
				value={message}
			/>
			<HiOutlinePaperAirplane
				size="25px"
				color="#5E636C"
				className={cl.root__input__send}
				onClick={sendMessage}
			/>
		</section>
	);
};
