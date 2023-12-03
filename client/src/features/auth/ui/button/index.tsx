import type { ReactNode } from "react";

import { useProfileStore } from "@/entities/profile";

import cl from "./index.module.scss";

export const AuthButton = ({
	children,
	className
}: {
	children: ReactNode;
	className: string;
}) => {
	const { isLoading } = useProfileStore();

	return (
		<button
			disabled={isLoading}
			className={[cl.root, className].join(" ")}>
			{children}
		</button>
	);
};
