"use client";

import cl from "./index.module.scss";

import { IconContext } from "react-icons";

import Logo from "./images/logo.svg";

import Link from "next/link";
import Image from "next/image";

import { ImagesList } from "./ui/images-list";

export const Aside = () => {
	return (
		<aside className={cl.root}>
			<IconContext.Provider
				value={{
					color: "#a6abb7",
					size: "20px"
				}}>
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
			</IconContext.Provider>
		</aside>
	);
};
