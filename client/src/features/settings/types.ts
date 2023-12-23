import type { IconType } from "react-icons";

export type TSettingsAvatarMenuItem = {
	label: string;
	cb?: () => void;
	Picture: IconType;
	labelId?: string;
};
