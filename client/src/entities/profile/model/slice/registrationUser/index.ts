import { createAsyncThunk } from "@reduxjs/toolkit";

import $axios from "@/shared";

import type { TAuthForm } from "@/features/auth";
import type { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const registrationUser = createAsyncThunk(
	"profile/registrationUser",
	async (params: { user: TAuthForm; router: AppRouterInstance }) => {
		try {
			const { data } = await $axios.post<{ message: string }>(
				"/auth/registration",
				{ ...params.user }
			);

			return data;
		} catch (e) {
			localStorage.setItem("user", JSON.stringify(params.user));

			const err = e as AxiosError<{ message: string }>;
			throw err.response?.data.message;
		}
	}
);
