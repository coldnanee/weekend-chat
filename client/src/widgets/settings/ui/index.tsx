"use client";

import cl from "./index.module.scss";

import { SettingsCategories } from "./categories";

import { SettingsWrapper } from "./wrapper";

import type { TSettingsForm } from "../model/types";

import { FormProvider, useForm } from "react-hook-form";

import { SettingsContextProvider } from "./chapter-provider";

export const Settings = () => {
	const params = useForm<TSettingsForm>();

	return (
		<FormProvider {...params}>
			<SettingsContextProvider>
				<div className={cl.root}>
					<div className="container">
						<div className={cl.root__body}>
							<SettingsWrapper />
							<SettingsCategories />
						</div>
					</div>
				</div>
			</SettingsContextProvider>
		</FormProvider>
	);
};
