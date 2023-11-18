import $axios from "@/shared";

import { createAsyncThunk } from "@reduxjs/toolkit";

import type { TSettingsProfile } from "@/widgets/settings";
import type { AxiosError } from "axios";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { IProfile } from "../../types";

export const updateMyProfile = createAsyncThunk(
	"profile/updateProfile",
	async (params: { user: TSettingsProfile; router: AppRouterInstance }) => {
		try {
			const { data } = await $axios.post<IProfile>("/profile/update", {
				...params.user
			});
			return data;
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;

			throw err.response?.data.message;
		}
	}
);
