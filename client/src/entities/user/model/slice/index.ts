import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TOnlineUsersState = {
	users: string[];
};

const initialState: TOnlineUsersState = {
	users: []
};

const slice = createSlice({
	name: "online-users",
	initialState,
	reducers: {
		updateOnlineUsersAction: (state, action: PayloadAction<string[]>) => {
			state.users = action.payload;
		}
	}
});

export const { updateOnlineUsersAction } = slice.actions;

export const onlineUsersSlice = slice.reducer;
