import type { RegisterOptions } from "react-hook-form";

export type TAuthForm = {
	[key: string]: string;
	login: string;
	password: string;
};

export type TAuthFormItem = {
	name: TAuthFormField;
	type: "text" | "password";
	validation: RegisterOptions<TAuthForm, TAuthFormField>;
};

export type TAuthFormField = "login" | "password";
