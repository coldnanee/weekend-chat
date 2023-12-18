import cl from "./index.module.scss";

import { settingsCategoriesArr } from "../../model/categories";

import { SettingsCategoriesItem } from "../categories-item";

export const SettingsCategoriesList = ({
	className
}: {
	className: string;
}) => {
	return (
		<ul className={[cl.root, className].join(" ")}>
			{settingsCategoriesArr.map((i) => (
				<SettingsCategoriesItem
					category={i}
					key={i.label}
				/>
			))}
		</ul>
	);
};
