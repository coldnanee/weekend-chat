import cl from "./index.module.scss";

import type { TSettingsCategoriesItem } from "../../model/types";

import { useSettingsContext } from "../../lib/useSettingsContext";

export const SettingsCategoriesItem = ({
	category: { label, Image }
}: {
	category: TSettingsCategoriesItem;
}) => {
	const { setActiveChapter, activeChapter } = useSettingsContext();

	const rootClasses = [cl.root, cl.root_active];

	return (
		<li
			className={activeChapter === label ? rootClasses.join(" ") : cl.root}
			onClick={() => setActiveChapter(label)}>
			<Image />
			<p className={cl.root__text}>{label}</p>
		</li>
	);
};
