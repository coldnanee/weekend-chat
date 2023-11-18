import cl from "./index.module.scss";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loader = () => {
	return (
		<section className={cl.root}>
			<AiOutlineLoading3Quarters
				color={"#a6abb7"}
				size={"40px"}
				className={cl.root__loader}
			/>
		</section>
	);
};
