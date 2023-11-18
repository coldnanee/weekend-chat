import { useMemo } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";
import type { TAuthForm } from "@/features/auth";

import { useFormContext } from "react-hook-form";

export const useIsProfileUpdate = (): { isUpdated: boolean } => {
	const { watch } = useFormContext<TAuthForm>();

	const watchingForm: { [key: string]: string } & TAuthForm = {
		login: watch("login"),
		password: watch("password")
	};

	const { profile } = useAppSelector((state) => state.profile);

	const isUpdated = useMemo(() => {
		if (!profile) {
			return false;
		}

		for (let key in watchingForm) {
			if (!watchingForm[key]) {
				return false;
			}

			if (
				watchingForm.password.length > 0 ||
				watchingForm.login !== profile.login
			) {
				return true;
			}
		}

		return false;
	}, [watchingForm]);

	return { isUpdated };
};
