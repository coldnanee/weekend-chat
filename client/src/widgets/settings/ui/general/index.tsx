"use client";

import { SettingsDeleteProfile } from "@/features/settings";
import { LanguageSelect, useProfileSettingsStore } from "@/entities/settings";
import { SettingsSaveButton } from "../button";
import cl from "./index.module.scss";

export const SettingsGeneral = () => {
	const { updateProfileSettings } = useProfileSettingsStore();

	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<LanguageSelect />
			</div>
			<SettingsDeleteProfile />
			<SettingsSaveButton onClick={updateProfileSettings} />
		</div>
	);
};
