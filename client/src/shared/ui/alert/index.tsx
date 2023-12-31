"use client";

import { useEffect } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";

import { useAlertStore } from "../../lib";
import cl from "./index.module.scss";

export const Alert = () => {
	const { alert, setAlert } = useAlertStore();

	useEffect(() => {
		if (alert) {
			setTimeout(() => {
				setAlert(null);
			}, 5000);
		}
	}, [alert]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!alert) {
		return <></>;
	}

	return (
		<div
			className={cl.root}
			onClick={() => setAlert(null)}>
			<div className={cl.root__body}>
				{alert.type === "error" ? (
					<BiSolidErrorCircle
						className={cl.root__body__icon}
						size="20px"
						color="#d43e51"
					/>
				) : (
					<IoMdCheckmarkCircle
						className={cl.root__body__icon}
						size="20px"
						color="#43b525"
					/>
				)}
				<p className={cl.root__body__text}>{alert.message}</p>
			</div>
		</div>
	);
};
