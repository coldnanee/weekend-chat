import { SettingsContext } from "../../lib/useSettingsContext";

import { useState, type ReactNode, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { chaptersSettingsArr } from "../../model/chapters";

export const SettingsContextProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const router = useRouter();
	const params = useSearchParams();

	const getActiveChapter = (): string => {
		const defaultValue = chaptersSettingsArr[0].value;

		if (params) {
			const chapterFromQuery = params.get("chapter");
			if (!chapterFromQuery) {
				return defaultValue;
			}
			return ["account", "general"].includes(chapterFromQuery)
				? chapterFromQuery
				: defaultValue;
		}

		return defaultValue;
	};

	const [activeChapter, setActiveChapter] = useState<string>(getActiveChapter);

	useEffect(() => {
		router.push(`/settings?chapter=${activeChapter}`);
	}, [activeChapter]);

	return (
		<SettingsContext.Provider value={{ activeChapter, setActiveChapter }}>
			{children}
		</SettingsContext.Provider>
	);
};
