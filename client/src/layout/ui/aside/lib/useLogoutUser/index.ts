import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

import { logoutUser } from "@/entities/profile";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useLogoutUser = (router: AppRouterInstance) => {
	const dispatch = useAppDispatch();

	const handler = () => dispatch(logoutUser({ router }));

	return handler;
};
