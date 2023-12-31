import { AiOutlineLoading3Quarters } from "react-icons/ai";
import cl from "./index.module.scss";

export const Loader = ({ className }: { className?: string }) => {
	return (
		<div
			data-testid="loader"
			className={[cl.root, className].join(" ")}>
			<AiOutlineLoading3Quarters
				data-testid="loader-icon"
				color={"#a6abb7"}
				size={"40px"}
				className={cl.root__loader}
			/>
		</div>
	);
};
