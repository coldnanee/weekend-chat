"use client";

import { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";

import type { TAuthForm } from "@/entities/auth";
import { RegistrationForm } from "./form";

export const Registration = () => {
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
			<RegistrationForm />
		</FormProvider>
	);
};
