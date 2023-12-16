"use client";

import {
	KeyboardEvent,
	useState,
	type ChangeEvent,
	useRef,
	useEffect,
	useCallback
} from "react";
import cl from "./index.module.scss";

import { HiOutlinePaperAirplane } from "react-icons/hi2";

import debounce from "lodash.debounce";

import { useSocketContext } from "@/widgets/socket";

import type { MutableRefObject } from "react";

export const ChatInput = ({
	recipientId,
	messagesContainer
}: {
	recipientId?: string;
	messagesContainer: MutableRefObject<HTMLElement | null>;
}) => {
	const isFirstTyping = useRef<boolean>(true);

	const { socket } = useSocketContext();

	const [message, setMessage] = useState<string>("");

	const scrollBottom = () => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	};

	const changeMessage = useCallback(
		debounce(() => {
			socket?.emit("stop-typing", recipientId);
		}, 700),
		[]
	);

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
		socket?.emit("start-typing", recipientId);
		changeMessage();
	};

	const sendMessage = () => {
		if (socket && message) {
			socket.emit("send-message", {
				recipientId,
				message
			});
			isFirstTyping.current = true;
			setMessage("");
			socket?.emit("stop-typing", recipientId);
		}
	};

	const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	useEffect(() => {
		return () => {
			socket?.emit("stop-typing", recipientId);
		};
	}, []);

	return (
		<section className={cl.root}>
			<div className={cl.root_wrapper}>
				<input
					onClick={scrollBottom}
					onChange={changeInput}
					onKeyDown={handlePressEnter}
					className={cl.root__wrapper__input}
					placeholder="Write a message..."
					value={message}
				/>
				{message && (
					<HiOutlinePaperAirplane
						size="25px"
						color="#5E636C"
						className={cl.root__wrapper__input__send}
						onClick={sendMessage}
					/>
				)}
			</div>
		</section>
	);
};
