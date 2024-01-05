import dynamic from "next/dynamic";

import { DynamicPagesLoader } from "@/shared";

const LazyRegistrationPage = dynamic(() => import("./RegistrationPage"), {
	loading: () => <DynamicPagesLoader />
});

export default LazyRegistrationPage;
