import { HiMiniComputerDesktop } from "react-icons/hi2";
import { ImBlocked } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import type { TSettingsCategoriesItem } from "@/entities/settings";

export const settingsCategoriesArr: TSettingsCategoriesItem[] = [
	{
		label: "categories_account",
		Picture: MdAccountCircle
	},
	{
		label: "categories_sessions",
		Picture: IoMdSettings
	},

	{
		label: "categories_general",
		Picture: HiMiniComputerDesktop
	},
	{
		label: "categories_black_list",
		Picture: ImBlocked
	}
];
