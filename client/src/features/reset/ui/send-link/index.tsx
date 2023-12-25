"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader } from "@/shared";
import { useResetPasswordStore } from "../../model";
import cl from "./index.module.scss";

type TSendResetLinkForm = {
	email: string;
};

export const SendResetLink = () => {
	const { sendLink, isLinkLoading } = useResetPasswordStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<TSendResetLinkForm>();

	const onSubmit = (data: TSendResetLinkForm) => {
		sendLink(data.email);
	};

	const inputValue = watch("email");

	return (
		<form
			className={cl.root}
			onSubmit={handleSubmit(onSubmit)}>
			{isLinkLoading ? (
				<Loader className={cl.root__loader} />
			) : (
				<>
					<h1 className={cl.root__title}>Send reset link:</h1>
					<div className={cl.root__input}>
						<input
							autoComplete="off"
							type="text"
							{...register("email")}
							className={cl.root__input__body}
							required
							id="email"
						/>
						{errors["email"] && (
							<p className={cl.root__input__error}>{errors["email"].message}</p>
						)}
						<label
							className={
								inputValue
									? [cl.root__input__label, cl.root__input__label_hidden].join(" ") // prettier-ignore
									: cl.root__input__label
							}
							htmlFor="email">
							Email
						</label>
					</div>
					<button className={cl.root__button}>Send link</button>
					<Link
						href="/login"
						className={cl.root__link}>
						Login
					</Link>
				</>
			)}
		</form>
	);
};
