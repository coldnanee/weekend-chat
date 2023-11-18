import cl from "./index.module.scss";

import { SettingsAvatar } from "../avatar";
import { SettingsFieldsList } from "../fields-list";

export const SettingsAccount = () => {
	return (
		<div className={cl.root}>
			<SettingsAvatar />
			<SettingsFieldsList />
		</div>
	);
};
