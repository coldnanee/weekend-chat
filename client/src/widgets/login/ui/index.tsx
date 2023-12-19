"use client";

import { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";

import type { TAuthForm } from "@/entities/auth";
import { LoginForm } from "./form";

export const Login = () => {
	const form = useForm<TAuthForm>();

	useEffect(() => {
		const authData = localStorage.getItem("user");

		if (authData) {
			form.reset(JSON.parse(authData));
		}

		return () => localStorage.removeItem("user");
	}, []); //eslint-disable-line

	return (
		<FormProvider {...form}>
			<LoginForm />
		</FormProvider>
	);
};
