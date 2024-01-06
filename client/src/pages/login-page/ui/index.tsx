import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazyLoginPage = dynamic(() => import("./LoginPage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazyLoginPage;
