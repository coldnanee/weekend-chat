import type { TChatOptionItem } from "../../types";

import cl from "./index.module.scss";

export const ChatMenuItem = ({
	item: { label, Picture, cb }
}: {
	item: TChatOptionItem;
}) => {
	return (
		<li
			onClick={cb}
			className={cl.root}>
			<Picture
				className={cl.root__image}
				color="#a9aeba"
				size="20px"
			/>
			<p className={cl.root__text}>{label}</p>
		</li>
	);
};
