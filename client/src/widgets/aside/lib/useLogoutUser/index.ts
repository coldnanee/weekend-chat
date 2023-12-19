import { useProfileStore } from "@/entities/profile";

export const useLogoutUser = () => {
	const { logoutUser } = useProfileStore();

	const handler = () => logoutUser();

	return handler;
};
