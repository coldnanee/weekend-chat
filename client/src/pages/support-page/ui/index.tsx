import dynamic from "next/dynamic";

const LazySupportPage = dynamic(() => import("./SupportPage"));

export default LazySupportPage;
