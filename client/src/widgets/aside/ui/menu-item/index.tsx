"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { useI18nStore } from "@/shared";
import cl from "./index.module.scss";

export const SettingsMenuItem = ({
	cb,
	Picture,
	link = "",
	text
}: {
	cb?: () => unknown;
	Picture: IconType;
	link?: string;
	text: string;
}) => {
	const { translate } = useI18nStore();

	return cb ? (
		<div
			onClick={cb}
			className={[cl.root, cl.root_click].join(" ")}>
			<Picture />
			<p className={cl.root__text}>{translate("other", text)}</p>
		</div>
	) : (
		<Link
			href={link}
			className={cl.root}>
			<Picture />
			<p className={cl.root__text}>{translate("other", text)}</p>
		</Link>
	);
};
