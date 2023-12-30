import { useProfileStore } from "@/entities/profile";
import { useSocketStore } from "@/shared";

export const logoutHandler = () => {
	useSocketStore.getState().socket.on("logout-client", () => {
		useProfileStore.getState().logoutUser();
	});
};
