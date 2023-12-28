import type { TAuthFormItem } from "@/entities/auth";

export const fieldsLoginArr: TAuthFormItem[] = [
	{
		name: "login",
		label: "login_placeholder",
		type: "text",
		validation: {
			minLength: { value: 3, message: `Login can't be smaller 3 symbols` }
		}
	},
	{
		name: "password",
		type: "password",
		label: "password_placeholder",
		validation: {
			minLength: { value: 8, message: `Password can't be smaller 8 symbols` }
		}
	}
];
