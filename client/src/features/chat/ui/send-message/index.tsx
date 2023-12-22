"use client";

import debounce from "lodash.debounce";
import {
	KeyboardEvent,
	type ChangeEvent,
	useRef,
	useEffect,
	useCallback
} from "react";
import type { MutableRefObject } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { useMessagesStore } from "@/entities/message";
import { useSocketContext } from "@/shared";
import { useMessageStore } from "../../model";
import cl from "./index.module.scss";

export const ChatInput = ({
	recipientId,
	messagesContainer
}: {
	recipientId?: string;
	messagesContainer: MutableRefObject<HTMLElement | null>;
}) => {
	const isFirstTyping = useRef<boolean>(true);

	const { socket } = useSocketContext();

	const { message, editMessage, changeMessageBody, messageBody } =
		useMessageStore();
	const { clearSelectedMessages } = useMessagesStore();

	const scrollBottom = () => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	};

	//prettier-ignore

	const changeMessage = useCallback( // eslint-disable-line
		debounce(() => {
			socket?.emit("stop-typing", recipientId);
		}, 500),
		[]
	);

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		messageBody
			? changeMessageBody({ ...messageBody, text: e.target.value })
			: editMessage(e.target.value);
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
			editMessage("");
			socket?.emit("stop-typing", recipientId);
		}
	};

	const updateMessage = () => {
		if (socket && messageBody?.text) {
			socket.emit("edit-message", {
				messageId: messageBody._id,
				updateText: messageBody.text
			});
			changeMessageBody(null);
			clearSelectedMessages();
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
	}, []); //eslint-disable-line

	return (
		<section className={cl.root}>
			<div className={cl.root_wrapper}>
				<input
					onClick={scrollBottom}
					onChange={changeInput}
					onKeyDown={handlePressEnter}
					className={cl.root__wrapper__input}
					placeholder="Write a message..."
					value={messageBody ? messageBody.text : message}
					type="text"
				/>
				{(message || messageBody?.text) && (
					<HiOutlinePaperAirplane
						size="25px"
						color="#5E636C"
						className={cl.root__wrapper__input__send}
						onClick={messageBody ? updateMessage : sendMessage}
					/>
				)}
			</div>
		</section>
	);
};
