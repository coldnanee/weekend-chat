"use client";

import cl from "./index.module.scss";

import Logo from "./images/logo.svg";

import Link from "next/link";
import Image from "next/image";

import { ImagesList } from "./ui/images-list";
import { AdaptiveIconsList } from "./ui/adaptive-icons-list";

export const Aside = () => {
	return (
		<aside className={[cl.root, "layout-aside"].join(" ")}>
			<Link
				href="/"
				className={cl.root__logo}>
				<Image
					src={Logo}
					alt="logo"
					priority={true}
				/>
			</Link>
			<ImagesList />
			<AdaptiveIconsList />
		</aside>
	);
};
