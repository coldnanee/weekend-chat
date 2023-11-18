"use client";

import cl from "./index.module.scss";

import type { IconType } from "react-icons";

import Link from "next/link";

export const SettingsMenuItem = ({
	cb,
	Image,
	link = "",
	text
}: {
	cb?: () => unknown;
	Image: IconType;
	link?: string;
	text: string;
}) => {
	return cb ? (
		<div
			onClick={cb}
			className={[cl.root, cl.root_click].join(" ")}>
			<Image />
			<p className={cl.root__text}>{text}</p>
		</div>
	) : (
		<Link
			href={link}
			className={cl.root}>
			<Image />
			<p className={cl.root__text}>{text}</p>
		</Link>
	);
};
