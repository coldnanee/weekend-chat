import $axios from "@/shared";
import { IProfile } from "../../types";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMyProfile = createAsyncThunk(
	"profile/fetchMyProfile",
	async () => {
		const { data } = await $axios.post<IProfile>("/token/refresh");
		return data;
	}
);
