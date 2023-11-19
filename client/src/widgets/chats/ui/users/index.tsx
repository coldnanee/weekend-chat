"use client";

import cl from "./index.module.scss";

import { ChatsUser } from "../user";

import { fetchUsersByLogin } from "../../model/fetchUsersByLogin";

import { useQuery } from "@tanstack/react-query";

export const ChatsUsers = ({ login }: { login: string }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["home-users", { login }],
		queryFn: () => fetchUsersByLogin(login)
	});

	if (!data) {
		return <></>;
	}

	if (isLoading) {
		return <>loading</>;
	}

	return (
		<section className={cl.root}>
			<h2 className={cl.root__title}>Users:</h2>
			<ul className={cl.root__body}>
				{data.map((user) => (
					<ChatsUser
						key={user._id}
						user={user}
					/>
				))}
			</ul>
		</section>
	);
};
