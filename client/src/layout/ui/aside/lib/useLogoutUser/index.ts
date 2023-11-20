import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";

import { logoutUser } from "@/entities/profile";

export const useLogoutUser = () => {
	const dispatch = useAppDispatch();

	const handler = () => dispatch(logoutUser());

	return handler;
};
