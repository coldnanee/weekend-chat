import { BsChatLeftTextFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

import type { TAsideImage } from "../types";

export const asideImagesDataArr: TAsideImage[] = [
	{
		text: "All chats",
		Picture: BsChatLeftTextFill,
		link: "/"
	},
	{
		text: "Support",
		Picture: FaQuestion,
		link: "/support"
	}
];
