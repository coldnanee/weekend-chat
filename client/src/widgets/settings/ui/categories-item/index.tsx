import type { TSettingsCategoriesItem } from "@/entities/settings";
import { useSettingsStore } from "../../model";
import cl from "./index.module.scss";

export const SettingsCategoriesItem = ({
	category: { label, Picture }
}: {
	category: TSettingsCategoriesItem;
}) => {
	const { setActiveChapter, activeChapter, changeVisibilityModal } =
		useSettingsStore();

	const rootClasses = [cl.root, cl.root_active];

	const onClick = () => {
		changeVisibilityModal(false);
		setActiveChapter(label);
	};

	return (
		<li
			className={activeChapter === label ? rootClasses.join(" ") : cl.root}
			onClick={onClick}>
			<Picture />
			<p className={cl.root__text}>{label}</p>
		</li>
	);
};
