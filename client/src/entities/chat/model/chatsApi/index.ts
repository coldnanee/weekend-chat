import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { TChat } from "../types";

export const chatsApi = createApi({
	reducerPath: "chatsApi",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
	endpoints: (builder) => ({
		getChats: builder.query<{ chats: TChat[] }, string>({
			query: (chat) => `chats?chat=${chat}`
		})
	})
});

export const { useGetChatsQuery } = chatsApi;
