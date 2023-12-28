import { useI18nStore } from "@/features/i18n";
import type { TSession } from "../../types";
import { SessionItem } from "../item";

import cl from "./index.module.scss";

export const SessionList = ({ sessions }: { sessions: TSession[] }) => {
	const { translate } = useI18nStore();

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
					<h3 className={cl.root__body__title}>{translate("sessions_none")}</h3>
				</div>
			)}
		</ul>
	);
};
