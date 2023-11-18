import { useSelector } from "react-redux";

import { TypedUseSelectorHook } from "react-redux";

import type { TAppStore } from "../..";

export const useAppSelector: TypedUseSelectorHook<TAppStore> = useSelector;
