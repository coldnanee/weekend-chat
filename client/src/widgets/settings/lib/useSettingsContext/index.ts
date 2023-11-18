import { createContext, useContext } from "react";

import type { TSettingsContext } from "../../model/types";

export const SettingsContext = createContext<TSettingsContext>({
	activeChapter: "",
	setActiveChapter: () => {}
});

export const useSettingsContext = () => useContext(SettingsContext);
