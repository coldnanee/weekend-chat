import type { TSettingsFormItem } from "@/entities/settings";

export const fieldsSettingsArr: TSettingsFormItem[] = [
	{
		name: "login",
		type: "text",
		validation: {
			minLength: { value: 3, message: `Login can't be smaller 3 symbols` }
		},
		required: true,
		label: "account_login_placeholder"
	},
	{
		name: "password",
		type: "password",
		validation: {
			minLength: { value: 8, message: `Password can't be smaller 8 symbols` }
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
