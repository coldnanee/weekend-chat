import type { ReactNode } from "react";

import cl from "./index.module.scss";

import { Aside } from "./aside";
import { Chats } from "./chats/ui";

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={cl.root}>
			<Aside />
			<div className={cl.root__wrapper}>
				<Chats />
				<div className={cl.root__wrapper__body}>{children}</div>
			</div>
		</div>
	);
};
