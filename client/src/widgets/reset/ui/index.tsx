"use client";

import { SendResetLink } from "@/features/reset";
import { useResetPasswordStore } from "@/features/reset";
import { ResetCheckEmail } from "./check-email";
import cl from "./index.module.scss";

export const ResetPassword = () => {
	const { email } = useResetPasswordStore();

	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				{email ? <ResetCheckEmail /> : <SendResetLink />}
			</div>
		</div>
	);
};
