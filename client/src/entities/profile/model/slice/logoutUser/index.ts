import $axios from "@/shared";

import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = createAsyncThunk(
	"user/logout",
	async (params: { router: AppRouterInstance }) => {
		await $axios.post("/token/logout");
	}
);
