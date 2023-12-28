import { useBlacklistStore } from "../..";

import { BlacklistItem } from "../item";
import cl from "./index.module.scss";

export const BlacklistList = () => {
	const { users } = useBlacklistStore();

	return (
		<ul className={cl.root}>
			{users.map((u) => (
				<BlacklistItem
					user={u}
					key={u._id}
				/>
			))}
		</ul>
	);
};
