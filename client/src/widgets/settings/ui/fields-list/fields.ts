import type { TSettingsFormItem } from "@/entities/settings";

export const fieldsSettingsArr: TSettingsFormItem[] = [
	{
		name: "login",
		type: "text",
		validation: {
			minLength: { value: 3, message: "login_length_error" }
		},
		required: true,
		label: "login_placeholder"
	},
	{
		name: "password",
		type: "password",
		validation: {
			minLength: { value: 8, message: "password_length_error" }
		},
		required: false,
		label: "password_placeholder"
	},
	{
		name: "email",
		type: "text",
		validation: {},
		required: true,
		label: "email_placeholder"
	}
];
