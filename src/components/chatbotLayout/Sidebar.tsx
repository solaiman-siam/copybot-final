import { Loader, Plus, Trash2, X } from "lucide-react";
import { imageProvider } from "../../utils/imageProvider";
import { Empty, Modal, Popconfirm, Progress, Skeleton } from "antd";
import { Link, useNavigate } from "react-router";
import {
  useCurrentPlanQuery,
  useLazyCancelPlanQuery,
  usePromptLimitQuery,
} from "../../redux/features/subscribe/subscribeApi";

import toast from "react-hot-toast";
import {
  useChatListQuery,
  useDeleteChatMutation,
  useLazyHistoryQuery,
} from "../../redux/features/stream/chatApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChatIdToPrompt,
  setChatToHistory,
  setHistoryLoading,
  setNewChat,
} from "../../redux/features/stream/chatHistoryslice";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setToggleSidebar } from "../../redux/features/navbar/navbarSlice";

type TChatList = {
  id: number;
  title: string;
};

type Inputs = {
  current_password: string;
};

function Sidebar() {
  // get chat list
  const { data: promptLimit, isLoading: promptLimitLoading } =
    usePromptLimitQuery(undefined);

  const promotLimitData = promptLimit?.data?.limit * 10;

  const { data: chatListData, isLoading: chatListLoading } =
    useChatListQuery(undefined);
  const toggleSidebar = useAppSelector((state) => state.navState.isSidebar);
  const dispatch = useAppDispatch();
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  // const currentPassword = useAppSelector(state => state.auth.user.)
  const chatList: TChatList[] = chatListData?.data || [];


  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState<boolean>(false);
  const [triggerHistory] =
    useLazyHistoryQuery();

  // history
  const handleGetHistory = async(id: number) => {
    if (!id) return;
    dispatch(setHistoryLoading(true));
    try{
      const res = await triggerHistory(id);
      // if(res?.data) {
        console.log( 'chatHistory',res?.data);
        dispatch(setChatToHistory(res?.data?.data?.data))
      dispatch(setHistoryLoading(false)); 
      dispatch(setChatIdToPrompt(id)); 
      dispatch(setNewChat(false))
      // }
      
    }catch(error) {
      console.log(error);
    }
  };

  const [deleteChat] = useDeleteChatMutation();

  const handleDeleteChat = async (chatId: number) => {
    if (chatId) {
      try {
        const res = await deleteChat(chatId);
        toast.success(res?.data?.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const navigate = useNavigate();

  // new chat
  const handleNewChat = () => {
    dispatch(setNewChat(true));
  };
  const { data: currentPlanInfo } = useCurrentPlanQuery("");

  const planInfo = currentPlanInfo?.data;

  const [
    cancelPlan,
    { data, isError: isCancelError, isSuccess, error, isLoading },
  ] = useLazyCancelPlanQuery();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const passInfo = {
      current_password: data?.current_password,
    };

    console.log(passInfo);
    if (passInfo) {
      await cancelPlan(passInfo);
    }
  };

  // server route section
  useEffect(() => {
    if (isCancelError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { message?: string })?.message ||
          "Something went wrong"
      );
    }
    if (isSuccess && data) {
      toast.success(data.message);
      setIsCancelSubscriptionModalOpen(false);
    }
  }, [data, isCancelError, isSuccess, error]);

  const handleCancel = () => {
    setIsCancelSubscriptionModalOpen(false);
  };

  const handleSidebarToggle = () => {
    dispatch(setToggleSidebar());
  };

  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sidebarRef}
      className={`lg:w-[350px] w-[300px] ${
        toggleSidebar ? "-translate-x-100" : "translatex-x-0"
      } z-[100] transition-all duration-300  flex left-0  fixed flex-col justify-between bg-[#F4EFEC] min-h-screen p-6`}
    >
      <span
        onClick={handleSidebarToggle}
        className="bg-black p-1.5 lg:hidden flex rounded-full text-white z-[200] absolute top-4 right-3"
      >
        <X className="size-4" />
      </span>
      <div>
        <Link to={"/"}>
          <img
            className="filter  scale-102"
            src={imageProvider.CopybotLogoGray}
            alt="logo-gray"
          />
        </Link>
        <div className="pt-12 space-y-4">
          <Link to={"/chatbot-home"} onClick={handleNewChat}>
            <div className="flex items-center gap-2 cursor-pointer w-fit ">
              <span className=" bg-textPrimary flex w-fit p-1 items-center justify-center rounded-full text-white">
                <Plus size={16} className="" />
              </span>
              <h4 className="text-lg font-medium text-textPrimary">New chat</h4>
            </div>
          </Link>
        </div>
        {/* recents */}
        <div className="pt-10">
          <h4 className="font-medium text-textPrimary text-lg border-b border-black/5 pb-2">
            Recents
          </h4>
          <div className="chatListScroll max-h-[420px] px-1 overflow-y-auto">
            {chatListLoading ? (
              <div className="pt-4">
                <Skeleton active />
              </div>
            ) : (
              <div className="pt-2 flex flex-col gap-1.5">
                {chatList?.length < 1 && (
                  <Empty
                    style={{ fontWeight: "500" }}
                    description={"No Chatlist Found"}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
                {chatList.map((chat: TChatList, index) => (
                  <div
                    key={chat.id}
                    className={`flex justify-between text-sm lg:text-base items-center  px-4 py-3 rounded-xl  ${
                      activeChatIndex === index
                        ? "bg-black/80 text-white"
                        : "bg-white text-black/80"
                    }`}
                  >
                    <h4
                      onClick={() => {
                        handleGetHistory(chat.id);
                        setActiveChatIndex(index);
                        navigate("/chatbot-home");
                      }}
                      className=" flex-1 capitalize cursor-pointer font-medium"
                    >
                      {chat?.title?.length <= 25
                        ? chat?.title
                        : chat?.title?.slice(0, 25) + "..."}
                    </h4>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => handleDeleteChat(chat?.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span className="hover:bg-black/5 w-6 transition-all duration-100 p-1 rounded-full">
                        <Trash2 className="size-4  cursor-pointer" />
                      </span>
                    </Popconfirm>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 scale-x-104 rounded-xl ">
        {promptLimitLoading ? (
          <div className="pt-2">
            <Skeleton children={8} active />
          </div>
        ) : (
          <div>
            <div>
              <div className="flex flex-col items-center gap-2">
                <h4 className="w-full gap-1 text-sm flex rounded-md h-8 lg:h-12 justify-center items-center lg:text-lg font-semibold text-black">
                  <span className="capitalize  ">{planInfo?.plan}</span>
                  <span>Plan Activated</span>
                </h4>
              </div>
              <button
                onClick={() => setIsCancelSubscriptionModalOpen(true)}
                className="w-full mt-4 bg-black h-10 text-sm lg:text-base lg:h-12 text-white rounded-md font-medium"
              >
                Cancel Plan
              </button>
            </div>
            {promptLimit?.data?.limit && (
              <div>
                <h3 className="text-lg font-semibold  pb-2">Free trial</h3>
                <div>
                  <div className="flex items-center translate-y-2 justify-between ">
                    <h4 className="font-medium text-lg text-textPrimary">
                      Limit
                    </h4>
                    <h4 className="font-medium text-lg text-textPrimary">
                      {promptLimit?.data?.limit}/5
                    </h4>
                  </div>
                  <Progress
                    strokeColor={promotLimitData === 100 ? "red" : "black"}
                    percent={promotLimitData}
                    showInfo={false}
                  />
                </div>
                <p className="text-black/80 text-sm pt-1 font-medium">
                  Get up to 3 free AI prompts daily. Need more? Upgrade to
                  unlock unlimited access and boost your productivity
                </p>
                <div className="flex mt-4 items-center cursor-pointer bg-black text-white px-4 py-3 rounded-lg justify-center gap-3">
                  <img
                    className="cursor-pointer"
                    src={imageProvider.UpgradeStar}
                    alt=""
                  />
                  <Link to={"/upgrade-plan"}>
                    <button className="font-medium cursor-pointer">
                      Upgrade your plan
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* cancel plan modal */}
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isCancelSubscriptionModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <h3 className="text-xl font-medium pb-8">Cancel Plan</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white flex items-center gap-1 rounded-lg">
            <input
              className="border h-11 px-4 focus:outline-none border-black/10 rounded-md flex-1"
              type="password"
              {...register("current_password", { required: true })}
              id=""
              placeholder="Enter your password"
            />
            <button
              className="w-40 bg-red-500 px-4 flex justify-center items-center cursor-pointer font-medium text-sm text-nowrap text-white rounded-md h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                "Cancel Plan"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Sidebar;
