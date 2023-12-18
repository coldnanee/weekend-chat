"use client";

import { useState } from "react";

import cl from "./index.module.scss";

import { SettingsCategoriesList } from "../categories-list";

import { RxCross2 } from "react-icons/rx";

import { IconContext } from "react-icons";

import { useSettingsStore } from "../../model/store";

export const SettingsCategories = () => {
	const { isModalShow, changeVisibilityModal } = useSettingsStore();

	const rootAdaptiveClasses = [cl.adaptive];

	if (isModalShow) {
		rootAdaptiveClasses.push(cl.show);
	}

	return (
		<IconContext.Provider
			value={{
				color: "#90939b",
				size: "20px"
			}}>
			<SettingsCategoriesList className={cl.root} />
			<div
				className={rootAdaptiveClasses.join(" ")}
				onClick={() => changeVisibilityModal(false)}>
				<div
					className={cl.adaptive__body}
					onClick={(e) => e.stopPropagation()}>
					<RxCross2
						className={cl.adaptive__body__cross}
						color="#a9aeba"
						size="30"
						onClick={() => changeVisibilityModal(false)}
					/>
					<SettingsCategoriesList className={cl.adaptive__body__list} />
				</div>
			</div>
		</IconContext.Provider>
	);
};
