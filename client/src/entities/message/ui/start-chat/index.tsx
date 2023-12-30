import { useI18nStore } from "@/shared";
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
