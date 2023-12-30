import { useI18nStore } from "@/shared";
import cl from "./index.module.scss";

export const UserNotFound = () => {
	const { translate } = useI18nStore();

	return (
		<section className={cl.root}>
			<p className={cl.root__text}>{translate("chat_user_not_found")}</p>
		</section>
	);
};
