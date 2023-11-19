import type { RegisterOptions } from "react-hook-form";

export type TSettingsFormItem = {
	name: TSettingsFormField;
	type: "text" | "password";
	validation: RegisterOptions<TSettingsForm, TSettingsFormField>;
	required: boolean;
};

export type TSettingsForm = {
	login: string;
	password: string;
	avatar: File[] | null;
};

export type TSettingsProfile = Omit<TSettingsForm, "avatar"> & {
	avatar: null | string | ArrayBuffer;
};

export type TSettingsFormField = "login" | "password" | "avatar";

export type TSettingsChapter = {
	label: string;
	value: string;
};

export type TSettingsContext = {
	activeChapter: string;
	setActiveChapter: (activeChapter: string) => void;
};
