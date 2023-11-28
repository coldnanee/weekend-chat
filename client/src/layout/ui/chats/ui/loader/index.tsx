import cl from "./index.module.scss";

import { Loader } from "@/shared";

export const ChatsLoader = () => {
	return (
		<div className={cl.root}>
			<Loader />
		</div>
	);
};
