import dynamic from "next/dynamic";

const LazyResetPage = dynamic(() => import("./ResetPage"));

export default LazyResetPage;
