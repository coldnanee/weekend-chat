import { configureStore } from "@reduxjs/toolkit";

import { profileSlice } from "@/entities/profile";
import { onlineUsersSlice } from "@/entities/user";

import { chatsApi } from "@/entities/chat";

export const store = configureStore({
	reducer: {
		profile: profileSlice,
		online: onlineUsersSlice,
		[chatsApi.reducerPath]: chatsApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(chatsApi.middleware)
});

export type TAppDispatch = typeof store.dispatch;
export type TAppStore = ReturnType<typeof store.getState>;
