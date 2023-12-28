import Link from "next/link";
import { AuthButton, AuthInput, AuthForm } from "@/features/auth";

import { useI18nStore } from "@/features/i18n/model";
import { useProfileStore } from "@/entities/profile";
import { fieldsRegistrationArr } from "./fields";

import cl from "./index.module.scss";

export const RegistrationForm = () => {
	const { registrationUser } = useProfileStore();
	const { translate } = useI18nStore();

	return (
		<AuthForm
			thunk={registrationUser}
			title={translate("title")}>
			{fieldsRegistrationArr.map((field, index) => (
				<AuthInput
					{...field}
					key={field.name}
					className={
						index + 1 === fieldsRegistrationArr.length
							? cl.root__input_last
							: ""
					}
				/>
			))}
			<AuthButton className={cl.root__button}>{translate("button")}</AuthButton>
			<Link
				className={cl.root__link}
				href="/login">
				{translate("login_link")}
			</Link>
		</AuthForm>
	);
};
