"use client";

import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { useResetPasswordStore } from "@/features/reset";
import cl from "./index.module.scss";

export const ResetCheckEmail = () => {
	const { clearEmail } = useResetPasswordStore();

	return (
		<div className={cl.root}>
			<CiMail
				className={cl.root__image}
				size="70px"
				color="#a9aeba"
			/>
			<h1 className={cl.root__title}>Link send. Check email!</h1>
			<Link
				onClick={clearEmail}
				href="/login"
				className={cl.root__link}>
				Go Login!
			</Link>
		</div>
	);
};
