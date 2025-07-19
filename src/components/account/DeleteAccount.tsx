import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Modal } from "antd";
import { useDeleteAccountMutation } from "../../redux/features/auth/authApi";


interface Inputs {
  ticket: string;
}

const DeleteAccount = () => {
  const [deleteAccount, { data, isError, isSuccess, isLoading, error }] =
   useDeleteAccountMutation();
  const { register, formState: { errors }, reset, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.ticket === 'delete') {
      await deleteAccount('');
      reset()
      setIsModalOpen(false);
    }
    
  };

  // server route section

  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { data?: string })?.data || "Something went wrong"
      );
    }

    if (isSuccess && data) {
      toast.success(data.message);
      setIsModalOpen(false);
    }
  }, [data, isError, isSuccess, error]);

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

  return (
    <div>
      <button
        onClick={showModal}
        className="border px-4 py-1.5 rounded-md border-black/50 font-medium text-white bg-[#000] cursor-pointer"
      >
        Delete Account
      </button>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        onOk={handleOk}
        style={{ background: "gray" }}
      >
        <h3 className="text-xl font-medium pb-4 border-b border-black/10">
          {" "}
          Delete Account
        </h3>
        <p className="text-black/80 pt-4 font-medium text-base">
          Deleting your account will remove all of your information from our
          database. This cannot be undone.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-1 pt-8">
            <label
              className="text-description font-medium text-base"
              htmlFor=""
            >
              To confirm this, type “delete”
            </label>
            <div className="flex flex-col gap-1 ">
              <input
                className="w-full border-black/20 font-medium border px-2 flex-1 py-2.5 rounded-md"
                type="text"
                {...register("ticket", { required: true })}
                id=""
              />
              {errors.ticket && <p className="text-red-500">Text not matched</p>}
              <button className="px-6 h-12 flex justify-center items-center rounded-md cursor-pointer text-base font-medium bg-[#FE0032] text-white ">
                {isLoading ? (
                  <Loader className="animate-spin size-5" />
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DeleteAccount;