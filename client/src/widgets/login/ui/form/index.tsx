import Link from "next/link";
import { AuthButton, AuthInput, AuthForm } from "@/features/auth";

import { useProfileStore } from "@/entities/profile";
import { fieldsLoginArr } from "./fields";

import cl from "./index.module.scss";

export const LoginForm = () => {
	const { loginUser } = useProfileStore();

	return (
		<AuthForm
			thunk={loginUser}
			title="Login">
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
			<div className={cl.root__links}>
				<Link
					className={cl.root__link}
					href="/registration">
					Registration
				</Link>
				<Link
					className={cl.root__link}
					href="/login/reset">
					Reset password
				</Link>
			</div>
		</AuthForm>
	);
};
