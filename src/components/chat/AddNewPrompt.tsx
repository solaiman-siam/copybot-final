import { Modal } from "antd";
import { Loader } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Inputs } from "../../types/global.types";
import { useEffect } from "react";
import { useStorePromptMutation } from "../../redux/features/auth/promptApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setStorePromptModal } from "../../redux/features/navbar/navbarSlice";

const AddNewPrompt = () => {
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const dispatch = useAppDispatch()
    const addCustomPromptModal = useAppSelector(state => state.navState.isStorePromptModal)

  const handleCustomPromptModalCancel = () => {
    dispatch(setStorePromptModal(false))
  };
 


    
    
    
      const [storePrompt, { data, isError, isSuccess, error, isLoading }] =
        useStorePromptMutation();

                const onSubmit: SubmitHandler<Inputs> = async (data) => {
          await storePrompt(data);
        };
    
      useEffect(() => {
        if (isError) {
          const errorData = error as FetchBaseQueryError;
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
    
        if (isSuccess && data) {
          reset();
          dispatch(setStorePromptModal(false))
          toast.success(data.message);
        }
      }, [data, isError, isSuccess, error, reset, dispatch]);


      

  
  return (
    <div>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={addCustomPromptModal}
        onCancel={handleCustomPromptModalCancel}
        footer={false}
        centered={true}
      >
        <h3 className="text-xl font-semibold pb-8">Add custom prompt</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-base" htmlFor="">
              Prompt name
            </label>
            <input
              className="w-full border px-4 py-2.5 rounded-md border-black/20"
              placeholder="Enter your prompt name"
              type="text"
              {...register("name", { required: true })}
              id=""
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-base" htmlFor="">
              Prompt
            </label>
            <input
              className="w-full border px-4 py-2.5 rounded-md border-black/20"
              type="text"
              placeholder="Enter your prompt here"
              {...register("description", { required: true })}
              id=""
            />
          </div>
          <div className="w-full flex pt-4">
            <button
              disabled={isLoading}
              className="px-6 cursor-pointer  h-10 w-32 text-nowrap flex justify-center items-center rounded-md bg-black text-white text-base font-medium"
            >
              {isLoading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                "Save Prompt"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewPrompt;