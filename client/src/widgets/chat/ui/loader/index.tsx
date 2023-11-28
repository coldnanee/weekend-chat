import { Loader } from "@/shared";

import cl from "./index.module.scss";

export const ChatLoader = () => {
	return (
		<div className={cl.root}>
			<Loader />
		</div>
	);
};
