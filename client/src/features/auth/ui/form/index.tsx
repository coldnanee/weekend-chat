"use client";

import { useRouter } from "next/navigation";

import cl from "./index.module.scss";

import type { ReactNode } from "react";

import type { TAuthForm } from "../..";

import { useFormContext } from "react-hook-form";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function AuthForm({
	children,
	thunk
}: {
	children: ReactNode;
	thunk: (user: TAuthForm, router: AppRouterInstance) => Promise<void>;
}) {
	const { handleSubmit } = useFormContext<TAuthForm>();

	const router = useRouter();

	const onSubmit = (user: TAuthForm) => {
		thunk(user, router);
	};

	return (
		<section className={cl.root}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cl.root__form}>
				{children}
			</form>
		</section>
	);
}
