"use client";

import { useEffect } from "react";

import { RegistrationForm } from "./form";

import { FormProvider, useForm } from "react-hook-form";

import type { TAuthForm } from "@/features/auth";

export const Registration = () => {
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
			<RegistrationForm />
		</FormProvider>
	);
};
