import { create } from "zustand";

import $axios from "@/shared";

import { immer } from "zustand/middleware/immer";

import type { TChat, TChatRes } from "./types";
import type { AxiosError } from "axios";
import { useProfileStore } from "@/entities/profile";
import { type TMessage, useMessagesStore } from "@/entities/message";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type TChatsStore = {
	chats: TChat[];
	error: null | string;
	isLoading: boolean;
	readMessagesLocal: (chatId: string) => void;
	fetchChats: (login: string) => void;
	deleteChat: (router: AppRouterInstance, path: string, chatId: string) => void;
	entryChat: (chatId: string, userId: string) => void;
	newMessage: (message: TMessage) => void;
	newChat: (chat: TChatRes) => void;
	sendMessage: (message: TMessage) => void;
	deleteMessage: (chatId: string, messagesId: string[]) => void;
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
				const { data } = await $axios.get<{ chats: TChatRes[] }>("chats", {
					params: { chat }
				});

				if (data) {
					useChatsStore.setState((state) => {
						state.chats = data.chats.map((chat) => {
							const unread = chat.messages.filter(
								(m) =>
									useProfileStore.getState().profile?._id !== m.user &&
									!m.isRead
							).length;
							return { ...chat, unread };
						});
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
		readMessagesLocal: (chatId) =>
			set((state) => {
				state.chats = state.chats.map((chat) => {
					if (chat._id === chatId) {
						return { ...chat, unread: 0 };
					}
					return chat;
				});
			}),
		deleteChat: (router, path, chatId) =>
			set((state) => {
				state.chats = state.chats.filter((chat) => chat && chat._id !== chatId);
				if (path.includes("chat")) {
					router.replace("/");
				}
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
				const chats = [...state.chats];
				const chat = chats.find((chat) => chat._id === message.chat);
				if (chat) {
					if (!message.isRead) {
						chat.unread = chat.unread + 1;
					}
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
				const unread = chat.messages.filter(
					(msg) => msg.user !== useProfileStore.getState().profile?._id
				).length;

				state.chats = [{ ...chat, unread }, ...state.chats];
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
