import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazyHomePage = dynamic(() => import("./HomePage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazyHomePage;
