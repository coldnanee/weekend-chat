import { BsChatLeftTextFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import type { TAsideImage } from "./types";

export const asideImagesDataArr: TAsideImage[] = [
	{
		text: "All chats",
		Image: BsChatLeftTextFill,
		link: "/"
	},
	{
		text: "Support",
		Image: FaQuestion,
		link: "/support"
	}
];
