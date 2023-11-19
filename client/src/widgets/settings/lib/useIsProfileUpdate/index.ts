import { useMemo } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import type { TSettingsForm } from "../..";

import { useFormContext } from "react-hook-form";

export const useIsProfileUpdate = (): { isUpdated: boolean } => {
	const { watch } = useFormContext<TSettingsForm>();
	const { profile } = useAppSelector((state) => state.profile);

	const watchingForm: TSettingsForm = {
		login: watch("login"),
		password: watch("password"),
		avatar: watch("avatar")
	};

	const isUpdated = useMemo(() => {
		if (!profile) {
			return false;
		}

		if (watchingForm.avatar === null) {
			return true;
		}

		const formValuesArray = Object.values(watchingForm);
		const hasEmptyValues = formValuesArray.some((value) => value === undefined);

		if (hasEmptyValues) return false;

		const { password, login, avatar } = watchingForm;

		const isPasswordChanged = password.length > 0;
		const isLoginChanged = login !== profile.login;
		const isAvatarChanged = avatar && avatar.length > 0;

		if (isPasswordChanged || isLoginChanged || isAvatarChanged) {
			return true;
		}

		return false;
	}, [watchingForm]);

	return { isUpdated };
};
