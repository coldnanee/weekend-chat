import Link from "next/link";
import { AuthButton, AuthInput, AuthForm } from "@/features/auth";

import { useProfileStore } from "@/entities/profile";
import { fieldsRegistrationArr } from "./fields";

import cl from "./index.module.scss";

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
