import { IProfile } from "../types";

import { createSlice } from "@reduxjs/toolkit";

import { fetchMyProfile } from "./fetchMyProfile";
import { loginUser } from "./loginUser";
import { updateMyProfile } from "./updateMyProfile";
import { registrationUser } from "./registrationUser";
import { logoutUser } from "./logoutUser";

class UserResponseHandlers {
	constructor() {}

	static loading(state: TUserState) {
		state.error = null;
		state.status = STATUSES.LOADING;
	}

	static resolved(state: TUserState) {
		state.status = STATUSES.RESOLVED;
		state.error = null;
	}

	static rejected(state: TUserState, message?: string) {
		state.status = STATUSES.ERROR;
		state.error = message || "";
		alert(message);
	}
}

const STATUSES = {
	LOADING: "loading",
	RESOLVED: "pending",
	ERROR: "error"
};

type TUserState = {
	profile: IProfile | null;
	status: null | string;
	error: null | string;
};

const initialState: TUserState = {
	profile: null,
	status: null,
	error: null
};

const slice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		removeProfileAvatarAction: (state) => {
			if (state.profile) {
				state.profile.avatar = "";
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMyProfile.pending, (state) => {
				UserResponseHandlers.loading(state);
			})
			.addCase(fetchMyProfile.fulfilled, (state, action) => {
				UserResponseHandlers.resolved(state);
				state.profile = action.payload;
			})
			.addCase(fetchMyProfile.rejected, (state, action) => {
				state.status = STATUSES.ERROR;
				state.error = "Fetch profile error";
				if (window) {
					location.href = "/login";
				}
			})

			.addCase(loginUser.pending, (state) => {
				UserResponseHandlers.loading(state);
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.profile = action.payload;
				UserResponseHandlers.resolved(state);

				action.meta.arg.router.replace("/");
			})
			.addCase(loginUser.rejected, (state, action) => {
				UserResponseHandlers.rejected(state, action.error.message);
			})

			.addCase(updateMyProfile.pending, (state) => {
				UserResponseHandlers.loading(state);
			})
			.addCase(updateMyProfile.fulfilled, (state, action) => {
				state.profile = action.payload;
				UserResponseHandlers.resolved(state);
			})
			.addCase(updateMyProfile.rejected, (state, action) => {
				UserResponseHandlers.rejected(state, action.error.message);
			})

			.addCase(registrationUser.pending, (state) => {
				UserResponseHandlers.loading(state);
			})
			.addCase(registrationUser.fulfilled, (state, action) => {
				UserResponseHandlers.resolved(state);
				action.meta.arg.router.replace("/login");
			})
			.addCase(registrationUser.rejected, (state, action) => {
				UserResponseHandlers.rejected(state, action.error.message);
				localStorage.setItem("user", JSON.stringify(action.meta.arg.user));
			})

			.addCase(logoutUser.pending, (state) => {
				UserResponseHandlers.loading(state);
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				UserResponseHandlers.resolved(state);
				state.profile = null;
				if (window) {
					location.href = "/";
				}
			})
			.addCase(logoutUser.rejected, (state) => {
				UserResponseHandlers.rejected(state);
			});
	}
});

export const { removeProfileAvatarAction } = slice.actions;

export const profileSlice = slice.reducer;
