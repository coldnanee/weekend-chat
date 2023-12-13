import type { TSettingsCategoriesItem } from "./types";

import { MdAccountCircle } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { ImBlocked } from "react-icons/im";

export const settingsCategoriesArr: TSettingsCategoriesItem[] = [
	{
		label: "Account",
		Image: MdAccountCircle
	},
	{
		label: "Sessions",
		Image: HiMiniComputerDesktop
	},
	{
		label: "Black List",
		Image: ImBlocked
	}
];
