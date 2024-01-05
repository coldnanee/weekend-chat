import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazySupportPage = dynamic(() => import("./SupportPage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazySupportPage;
