import { BsChatLeftTextFill, BsSearch } from "react-icons/bs";

import type { TAsideImage } from "./types";

export const asideImagesDataArr: TAsideImage[] = [
	{
		text: "All chats",
		Image: BsChatLeftTextFill,
		link: "/chats"
	},
	{
		text: "Search",
		Image: BsSearch,
		link: "/search"
	}
];
