"use client";

import { useEffect } from "react";

import { LoginForm } from "./form";

import { FormProvider, useForm } from "react-hook-form";

import type { TAuthForm } from "@/features/auth";

export const Login = () => {
	const form = useForm<TAuthForm>();

	useEffect(() => {
		const authData = localStorage.getItem("user");

		if (authData) {
			form.reset(JSON.parse(authData));
		}

		return () => localStorage.removeItem("user");
	}, []);

	return (
		<FormProvider {...form}>
			<LoginForm />
		</FormProvider>
	);
};
