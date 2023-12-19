import { settingsCategoriesArr } from "../../model";
import { SettingsCategoriesItem } from "../categories-item";

import cl from "./index.module.scss";

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
