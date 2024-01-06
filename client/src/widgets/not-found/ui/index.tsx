"use client";

import { useI18nStore } from "@/shared";
import cl from "./index.module.scss";

export const NotFound = () => {
	const { translate } = useI18nStore();

	return (
		<section className={cl.root}>
			<div className={cl.root__body}>
				<h3 className={cl.root__body__title}>
					{translate("other", "page_not_found")}
				</h3>
			</div>
		</section>
	);
};
