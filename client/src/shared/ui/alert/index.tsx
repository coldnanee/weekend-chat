"use client";

import { useEffect } from "react";

import { RxCross2 } from "react-icons/rx";
import { useAlertStore } from "../../lib";
import cl from "./index.module.scss";

export const Alert = () => {
	const { alert, setAlert } = useAlertStore();

	useEffect(() => {
		if (alert) {
			const timeout = setTimeout(() => {
				setAlert(null);
			}, 4000);

			return () => clearTimeout(timeout);
		}
	}, [alert]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!alert) {
		return <></>;
	}

	return (
		<div
			className={cl.root}
			style={{
				backgroundColor: alert.type === "error" ? "#FF5555" : "#43b525"
			}}
			onClick={() => setAlert(null)}
			data-testid="alert">
			<div className={cl.root__body}>
				<p
					data-testid="alert-message"
					className={cl.root__body__text}>
					{alert.message}
				</p>
				<RxCross2
					data-testid="alert-icon"
					color="#fff"
					size="20px"
					className={cl.root__body__icon}
				/>
			</div>
		</div>
	);
};
