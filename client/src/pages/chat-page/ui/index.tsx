import dynamic from "next/dynamic";

const LazyChatPage = dynamic(() => import("./ChatPage"));

export default LazyChatPage;
