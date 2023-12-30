import type { TSettingsCategoriesItem } from "@/entities/settings";
import { useI18nStore } from "@/shared";
import { useSettingsStore } from "../../model";
import cl from "./index.module.scss";

export const SettingsCategoriesItem = ({
	category: { label, Picture }
}: {
	category: TSettingsCategoriesItem;
}) => {
	const { translate } = useI18nStore();

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
			<p className={cl.root__text}>{translate(label)}</p>
		</li>
	);
};
