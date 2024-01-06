import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazySettingsPage = dynamic(() => import("./SettingsPage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazySettingsPage;
