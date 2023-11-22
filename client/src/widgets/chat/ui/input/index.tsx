"use client";

import { KeyboardEvent, useState, type ChangeEvent } from "react";
import cl from "./index.module.scss";

import { HiOutlinePaperAirplane } from "react-icons/hi2";

import { useSocket } from "@/shared";
import { useAppSelector } from "@/app/store/hooks/useAppSelector";

export const ChatInput = () => {
	const { profile } = useAppSelector((state) => state.profile);

	const [message, setMessage] = useState<string>("");

	const { socket } = useSocket();

	const sendMessage = () => {
		socket.emit("send-message", {
			recipientId: "655cdf5bb3ae82a16a820de1",
			message
		});
		setMessage("");
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
