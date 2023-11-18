import $axios from "@/shared";

import type { TAuthForm } from "../..";
import type { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const registrationUser = async (
	user: TAuthForm,
	router: AppRouterInstance,
	setIsLoading: (l: boolean) => void
) => {
	try {
		setIsLoading(true);

		const { data } = await $axios.post<{ message: string }>(
			"/auth/registration",
			{},
			{ params: { ...user } }
		);

		data.message && router.push("/login");
	} catch (e) {
		const err = e as AxiosError<{ message: string }>;
		alert(err.response?.data.message);
	} finally {
		setIsLoading(false);
	}
};
