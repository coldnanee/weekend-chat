import { IoInformationCircleSharp } from "react-icons/io5";
import cl from "./index.module.scss";

export const ChatUserBlock = ({ text }: { text: string }) => {
	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<IoInformationCircleSharp
					color="#a9aeba"
					size="20px"
					className={cl.root__body__icon}
				/>
				<p className={cl.root__body__text}>{text}</p>
			</div>
		</div>
	);
};
