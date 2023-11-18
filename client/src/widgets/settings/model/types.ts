export type TSettingsFormItem = {
	name: TSettingFormField;
	type: "text" | "password";
};

export type TSettingsForm = {
	login: string;
	password: string;
	avatar: File[];
};

export type TSettingsProfile = Omit<TSettingsForm, "avatar"> & {
	avatar: null | string | ArrayBuffer;
};

export type TSettingFormField = "login" | "password";

export type TSettingsChapter = {
	label: string;
	value: string;
};

export type TSettingsContext = {
	activeChapter: string;
	setActiveChapter: (activeChapter: string) => void;
};
