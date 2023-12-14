"use client";

import cl from "./index.module.scss";

import { SessionList } from "@/entities/session";

import { TiTick } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbReload } from "react-icons/tb";

import { Loader } from "@/shared";

import { useSettingsSession } from "@/entities/session";

import { useEffect } from "react";

export const SettingsSessions = () => {
	const {
		isAllSelected,
		toggleAllSession,
		selectedSessions,
		killSessions,
		fetchSessions,
		isSessionsLoading,
		sessions
	} = useSettingsSession();

	const rootClChecked = [cl.root__select_panel__body__checkbox__body];

	if (isAllSelected) {
		rootClChecked.push(cl.root__select_panel__body__checkbox__body_checked);
	}

	useEffect(() => {
		fetchSessions();
	}, []);

	return (
		<div className={cl.root}>
			<div className={cl.root__select_panel}>
				<div className={cl.root__select_panel__body}>
					<label className={cl.root__select_panel__body__checkbox}>
						<input
							type="text"
							id="#settings-session-all"
							checked={isAllSelected}
							onChange={toggleAllSession}
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
							className={cl.root__select_panel__body__arrow}
							color="#676768"
							size="30px"
						/>
					</label>
					{selectedSessions.length > 0 && (
						<button
							className={cl.root__select_panel__body__delete}
							onClick={killSessions}>
							Delete
						</button>
					)}
				</div>
				<TbReload
					color="#a9aeba"
					className={cl.root__select_panel__reload}
					size="25px"
					onClick={fetchSessions}
				/>
			</div>
			{isSessionsLoading ? (
				<div className={cl.root__select_panel__loader}>
					<Loader />
				</div>
			) : (
				<SessionList sessions={sessions || []} />
			)}
		</div>
	);
};
