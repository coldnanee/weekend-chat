import type { ReactNode } from "react";
import cl from "./index.module.scss";

export const SettingsSaveButton = ({
	children,
	onClick,
	className
}: {
	children: ReactNode;
	onClick?: () => void;
	className: string;
}) => {
	return (
		<button
			onClick={onClick}
			className={[cl.root, className].join(" ")}>
			{children}
		</button>
	);
};
