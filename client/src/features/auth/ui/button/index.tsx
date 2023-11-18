import type { ReactNode } from "react";

import cl from "./index.module.scss";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

export const AuthButton = ({
	children,
	className
}: {
	children: ReactNode;
	className: string;
}) => {
	const status = useAppSelector((store) => store.profile.status);

	return (
		<button
			disabled={status === "loading"}
			className={[cl.root, className].join(" ")}>
			{children}
		</button>
	);
};
