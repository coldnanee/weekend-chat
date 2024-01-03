import dynamic from "next/dynamic";

const LazyLoginPage = dynamic(() => import("./LoginPage"));

export default LazyLoginPage;
