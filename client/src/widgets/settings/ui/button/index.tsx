import { useI18nStore } from "@/shared";
import cl from "./index.module.scss";

export const SettingsSaveButton = ({ onClick }: { onClick?: () => void }) => {
	const { translate } = useI18nStore();

	return (
		<button
			onClick={onClick}
			className={cl.root}>
			{translate("save_button")}
		</button>
	);
};
