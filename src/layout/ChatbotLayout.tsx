import { Outlet } from "react-router";
import ContentNav from "../components/chatbotLayout/ContentNav";
import Sidebar from "../components/chatbotLayout/Sidebar";

function ChatbotLayout() {
  return (
    <div className="flex relative font-avant ">
      <div className="w-[350px] lg:flex hidden ">
        <Sidebar />
      </div>
      <div className="left-0 absolute top-0 z-100 min-h-screen">
        <Sidebar />
      </div>
      <div className="flex-1  bg-[#FEFCFB] relative min-h-screen">
        <div className=" sticky z-[100] top-0 ">
          <ContentNav />
        </div>
        <div className="w-full " >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChatbotLayout;
