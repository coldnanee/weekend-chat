import type { TSettingsFormItem } from "./types";

export const fieldsSettingsArr: TSettingsFormItem[] = [
	{
		name: "login",
		type: "text",
		validation: {
			minLength: { value: 3, message: `Login can't be smaller 3 symbols` }
		},
		required: true
	},
	{
		name: "password",
		type: "password",
		validation: {
			minLength: { value: 8, message: `Password can't be smaller 8 symbols` }
		},
		required: false
	}
];
