"use client";

import { SettingsForm } from "./form";

import type { TSettingsForm } from "../model/types";

import { FormProvider, useForm } from "react-hook-form";

export const Settings = () => {
	const params = useForm<TSettingsForm>();

	return (
		<FormProvider {...params}>
			<SettingsForm />
		</FormProvider>
	);
};
