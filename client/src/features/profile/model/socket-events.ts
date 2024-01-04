import { useProfileStore } from "@/entities/profile";
import { useSocketStore } from "@/shared";

export class ProfileSocketEvents {
	static logoutHandler() {
		useSocketStore.getState().socket.on("logout-client", () => {
			useProfileStore.getState().logoutUser();
		});
	}
}
