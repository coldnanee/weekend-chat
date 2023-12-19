"use client";

import Image from "next/image";
import Link from "next/link";
import { AdaptiveIconsList } from "./adaptive-icons-list";
import { ImagesList } from "./images-list";
import cl from "./index.module.scss";

import Logo from "./logo.svg";

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
