import { BsChatLeftTextFill } from "react-icons/bs";

import { FaQuestion } from "react-icons/fa";

import type { TAsideImage } from "./types";

export const asideImagesDataArr: TAsideImage[] = [
	{
		text: "All chats",
		Image: BsChatLeftTextFill,
		link: "/chats"
	},
	{
		text: "Support",
		Image: FaQuestion,
		link: "/support"
	}
];
