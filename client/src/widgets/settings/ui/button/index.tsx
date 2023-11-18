import cl from "./index.module.scss";

import type { ReactNode } from "react";

export const SettingsButton = ({
	children,
	type,
	border,
	onClick
}: {
	children: ReactNode;
	type?: "submit";
	border: boolean;
	onClick?: (...args: unknown[]) => void;
}) => {
	const rootCl = [cl.root, cl.root_border];

	return (
		<button
			onClick={onClick}
			type={type || "button"}
			className={border ? rootCl.join(" ") : cl.root}>
			{children}
		</button>
	);
};
