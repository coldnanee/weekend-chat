"use client";

import Image from "next/image";
import type { TSession } from "../model/types";

import cl from "./index.module.scss";

import { TiTick } from "react-icons/ti";

import LinuxImage from "../images/linux.svg";
import { useState } from "react";

export const SessionItem = ({ session }: { session: TSession }) => {
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const toggleSession = () => {
		setIsSelected(!isSelected);
	};

	const rootCl = [cl.root];

	const rootClCheckbox = [cl.root__wrapper__checkbox__body];

	if (isSelected) {
		rootCl.push(cl.root_check);
		rootClCheckbox.push(cl.root__wrapper__checkbox__body_check);
	}

	return (
		<li className={rootCl.join(" ")}>
			<label
				className={cl.root__wrapper}
				htmlFor={session._id}>
				<div className={cl.root__wrapper__checkbox}>
					<input
						type="checkbox"
						checked={isSelected}
						id={session._id}
						onClick={toggleSession}
					/>
					<span className={rootClCheckbox.join(" ")}>
						{isSelected && <TiTick color="676768" />}
					</span>
				</div>
				<Image
					className={cl.root__wrapper__image}
					src={LinuxImage}
					alt={session.os}
					height={30}
					width={30}
				/>
				<div className={cl.root__wrapper__body}>
					<p className={cl.root__wrapper__body__browser}>{session.browser}</p>
					<p className={cl.root__wrapper__body__id}>{session._id}</p>
				</div>
			</label>
		</li>
	);
};
