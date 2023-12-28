import { SettingsSaveButton } from "../button";
import { LanguageSelect } from "../language-select";
import cl from "./index.module.scss";

export const SettingsGeneral = () => {
	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<LanguageSelect />
			</div>
			<SettingsSaveButton />
		</div>
	);
};
