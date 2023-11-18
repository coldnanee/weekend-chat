import { usePathname, useRouter } from "next/navigation";

export const useSettingsNavigate = () => {
	const router = useRouter();
	const path = usePathname();

	const goToSettings = () => {
		localStorage.setItem("byButton", path || "");
		router.replace("/settings");
	};

	return { goToSettings };
};
