import type { TSession } from "../..";

import cl from "./index.module.scss";

import { SessionItem } from "..";

export const SessionList = ({ sessions }: { sessions: TSession[] }) => {
	if (!sessions) {
		return <></>;
	}

	return (
		<ul className={cl.root}>
			{sessions.map((i) => (
				<SessionItem
					session={i}
					key={i._id}
				/>
			))}
		</ul>
	);
};
