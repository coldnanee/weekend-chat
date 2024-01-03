import dynamic from "next/dynamic";

const LazyRegistrationPage = dynamic(() => import("./RegistrationPage"));

export default LazyRegistrationPage;
