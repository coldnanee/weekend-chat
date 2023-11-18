"use client";

import { useRouter } from "next/navigation";

import cl from "./index.module.scss";

import type { ReactNode } from "react";

import type { TAuthForm } from "../..";

import { useFormContext } from "react-hook-form";

import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import type { AsyncThunk } from "@reduxjs/toolkit";

export function AuthForm({
	children,
	thunk
}: {
	children: ReactNode;
	thunk: AsyncThunk<any, any, any>;
}) {
	const dispatch = useAppDispatch();

	const { handleSubmit } = useFormContext<TAuthForm>();

	const router = useRouter();

	const onSubmit = (user: TAuthForm) => {
		dispatch(thunk({ user, router }));
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
