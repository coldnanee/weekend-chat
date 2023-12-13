import Image from "next/image";
import type { TSession } from "../model/types";

import cl from "./index.module.scss";

import LinuxImage from "../images/linux.svg";

export const SessionItem = ({ session }: { session: TSession }) => {
	return (
		<li className={cl.root}>
			<Image
				className={cl.root__image}
				src={LinuxImage}
				alt={session.os}
				height={30}
				width={30}
			/>
			<div className={cl.root__body}>
				<p className={cl.root__body__os}>{session.os}</p>
				<p className={cl.root__body__browser}>{session.browser}</p>
			</div>
		</li>
	);
};
