import { useI18nStore } from "@/features/i18n"; // eslint-disable-line boundaries/element-types
import cl from "./index.module.scss";

export const StartChat = ({ name }: { name: string }) => {
	const { translate } = useI18nStore();

	return (
		<section className={cl.root}>
			<p className={cl.root__text}>
				{translate("chat_say_hi")} {name}!
			</p>
		</section>
	);
};
