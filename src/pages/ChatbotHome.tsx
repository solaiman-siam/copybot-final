import TextArea from "antd/es/input/TextArea";
import { imageProvider } from "../utils/imageProvider";

import { HiOutlineArrowUp } from "react-icons/hi";
import { Check, Copy, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal, Popconfirm } from "antd";
import type { IPrompt, TSubcategories } from "../types/global.types";
import { BsExclamationCircle } from "react-icons/bs";
import { promtsCategory } from "../utils/staticData";
import WelcomeInterface from "../components/WelcomeInterface";
// import StreamInterface from "../components/StreamInterface";
import {
  useDeletePromptMutation,
  useGetpromptListQuery,
} from "../redux/features/auth/promptApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TypewriterResponse } from "./TypeSwiterResponse";
import ChatLoading from "../components/shared/ChatLoading";
import { useChatMutation } from "../redux/features/stream/chatApi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getProfileImageUrl } from "../utils/getAvatarImage";
import {
  setNewChatToHistory,
  setNewChat,
} from "../redux/features/stream/chatHistoryslice";
import HistoryCard from "../components/chat/HistoryCard";
import AddNewPrompt from "../components/chat/AddNewPrompt";
import { setStorePromptModal } from "../redux/features/navbar/navbarSlice";

function ChatbotHome() {
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  // const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const fileUrl = URL.createObjectURL(file);
  //     setImageUrl((prev) => [...prev, fileUrl]);
  //   }
  // };

  const handleRemoveImage = (value: number) => {
    const filteredImages = imageUrl.filter((_, index) => index !== value);
    setImageUrl(filteredImages);
    // console.log(value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(e.target.value);
    setPrompt(e.target.value);
  };
  const [copy, setCopy] = useState(false);
  const [activePromt, setActivePromt] = useState(0);
  const [prompt, setPrompt] = useState<string>("");
  const [activeSub, setActiveSub] = useState<number | null>();
  const [subCategory, setSubCategory] = useState<TSubcategories[]>([]);
  const [promptValue, setPromptValue] = useState<string>("");
  const [response, setResponse] = useState<string | null>("");
  const [waiting, setWaiting] = useState(false);
  const user = useAppSelector((state) => state?.auth?.user);
  const dispatch = useAppDispatch();
  const [finalPrompt, setFinalPrompt] = useState("");
  const [generateChat] = useChatMutation();
  const chatId = useAppSelector((state) => state?.chatHistory?.chatId);
  console.log('chatId', chatId);
  const newChat = useAppSelector((state) => state?.chatHistory?.newChat);
  const historyLoading = useAppSelector(
    (state) => state?.chatHistory?.historyLoading
  );
  const { avatar: profileImage } = user as { avatar: string };

  const fullImageUrl = getProfileImageUrl(profileImage);
  const [customPromptInterface, setCustomPromptInterface] =
    useState<boolean>(false);

  // category
  const handleCategory = (idx: number, category: string) => {
    setActivePromt(idx);
    setCustomPromptInterface(false);
    const subCategory = promtsCategory.filter(
      (item) => item.category === category
    );
    setSubCategory(subCategory[0].subcategories);
    setActiveSub(null);
    setPrompt("");
  };

  // subcategory
  const handlePromt = (index: number, item: string) => {
    setActiveSub(index);
    setPrompt(item);
    setCustomPromptInterface(false);
  };

  // usepromot
  const handleSelectPrompt = () => {
    if (prompt) {
      setPromptValue(prompt);
      setIsModalOpen(false);
      setCustomPromptInterface(false);
    }
  };


  // handleStream
  const handleStream = async () => {
    dispatch(setNewChat(false));
    {
      window.scrollTo(0, 0);
    }
    if (prompt) {
      const chatText = {
        message: prompt,
        chat_id: chatId,
      };
      setFinalPrompt(prompt);
      try {
        setWaiting(true);
        const aiResponse = await generateChat(chatText);
        setResponse(aiResponse?.data?.data?.ai);
        dispatch(setNewChatToHistory({response: aiResponse?.data?.data?.ai, prompt: aiResponse?.data?.data?.user , chatId: aiResponse?.data?.data?.chat_id}))
        setWaiting(false);
        setPromptValue("");
        setPrompt("");
        {
          return null;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };






  const { data: promptList } = useGetpromptListQuery(undefined, {
    pollingInterval: 30000,
  });

  const promptData = promptList?.data;

 

  const [customPromptIndex, setCustomPromptIndex] = useState<number>(0);

  const handleCustomPrompt = (prompt: string, index: number) => {
    setCustomPromptIndex(index);
    if (prompt) {
      setPrompt(prompt);
    }
  };

  // delete prompt
  const [
    deletePrompt,
    {
      data: deletedResponse,
      isError: deleteIsError,
      isSuccess: deleteIsSuccess,
      error: deleteError,
    },
  ] = useDeletePromptMutation();

  useEffect(() => {
    if (deleteIsError) {
      const errorData = deleteError as FetchBaseQueryError;
      const errorResponse = errorData.data as {
        data?: string;
        message?: string;
      };
      const errorMessage =
        errorResponse?.data ||
        errorResponse?.message ||
        "An unknown error occurred";
      toast.error(errorMessage);
    }

    if (deleteIsSuccess && deletedResponse) {
      toast.success(deletedResponse.message);
    }
  }, [deletedResponse, deleteIsError, deleteIsSuccess, deleteError]);

  const confirmDelete = async (id: number | string) => {
    try {
      await deletePrompt(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (historyLoading) {
    return (
      <div className="w-full h-[800px] flex justify-center items-center">
        <ChatLoading />
      </div>
    );
  }

  const handleCopyClick = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  return (
    <div className="py-14 flex items-center flex-col w-full ">
      {newChat ? (
        <WelcomeInterface />
      ) : (
        <div className=" justify-start mb-40 px-4 lg:px-24 w-full  lg:w-[1000px] mx-auto">
          <div className="font-avant w-full lg:w-[799px] mx-auto flex-col flex  ">
              <div className="flex justify-end items-start   gap-4">
                <h4 className="font-medium flex-1 capitalize">{finalPrompt}</h4>
                <div className="size-8 lg:size-10">
                  <img
                    className="w-8 h-8 rounded-full object-cover "
                    src={
                      fullImageUrl ||
                      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                    }
                    alt="profile"
                  />
                </div>
              </div>
            <div
              className={` flex justify-end  ${
                waiting ? "animate-pulse" : ""
              } gap-3  rounded-lg mt-4 w-full`}
            >
              <div className="h-full flex-1 mt-px w-full max-w-full overflow-hidden">
                {waiting ? (
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
                ) : (
                  <div>
                    {response && (
                      <>
                        <div className="bg-black/15 flex justify-end px-4 rounded-t-xl py-2 ">
                          <CopyToClipboard text={response && response}>
                            <h4
                              onClick={() => handleCopyClick()}
                              className="flex cursor-pointer items-center gap-2"
                            >
                              {copy ? (
                                <>
                                  <Check className="size-4.5" />
                                  <span className="text-sm font-medium">
                                    Copied
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-4.5" />
                                  <span className="text-sm font-medium">
                                    Copy
                                  </span>
                                </>
                              )}
                            </h4>
                          </CopyToClipboard>
                        </div>
                        <div className="font-medium bg-black/5 typewriter-text rounded-b-xl p-4 text-black/90">
                          <TypewriterResponse text={response} />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <HistoryCard fullImageUrl={fullImageUrl}/>
        </div>
      )}
      <div className=" rounded-2xl z-10 w-[92%] lg:w-[800px]    fixed border  border-black/10 overflow-hidden bottom-5  lg:bottom-16 ">
        <div className="bg-[#fff] shadow-lg px-2 pt-2 ">
          <div className="flex items-center gap-1  flex-wrap   w-full">
            {imageUrl.length > 0 &&
              imageUrl.map((img, index) => (
                <div key={index} className="relative  w-fit">
                  <img
                    className="w-16 h-16 border border-black/20 rounded-2xl object-cover"
                    src={img}
                    alt="preview"
                  />
                  <span
                    onClick={() => handleRemoveImage(index)}
                    className="bg-black cursor-pointer p-[3px] absolute top-1.5 right-1.5 rounded-full"
                  >
                    <X className="size-3.5 text-white" />
                  </span>
                </div>
              ))}
          </div>
          <TextArea
            style={{
              border: "none ",
              outline: "none",
              boxShadow: "none",
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "8px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (prompt) {
                  handleStream()
                }
              }
            }}
            value={promptValue}
            onChange={handleChangeInput}
            placeholder="Ask or search anything"
            autoSize={{ minRows: 2, maxRows: 10 }}
          />
        </div>
        <div className="bg-[#EBE8E6] flex items-center justify-between">
          <div className="flex items-center ">
            <button className="flex items-center cursor-pointer px-3 py-3 gap-1">
              <img src={imageProvider.Browse} alt="browser_icon" />
              <h4 onClick={showModal} className="font-medium text-textPrimary">
                Browse Prompt Library
              </h4>
            </button>
          </div>
          <div className=" pr-2">
            <button
             type="submit"
              onClick={handleStream}
              className="bg-black/80 cursor-pointer p-2.5 rounded-full text-white"
            >
              <HiOutlineArrowUp />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        width={900}
        onCancel={handleCancel}
        footer={false}
        className="custom-prompt-modal"
      >
        <div className="h-full">
          <div className="flex pb-6 px-4 pt-4 items-center gap-12 font-avant">
            <h3 className="text-2xl font-semibold">Prompt Library</h3>
            {/* <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-black/5">
              <Search className="text-[#9e9e9e] size-6" />
              <input
                placeholder="Try “Sales” or “Email”"
                className="focus:outline-none font-medium w-52 focus:border-none"
                type="text"
                name=""
                id=""
              />
            </div> */}
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-7 h-full divide-x border-t border-black/10 divide-black/10   ">
            {/* first column */}
            <div className="lg:col-span-2 col-span-2  p-3 max-h-[400px] overflow-y-auto">
              <div>
                <button
                  onClick={() => {
                    setCustomPromptInterface(true);
                    setPrompt("");
                  }}
                  className="text-textPrimary px-4 py-2 text-base cursor-pointer font-medium"
                >
                  My Prompt
                </button>
              </div>
              <hr className="mr-4  text-black/10" />
              <div className="overflow-y-auto px-1 pt-1 space-y-px ">
                {promtsCategory.map((category, index) => (
                  <h4
                    onClick={() => handleCategory(index, category.category)}
                    className={`${
                      activePromt === index ? "bg-black/5" : ""
                    } px-4 py-2 rounded-md text-base font-medium cursor-pointer  hover:bg-black/5`}
                  >
                    {category.category}
                  </h4>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 col-span-2  space-y-px p-3 pb-4 max-h-[400px]  overflow-y-auto">
              {customPromptInterface ? (
                <div>
                  <h4
                    onClick={() => dispatch(setStorePromptModal(true))}
                    className="flex px-2 lg:px-4  lg:text-nowrap cursor-pointer text-base leading-5 lg:leading-none items-center gap-4 lg:gap-2 font-medium"
                  >
                    <span className="p-1 bg-black rounded-full ">
                      <Plus size={17} className="text-white " />
                    </span>{" "}
                    Create Custom Prompt
                  </h4>
<AddNewPrompt />
                  <div className="pt-4">
                    {promptData?.map((prompt: IPrompt, idx: number) => (
                      <h4
                        className={`${
                          customPromptIndex === idx ? "bg-black/5" : ""
                        } px-4 py-2 rounded-md text-base font-medium cursor-pointer flex items-center justify-between  hover:bg-black/5`}
                      >
                        <span
                          onClick={() =>
                            handleCustomPrompt(prompt?.description, idx)
                          }
                        >
                          {prompt?.name?.length > 18
                            ? prompt?.name?.slice(0, 18) + "..."
                            : prompt?.name}
                        </span>
                        <Popconfirm
                          title="Delete the prompt"
                          description="Are you sure to delete this?"
                          onConfirm={() =>
                            prompt?.id && confirmDelete(prompt.id)
                          }
                          okText="Yes"
                          cancelText="No"
                        >
                          <span className="text-red-400 ">
                            <Trash2 className="size-4 text-black" />
                          </span>
                        </Popconfirm>
                      </h4>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {subCategory.map((category, index) => (
                    <h4
                      onClick={() => handlePromt(index, category.prompt)}
                      className={`${
                        activeSub === index ? "bg-black/5" : ""
                      } px-4 py-2 rounded-md text-base font-medium cursor-pointer  hover:bg-black/5`}
                    >
                      {category?.name}
                    </h4>
                  ))}
                </>
              )}
            </div>
            {/* middle column */}
            <div className="lg:col-span-3 col-span-4 p-3 flex flex-col   overflow-y-auto ">
              <div className=" flex flex-col flex-1">
                <div>
                  <p className="text-black/50 text-xs flex items-center gap-1 font-medium pb-3 ">
                    PREVIEW (WORKSPACE PROMPT){" "}
                    <span>
                      <BsExclamationCircle />
                    </span>
                  </p>
                </div>
                <div className="border flex-1 border-black/10 max-h-[290px] overflow-y-auto  rounded-lg p-4">
                  <p className="font-medium text-base text-textPrimary">
                    {prompt}
                  </p>
                </div>
              </div>
              {/* last column */}
              <div className="py-2 ml-auto ">
                <button
                  onClick={handleSelectPrompt}
                  className="px-4 py-2 rounded-md cursor-pointer w-fit ml-auto font-medium bg-black text-white mb-auto"
                >
                  Use Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChatbotHome;
