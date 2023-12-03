import { create } from "zustand";

import $axios from "@/shared";

import { immer } from "zustand/middleware/immer";

import type { TChat } from "..";
import type { AxiosError } from "axios";

import type { TMessage } from "@/entities/message";

type TChatsStore = {
	chats: TChat[];
	error: null | string;
	isLoading: boolean;
	updateChats: (chats: TChat[]) => void;
	fetchChats: (login: string) => Promise<void>;
	deleteChat: (chatId: string) => void;
	entryChat: (chatId: string, userId: string) => void;
	newMessage: (message: TMessage) => void;
	newChat: (chat: TChat) => void;
	sendMessage: (message: TMessage) => void;
};

export const useChatsStore = create<TChatsStore>()(
	immer((set) => ({
		chats: [],
		error: null,
		isLoading: false,
		updateChats: (chats) =>
			set((state) => {
				state.chats = chats;
			}),
		fetchChats: async (chat) =>
			set((state) => {
				state.error = null;
				state.isLoading = true;
				$axios
					.get<{ chats: TChat[] }>("chats", {
						params: { chat }
					})
					.then(({ data }) => {
						useChatsStore.setState((state) => {
							state.chats = data.chats;
						});
					})
					.catch((e) => {
						const err = e as AxiosError<{ message: string }>;
						const message = err.response?.data.message || "fetch chats error";
						alert(message);
						useChatsStore.setState((state) => {
							state.error = message;
						});
					})
					.finally(() => {
						useChatsStore.setState((state) => {
							state.isLoading = false;
						});
					});
			}),
		deleteChat: (chatId) =>
			set((state) => {
				state.chats = state.chats.filter((chat) => chat._id !== chatId);
				if (window) location.href = "/";
			}),
		entryChat: (chatId, userId) =>
			set((state) => {
				state.chats = state.chats.map((chat) => {
					if (chat._id === chatId) {
						const readMessages = chat.messages.map((message) => {
							if (message.user !== userId && !message.isRead) {
								return { ...message, isRead: true };
							}
							return message;
						});

						return { ...chat, messages: readMessages };
					}

					return chat;
				});
			}),
		newMessage: (message) =>
			set((state) => {
				const chat = state.chats.find((chat) => chat._id === message.chat);
				chat?.messages.push(message);
			}),
		newChat: (chat) =>
			set((state) => {
				const prevChats = state.chats.slice(0, 4);
				state.chats = [chat, ...prevChats];
			}),
		sendMessage: (message) =>
			set((state) => {
				const chat = state.chats.find((chat) => chat._id === message.chat);
				chat?.messages.push(message);
			})
	}))
);
