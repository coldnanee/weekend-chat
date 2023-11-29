"use client";

import {
	KeyboardEvent,
	useState,
	type ChangeEvent,
	useRef,
	useCallback,
	useEffect
} from "react";
import cl from "./index.module.scss";

import { HiOutlinePaperAirplane } from "react-icons/hi2";

import { useSocketContext } from "@/widgets/socket";

export const ChatInput = ({ recipientId }: { recipientId?: string }) => {
	const isFirstTyping = useRef<boolean>(true);

	const { socket } = useSocketContext();

	const [message, setMessage] = useState<string>("");

	const changeMessage = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			if (value.length === 1 && isFirstTyping.current) {
				isFirstTyping.current = false;
				socket?.emit("start-typing", recipientId);
			}
			if (!value) {
				isFirstTyping.current = true;
				socket?.emit("stop-typing", recipientId);
			}
			setMessage(value);
		},
		[socket]
	);

	const sendMessage = useCallback(() => {
		if (socket && message) {
			socket.emit("send-message", {
				recipientId,
				message
			});
			setMessage("");
		}
	}, [socket, message, recipientId]);

	const handlePressEnter = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				sendMessage();
			}
		},
		[sendMessage]
	);

	useEffect(() => {
		return () => {
			socket?.emit("stop-typing", recipientId);
		};
	}, []);

	return (
		<section className={cl.root}>
			<input
				onChange={changeMessage}
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
