import type { TAuthFormItem } from "@/features/auth/model/types";

export const fieldsRegistrationArr: TAuthFormItem[] = [
	{
		name: "login",
		type: "text",
		validation: {
			minLength: { value: 3, message: `Login can't be smaller 3 symbols` }
		}
	},
	{
		name: "password",
		type: "password",
		validation: {
			minLength: { value: 8, message: `Password can't be smaller 8 symbols` }
		}
	}
];
