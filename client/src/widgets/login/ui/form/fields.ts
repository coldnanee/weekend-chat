import type { TAuthFormItem } from "@/entities/auth";

export const fieldsLoginArr: TAuthFormItem[] = [
	{
		name: "login",
		label: "login_placeholder",
		type: "text",
		validation: {
			minLength: { value: 3, message: "login_length_error" }
		}
	},
	{
		name: "password",
		type: "password",
		label: "password_placeholder",
		validation: {
			minLength: { value: 8, message: "password_length_error" }
		}
	}
];
