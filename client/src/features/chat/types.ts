import type { IconType } from "react-icons";

export type TChatOptionItem = {
	label: string;
	Picture: IconType;
	cb: () => void;
};
