import type { AxiosError } from "axios";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import { type TMessage, useMessagesStore } from "@/entities/message"; // eslint-disable-line boundaries/element-types
import $axios from "@/shared";
import type { TChat } from "../types";

type TChatsStore = {
	chats: TChat[];
	error: null | string;
	isLoading: boolean;
	fetchChats: (login: string) => void; // eslint-disable-line no-unused-vars
	deleteChat: (chatId: string) => void; // eslint-disable-line no-unused-vars
	newMessage: (message: TMessage) => void; // eslint-disable-line no-unused-vars
	newChat: (chat: TChat) => void; // eslint-disable-line no-unused-vars
	sendMessage: (message: TMessage) => void; // eslint-disable-line no-unused-vars
	deleteMessage: (chatId: string, messagesId: string[]) => void; // eslint-disable-line no-unused-vars
};

export const useChatsStore = create<TChatsStore>()(
	immer((set) => ({
		chats: [],
		error: null,
		isLoading: false,
		fetchChats: async (chat) => {
			useChatsStore.setState((state) => {
				state.error = null;
				state.isLoading = true;
			});
			try {
				const { data } = await $axios.get<{ chats: TChat[] }>("chats", {
					params: { chat }
				});

				if (data) {
					useChatsStore.setState((state) => {
						state.chats = data.chats;
						state.isLoading = false;
					});
				}
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				const message = err.response?.data.message || "fetch chats error";
				if (err.response?.status !== 401) {
					alert(message);
				}
				useChatsStore.setState((state) => {
					state.error = message;
				});
			}
		},
		deleteChat: (chatId) =>
			set((state) => {
				state.chats = state.chats.filter((chat) => chat && chat._id !== chatId);
			}),
		newMessage: (message) =>
			set((state) => {
				const chats = [...state.chats];
				const chat = chats.find((chat) => chat._id === message.chat);
				if (chat) {
					chat.messages.push(message);
					const chatIndex = chats.indexOf(chat);

					if (chatIndex > -1) {
						chats.splice(chatIndex, 1);
						chats.unshift(chat);

						state.chats = chats;
					}
				}
			}),
		newChat: (chat) =>
			set((state) => {
				state.chats = [chat, ...state.chats];
			}),
		sendMessage: (message) =>
			set((state) => {
				const chat = state.chats.find((chat) => chat._id === message.chat);
				chat?.messages.push(message);
			}),
		deleteMessage: (chatId, messagesId) =>
			set((state) => {
				const chat = state.chats.find((c) => c._id === chatId);

				if (chat) {
					chat.messages = chat.messages.filter(
						(m) => !messagesId.includes(m._id)
					);
					useMessagesStore.getState().clearSelectedMessages();
				}
			})
	}))
);
