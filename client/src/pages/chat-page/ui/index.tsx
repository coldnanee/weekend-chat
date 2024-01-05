import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazyChatPage = dynamic(() => import("./ChatPage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazyChatPage;
