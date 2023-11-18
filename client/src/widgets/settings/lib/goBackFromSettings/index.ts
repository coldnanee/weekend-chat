import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const goBackFromSettings = (router: AppRouterInstance) => {
	const pageBefore = localStorage.getItem("byButton");

	if (!pageBefore) {
		return router.replace("/");
	}
	router.replace(pageBefore);
	localStorage.removeItem("byButton");
};
