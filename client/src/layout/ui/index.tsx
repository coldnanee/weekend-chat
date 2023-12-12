"use client";

import type { ReactNode } from "react";

import cl from "./index.module.scss";

import { Aside } from "./aside";
import { Chats } from "./chats/ui";

import { ReactQueryProvider } from "@/shared";

export const Layout = ({
	children,
	className
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<ReactQueryProvider>
			<div className={[cl.root, "layout", className].join(" ")}>
				<Aside />
				<div className={cl.root__wrapper}>
					<Chats />
					<div className={[cl.root__wrapper__body, "layout-body"].join(" ")}>
						{children}
					</div>
				</div>
			</div>
		</ReactQueryProvider>
	);
};
