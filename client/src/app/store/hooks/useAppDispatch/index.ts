import { useDispatch } from "react-redux";

import type { TAppDispatch } from "../..";

export const useAppDispatch: () => TAppDispatch = useDispatch;
