import cl from "./index.module.scss";

import { SessionItem } from "..";

import type { TSession } from "../../model/types";

export const SessionList = ({ sessions }: { sessions: TSession[] }) => {
	return (
		<ul className={cl.root}>
			{sessions.length > 0 ? (
				sessions.map((i) => (
					<SessionItem
						session={i}
						key={i._id}
					/>
				))
			) : (
				<div className={cl.root__body}>
					<h3 className={cl.root__body__title}>No other active sessions!</h3>
				</div>
			)}
		</ul>
	);
};
