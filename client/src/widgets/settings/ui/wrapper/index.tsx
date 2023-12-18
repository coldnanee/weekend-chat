"use client";

import { SettingsAccount } from "../account";
import { SettingsSessions } from "../sessions";
import { SettingsBlackList } from "../black-list";

import cl from "./index.module.scss";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

import { useSettingsStore } from "../../model/store";

const SettingsBody = () => {
	const { activeChapter } = useSettingsStore();

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
