import { Loader } from "..";
import cl from "./index.module.scss";

export const DynamicPagesLoader = () => {
	return (
		<div
			className={cl.root}
			data-testid="dynamic-pages-loader">
			<Loader />
		</div>
	);
};
