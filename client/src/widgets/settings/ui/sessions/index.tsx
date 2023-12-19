"use client";

import { useEffect } from "react";

import { SettingsSessionsPanel } from "@/features/settings";
import { SessionList, useSettingsSessionStore } from "@/entities/session";
import { Loader } from "@/shared";
import cl from "./index.module.scss";

export const SettingsSessions = () => {
	const { fetchSessions, isSessionsLoading, sessions } =
		useSettingsSessionStore();

	useEffect(() => {
		fetchSessions();
	}, []); // eslint-disable-line

	if (isSessionsLoading) {
		return (
			<div className={cl.loader}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={cl.root}>
			<SettingsSessionsPanel />
			<SessionList sessions={sessions || []} />
		</div>
	);
};
