import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import type { THistory } from "../../redux/features/stream/chatHistoryslice";
const HistoryCard = ({ fullImageUrl, historyData } : {fullImageUrl: string | null , historyData: THistory[] }) => {

  const [copyIndex, setCopyIndex] = useState<number | null>();
  const [copy, setCopy] = useState(false);
  const handleCopyClick = (index: number | null) => {
    setCopyIndex(index);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };



  useEffect(() => {
     window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [historyData])



  return (
    <div className="pt-8">
      {[...historyData]?.reverse()?.map((history, index) => (
        <div key={history.id} className=" flex flex-col ">
           {history?.sender === "user" && (
            <div className="flex justify-end items-start pb-6 pt-10 gap-3">
              <p className="font-medium capitalize flex-1 text-black/90 text-base ">
                {history?.content}
              </p>
              <div>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={
                    fullImageUrl ||
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                  alt="profile"
                />
              </div>
            </div>
          )}
           {history?.sender === "ai" && (
            <div key={history.id}>
              <div className="bg-black/15 flex justify-end px-4  rounded-t-xl py-2 ">
                <CopyToClipboard text={`${history?.content}`}>
                  <h4
                    onClick={() => handleCopyClick(index)}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    {copyIndex === index && copy ? (
                      <>
                        <Check className="size-4.5" />{" "}
                        <span className="text-sm font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4.5" />{" "}
                        <span className="text-sm font-medium">Copy</span>{" "}
                      </>
                    )}
                  </h4>
                </CopyToClipboard>
              </div>
              <p className="font-medium bg-black/5 typewriter-text rounded-b-xl p-4 text-black/80">
                {history?.content}
              </p>
            </div>
          )}
         
         
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
