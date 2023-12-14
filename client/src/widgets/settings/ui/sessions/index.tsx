"use client";

import cl from "./index.module.scss";

import { SessionList, useGetSessions } from "@/entities/session";

import { TiTick } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbReload } from "react-icons/tb";

import { Loader } from "@/shared";

import { useSettingsSession } from "@/entities/session";

import { useEffect } from "react";

export const SettingsSessions = () => {
	const { isAllSelected, toggleAllSession, setAllSessionListId } =
		useSettingsSession();
	const { data, isError, isLoading, refetch } = useGetSessions();

	const rootClChecked = [cl.root__select_panel__checkbox__body];

	if (isAllSelected) {
		rootClChecked.push(cl.root__select_panel__checkbox__body_checked);
	}

	useEffect(() => {
		if (data) {
			const sessionListId = data.sessions.map((i) => i._id);
			setAllSessionListId(sessionListId);
		}
	}, [data]);

	if (isError) {
		return <></>;
	}

	return (
		<div className={cl.root}>
			<div className={cl.root__select_panel}>
				<label className={cl.root__select_panel__checkbox}>
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
						className={cl.root__select_panel__arrow}
						color="#676768"
						size="30px"
					/>
				</label>
				<TbReload
					color="#a9aeba"
					className={cl.root__select_panel__reload}
					size="25px"
					onClick={refetch}
				/>
			</div>
			{isLoading ? (
				<div className={cl.root__select_panel__loader}>
					<Loader />
				</div>
			) : (
				<SessionList sessions={data?.sessions || []} />
			)}
		</div>
	);
};
