import cl from "./index.module.scss";

import { chaptersSettingsArr } from "../../model/chapters";

import { useSettingsContext } from "../../lib/useSettingsContext";

export const SettingsSwitch = () => {
	const rootClActive = [cl.root__body__item, cl.root__body__item_active];

	const { activeChapter, setActiveChapter } = useSettingsContext();

	return (
		<nav className={cl.root}>
			<ul className={cl.root__body}>
				{chaptersSettingsArr.map((chapter) => (
					<li
						onClick={() => setActiveChapter(chapter.value)}
						className={
							activeChapter === chapter.value
								? rootClActive.join(" ")
								: cl.root__body__item
						}
						key={chapter.value}>
						{chapter.label}
					</li>
				))}
			</ul>
		</nav>
	);
};
