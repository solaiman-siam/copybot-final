import { imageProvider } from "../../utils/imageProvider";
import ChatLoading from "../shared/ChatLoading";

const ResponseLoading = () => {
  return (
    <div className=" flex items-center gap-1">
      <div className="rounded-full w-8 h-8 bg-black/10 p-1">
        <img
          className="w-full h-full p-1"
          src={imageProvider.CopybotRed}
          alt="logo"
        />
      </div>
      <ChatLoading />
    </div>
  );
};

export default ResponseLoading;
