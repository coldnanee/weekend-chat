import { useMemo } from "react";

import { useProfileStore } from "@/entities/profile";

import type { TSettingsForm } from "../..";

import { useFormContext } from "react-hook-form";

export const useIsProfileUpdate = (): { isUpdated: boolean } => {
	const { profile } = useProfileStore();

	const { watch } = useFormContext<TSettingsForm>();

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
