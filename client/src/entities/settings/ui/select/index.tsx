"use client";

import { useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { useProfileSettingsStore } from "@/entities/settings"; // eslint-disable-line boundaries/element-types
import { useI18nStore } from "@/shared";
import { languagesItemsArr } from "../../model";
import cl from "./index.module.scss";

export const LanguageSelect = () => {
	const { select, setSelect, settings } = useProfileSettingsStore();
	const { translate } = useI18nStore();

	useEffect(() => {
		const language =
			(settings &&
				languagesItemsArr.find((i) => i.value === settings.language)?.label) ||
			"general_language_english";

		setSelect({ isShow: false, language });
	}, []); // eslint-disable-line

	const rootClassesList = [cl.root__select__list];
	const rootClassesItem = [
		cl.root__select__list__item,
		cl.root__select__list__item_active
	];

	if (select.isShow) {
		rootClassesList.push(cl.root__select__list_visible);
	}

	return (
		<div className={cl.root}>
			<p className={cl.root__text}>
				{translate("settings", "general_language_title")}
			</p>
			<div
				role="select"
				className={cl.root__select}>
				<div
					className={cl.root__select__language}
					onClick={() => setSelect({ ...select, isShow: !select.isShow })}>
					<p className={cl.root__select__language__text}>
						{translate("settings", select.language)}
					</p>
					<IoIosArrowDown
						className={cl.root__select__language__icon}
						color="#a9aeba"
						size="16px"
					/>
				</div>
				<ul className={rootClassesList.join(" ")}>
					{languagesItemsArr.map(({ label }) => (
						<li
							onClick={() => setSelect({ isShow: false, language: label })}
							key={label}
							className={
								select.language === label
									? rootClassesItem.join(" ")
									: cl.root__select__list__item
							}>
							<p>{translate("settings", label)}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
