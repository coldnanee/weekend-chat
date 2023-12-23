import type { TSettingsAvatarMenuItem } from "../../types";
import cl from "./index.module.scss";

export const SettingsAvatarMenuItem = ({
	item: { Picture, label, cb, labelId }
}: {
	item: TSettingsAvatarMenuItem;
}) => {
	return (
		<li
			className={cl.root}
			onClick={cb}>
			<label htmlFor={labelId}>
				<Picture
					className={cl.root__picture}
					color="#a9aeba"
					size="20px"
				/>
				<p className={cl.root__text}>{label}</p>
			</label>
		</li>
	);
};
