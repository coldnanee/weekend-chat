import { useGetSessions } from "../../lib/useGetSessions";

import cl from "./index.module.scss";

import { SessionItem } from "..";

export const SessionList = () => {
	const { data, isLoading, isError } = useGetSessions();

	if (isLoading) {
		return <h1>loading</h1>;
	}

	if (!data) {
		return <></>;
	}

	if (isError) {
		return <></>;
	}

	return (
		<ul className={cl.root}>
			{data.sessions.map((i) => (
				<SessionItem
					session={i}
					key={i._id}
				/>
			))}
		</ul>
	);
};
