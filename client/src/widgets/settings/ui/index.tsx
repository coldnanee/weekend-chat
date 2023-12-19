"use client";

import { FormProvider, useForm } from "react-hook-form";
import type { TSettingsForm } from "@/entities/settings";
import { ReactQueryProvider } from "@/shared";
import { SettingsCategories } from "./categories";
import cl from "./index.module.scss";

import { SettingsWrapper } from "./wrapper";

export const Settings = () => {
	const params = useForm<TSettingsForm>();

	return (
		<ReactQueryProvider>
			<FormProvider {...params}>
				<div className={cl.root}>
					<div className="container">
						<div className={cl.root__body}>
							<SettingsWrapper />
							<SettingsCategories />
						</div>
					</div>
				</div>
			</FormProvider>
		</ReactQueryProvider>
	);
};
