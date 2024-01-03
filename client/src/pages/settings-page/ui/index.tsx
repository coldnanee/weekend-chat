import dynamic from "next/dynamic";

const LazySettingsPage = dynamic(() => import("./SettingsPage"));

export default LazySettingsPage;
