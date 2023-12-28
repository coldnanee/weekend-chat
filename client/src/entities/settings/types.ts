import type { RegisterOptions } from "react-hook-form";

import type { IconType } from "react-icons";

export type TSettingsFormItem = {
	name: TSettingsFormField;
	type: "text" | "password";
	validation: RegisterOptions<TSettingsForm, TSettingsFormField>;
	required: boolean;
	label: string;
};

export type TSettingsForm = {
	login: string;
	password: string;
	avatar: File[] | null;
	email: string;
};

export type TSettingsProfile = Omit<TSettingsForm, "avatar"> & {
	avatar: null | string | ArrayBuffer;
};

export type TSettingsFormField = "login" | "password" | "avatar" | "email";

export type TSettingsCategoriesItem = {
	label: string;
	Picture: IconType;
};

export type TProfileSettings = {
	language: string;
};
