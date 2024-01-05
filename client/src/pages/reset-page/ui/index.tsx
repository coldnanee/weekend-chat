import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazyResetPage = dynamic(() => import("./ResetPage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazyResetPage;
