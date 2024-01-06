"use client";

import Link from "next/link";
import { AuthButton, AuthInput, AuthForm } from "@/features/auth";

import { useProfileStore } from "@/entities/profile";
import { useI18nStore } from "@/shared";
import { fieldsLoginArr } from "./fields";

import cl from "./index.module.scss";

export const LoginForm = () => {
	const { loginUser } = useProfileStore();
	const { translate } = useI18nStore();

	return (
		<AuthForm
			thunk={loginUser}
			title={translate("login", "title")}>
			{fieldsLoginArr.map((field, index) => (
				<AuthInput
					key={field.name}
					{...field}
					className={
						index + 1 === fieldsLoginArr.length ? cl.root__input_last : ""
					}
				/>
			))}
			<AuthButton className={cl.root__button}>
				{translate("login", "button")}
			</AuthButton>
			<div className={cl.root__links}>
				<Link
					className={cl.root__link}
					href="/registration">
					{translate("login", "registration_link")}
				</Link>
				<Link
					className={cl.root__link}
					href="/login/reset">
					{translate("login", "reset_link")}
				</Link>
			</div>
		</AuthForm>
	);
};
