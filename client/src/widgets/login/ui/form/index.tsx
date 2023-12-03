import cl from "./index.module.scss";

import { AuthButton, AuthInput, AuthForm } from "@/features/auth";

import { fieldsLoginArr } from "../../model/fields";

import Link from "next/link";

import { useProfileStore } from "@/entities/profile";

export const LoginForm = () => {
	const { loginUser } = useProfileStore();

	return (
		<AuthForm thunk={loginUser}>
			{fieldsLoginArr.map((field, index) => (
				<AuthInput
					key={field.name}
					{...field}
					className={
						index + 1 === fieldsLoginArr.length ? cl.root__input_last : ""
					}
				/>
			))}
			<AuthButton className={cl.root__button}>LOGIN</AuthButton>
			<Link
				className={cl.root__link}
				href="/registration">
				registration
			</Link>
		</AuthForm>
	);
};
