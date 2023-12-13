"use client";

import cl from "./index.module.scss";

import { SessionList } from "@/entities/session";

import { TiTick } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";

import { useSettingsSession } from "../../model/store";

import { useEffect } from "react";

export const SettingsSessions = () => {
	const {
		fetchSessions,
		selectedSessionsArr,
		isAllSelected,
		toggleAllSessions,
		sessions
	} = useSettingsSession();

	useEffect(() => {
		fetchSessions();
	}, []);

	const rootClChecked = [cl.root__select_panel__checkbox__body];

	if (isAllSelected) {
		rootClChecked.push(cl.root__select_panel__checkbox__body_checked);
	}

	return (
		<div className={cl.root}>
			<div className={cl.root__select_panel}>
				<label className={cl.root__select_panel__checkbox}>
					<input
						type="text"
						id="#settings-session-all"
						checked={isAllSelected}
						onClick={toggleAllSessions}
					/>
					<div className={rootClChecked.join(" ")}>
						{isAllSelected && (
							<span>
								<TiTick
									size="18px"
									color="#676768"
								/>
							</span>
						)}
					</div>
					<IoMdArrowDropdown
						className={cl.root__select_panel__arrow}
						color="#676768"
						size="30px"
					/>
				</label>
			</div>
			<SessionList sessions={sessions} />
		</div>
	);
};
