import dynamic from "next/dynamic";

const LazyHomePage = dynamic(() => import("./HomePage"));

export default LazyHomePage;
