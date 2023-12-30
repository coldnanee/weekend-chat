import type { TAuthFormItem } from "@/entities/auth";

export const fieldsRegistrationArr: TAuthFormItem[] = [
	{
		name: "login",
		type: "text",
		validation: {
			minLength: { value: 3, message: "login_length_error" }
		},
		label: "login_placeholder"
	},
	{
		name: "password",
		type: "password",
		validation: {
			minLength: { value: 8, message: "password_length_error" }
		},
		label: "password_placeholder"
	}
];
