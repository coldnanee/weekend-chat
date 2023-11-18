import { configureStore } from "@reduxjs/toolkit";

import { profileSlice } from "@/entities/profile";

export const store = configureStore({
	reducer: {
		profile: profileSlice
	}
});

export type TAppDispatch = typeof store.dispatch;
export type TAppStore = ReturnType<typeof store.getState>;
