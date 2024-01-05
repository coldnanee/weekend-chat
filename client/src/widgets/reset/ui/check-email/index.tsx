"use client";

import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { useResetPasswordStore } from "@/features/reset";
import { useI18nStore } from "@/shared";
import cl from "./index.module.scss";

export const ResetCheckEmail = () => {
	const { clearEmail } = useResetPasswordStore();

	const { translate } = useI18nStore();

	return (
		<div className={cl.root}>
			<CiMail
				className={cl.root__image}
				size="70px"
				color="#a9aeba"
			/>
			<h1 className={cl.root__title}>
				{translate("login", "check_email_title")}
			</h1>
			<Link
				onClick={clearEmail}
				href="/login"
				className={cl.root__link}>
				{translate("login", "check_email_link")}
			</Link>
		</div>
	);
};
