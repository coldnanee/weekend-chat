import { BsChatLeftTextFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

import type { TAsideImage } from "../types";

export const asideImagesDataArr: TAsideImage[] = [
	{
		text: "aside_all_chats",
		Picture: BsChatLeftTextFill,
		link: "/"
	},
	{
		text: "aside_support",
		Picture: FaQuestion,
		link: "/support"
	}
];
