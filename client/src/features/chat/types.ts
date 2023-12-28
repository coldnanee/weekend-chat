import type { IconType } from "react-icons";

import type { TUser } from "@/entities/user";

export type TChatOptionItem = {
	label: string;
	Picture: IconType;
	cb: (...params: (string | TUser)[]) => void; // eslint-disable-line no-unused-vars
};
