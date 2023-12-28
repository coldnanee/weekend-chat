"use client";

import { useEffect } from "react";

import { useBlacklistStore } from "@/features/black-list";
import { BlacklistList } from "@/features/black-list";

import { Loader } from "@/shared";
import cl from "./index.module.scss";

export const SettingsBlackList = () => {
	const { fetchBlackList, isBlacklistLoading } = useBlacklistStore();

	useEffect(() => {
		fetchBlackList();
	}, []); // eslint-disable-line

	if (isBlacklistLoading) {
		return (
			<div className={cl.loader}>
				<Loader />
			</div>
		);
	}

	return <BlacklistList />;
};
