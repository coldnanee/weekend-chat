import { SettingsContext } from "../../lib/useSettingsContext";

import { useState, type ReactNode } from "react";

import { settingsCategoriesArr } from "../../model/categories";

export const SettingsContextProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const [activeChapter, setActiveChapter] = useState<string>(
		settingsCategoriesArr[0].label
	);

	return (
		<SettingsContext.Provider value={{ activeChapter, setActiveChapter }}>
			{children}
		</SettingsContext.Provider>
	);
};
