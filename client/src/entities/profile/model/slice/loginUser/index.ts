import $axios from "@/shared";

import type { TAuthForm } from "@/features/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IProfile } from "../../types";
import type { AxiosError } from "axios";

export const loginUser = createAsyncThunk(
	"profile/loginUser",
	async (params: { user: TAuthForm; router: AppRouterInstance }) => {
		try {
			const { data } = await $axios.post<IProfile>("/auth/login", {
				...params.user
			});

			return data;
		} catch (e) {
			localStorage.setItem("user", JSON.stringify(params.user));

			const err = e as AxiosError<{ message: string }>;
			const customErr = {
				message: err.response?.data.message
			};

			throw customErr;
		}
	}
);
