import cl from "./index.module.scss";

import type { TSettingsCategoriesItem } from "../../model/types";

import { useSettingsStore } from "../../model/store";

export const SettingsCategoriesItem = ({
	category: { label, Image }
}: {
	category: TSettingsCategoriesItem;
}) => {
	const { setActiveChapter, activeChapter, toggleModal } = useSettingsStore();

	const rootClasses = [cl.root, cl.root_active];

	const onClick = () => {
		toggleModal();
		setActiveChapter(label);
	};

	return (
		<li
			className={activeChapter === label ? rootClasses.join(" ") : cl.root}
			onClick={onClick}>
			<Image />
			<p className={cl.root__text}>{label}</p>
		</li>
	);
};
