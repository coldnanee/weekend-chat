"use client";

import { SettingsForm } from "./form";

import type { TSettingsForm } from "../model/types";

import { Layout } from "@/layout";

import { FormProvider, useForm } from "react-hook-form";

export const Settings = () => {
	const params = useForm<TSettingsForm>();

	return (
		<Layout>
			<FormProvider {...params}>
				<SettingsForm />
			</FormProvider>
		</Layout>
	);
};
