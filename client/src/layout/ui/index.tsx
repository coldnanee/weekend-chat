import type { ReactNode } from "react";

import cl from "./index.module.scss";

import { Aside } from "./aside";

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={cl.root}>
			<Aside />
			<div className={cl.root__body}>
				<div className={cl.root__body__children}>{children}</div>
			</div>
		</div>
	);
};
