"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useI18nStore } from "@/shared";
import { Loader } from "@/shared";
import { useResetPasswordStore } from "../../model";
import cl from "./index.module.scss";

type TSendResetLinkForm = {
	email: string;
};

export const SendResetLink = () => {
	const { sendLink, isLinkLoading } = useResetPasswordStore();

	const { translate } = useI18nStore();

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
					<h1 className={cl.root__title}>{translate("send_link_title")}</h1>
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
							{translate("send_link_placeholder")}
						</label>
					</div>
					<button className={cl.root__button}>
						{translate("send_link_button")}
					</button>
					<Link
						href="/login"
						className={cl.root__link}>
						{translate("send_link_link")}
					</Link>
				</>
			)}
		</form>
	);
};
