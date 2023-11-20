import $axios from "@/shared";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk("user/logout", async () => {
	await $axios.post("/token/logout");
});
