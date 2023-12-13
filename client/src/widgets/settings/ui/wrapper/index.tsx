import { SettingsAccount } from "../account";
import { SettingsSessions } from "../sessions";
import { SettingsBlackList } from "../black-list";

import cl from "./index.module.scss";

import { useSettingsContext } from "../../lib/useSettingsContext";

import { IoIosArrowBack } from "react-icons/io";

const SettingsBody = () => {
	const { activeChapter } = useSettingsContext();

	switch (activeChapter) {
		case "Account":
			return <SettingsAccount />;
		case "Black List":
			return <SettingsBlackList />;
		case "Sessions":
			return <SettingsSessions />;
		default:
			return <></>;
	}
};

export const SettingsWrapper = () => {
	return (
		<div className={cl.root}>
			<button className={cl.root__arrow}>
				<IoIosArrowBack
					color="#a9aeba"
					size="25px"
				/>
			</button>
			<SettingsBody />
		</div>
	);
};
