import type { TSettingsFormItem } from "@/entities/settings";

export const fieldsSettingsArr: TSettingsFormItem[] = [
	{
		name: "login",
		type: "text",
		validation: {
			minLength: { value: 3, message: "settings_input_login_error" }
		},
		required: true,
		label: "account_login_placeholder"
	},
	{
		name: "password",
		type: "password",
		validation: {
			minLength: { value: 8, message: "settings_input_password_error" }
		},
		required: false,
		label: "account_password_placeholder"
	},
	{
		name: "email",
		type: "text",
		validation: {},
		required: true,
		label: "account_email_placeholder"
	}
];
