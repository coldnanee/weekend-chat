import cl from "./index.module.scss";

import { AuthButton, AuthInput, AuthForm } from "@/features/auth";

import Link from "next/link";

import { fieldsRegistrationArr } from "../../model/fields";

import { useProfileStore } from "@/entities/profile";

export const RegistrationForm = () => {
	const { registrationUser } = useProfileStore();

	return (
		<AuthForm
			thunk={registrationUser}
			title="Registration">
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
			<AuthButton className={cl.root__button}>REGISTRATION</AuthButton>
			<Link
				className={cl.root__link}
				href="/login">
				Login
			</Link>
		</AuthForm>
	);
};
