"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useSettingsStore } from "../../model";
import { SettingsAccount } from "../account";
import { SettingsBlackList } from "../black-list";
import { SettingsGeneral } from "../general";
import { SettingsSessions } from "../sessions";

import cl from "./index.module.scss";

const SettingsBody = () => {
	const { activeChapter } = useSettingsStore();

	switch (activeChapter) {
		case "categories_account":
			return <SettingsAccount />;
		case "categories_black_list":
			return <SettingsBlackList />;
		case "categories_sessions":
			return <SettingsSessions />;
		case "categories_general":
			return <SettingsGeneral />;
		default:
			return <></>;
	}
};

export const SettingsWrapper = () => {
	const router = useRouter();
	const goBack = () => router.back();

	const { changeVisibilityModal } = useSettingsStore();

	return (
		<div className={cl.root}>
			<div className={cl.root__buttons}>
				<button
					className={cl.root__buttons__arrow}
					onClick={goBack}>
					<IoIosArrowBack
						color="#a9aeba"
						size="25px"
					/>
				</button>
				<button
					className={cl.root__buttons__label_menu}
					onClick={() => changeVisibilityModal(true)}>
					<span />
					<span />
					<span />
				</button>
			</div>
			<SettingsBody />
		</div>
	);
};
