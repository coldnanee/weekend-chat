import { HiMiniComputerDesktop } from "react-icons/hi2";
import { ImBlocked } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import type { TSettingsCategoriesItem } from "@/entities/settings";

export const settingsCategoriesArr: TSettingsCategoriesItem[] = [
	{
		label: "Account",
		Picture: MdAccountCircle
	},
	{
		label: "Sessions",
		Picture: HiMiniComputerDesktop
	},
	{
		label: "Black List",
		Picture: ImBlocked
	}
];
