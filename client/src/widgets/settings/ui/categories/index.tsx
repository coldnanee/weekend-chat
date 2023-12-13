import cl from "./index.module.scss";

import { settingsCategoriesArr } from "../../model/categories";

import { SettingsCategoriesItem } from "../categories-item";

import { IconContext } from "react-icons";

export const SettingsCategories = () => {
	return (
		<IconContext.Provider
			value={{
				color: "#90939b",
				size: "20px"
			}}>
			<ul className={cl.root}>
				{settingsCategoriesArr.map((i) => (
					<SettingsCategoriesItem
						category={i}
						key={i.label}
					/>
				))}
			</ul>
		</IconContext.Provider>
	);
};
