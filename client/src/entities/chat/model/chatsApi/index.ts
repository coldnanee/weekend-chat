import { createApi } from "@reduxjs/toolkit/query/react";

import { fetchChatsByLogin } from "../fetchChats";

import type { TChat } from "../types";

export const chatsApi = createApi({
	reducerPath: "chatsApi",
	baseQuery: fetchChatsByLogin,
	endpoints: (builder) => ({
		getChats: builder.query<{ chats: TChat[] }, string>({
			query: (chat) => chat
		})
	})
});

export const { useGetChatsQuery } = chatsApi;
