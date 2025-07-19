import { Eye, EyeOff, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { usePasswordUpdateMutation } from "../../redux/features/auth/profileApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Modal } from "antd";

interface Inputs {
  password: string;
  current_password: string;
  password_confirmation: string;
}

function PasswordUpdate() {
  // state handling part
  const [togglePass, setTogglePass] = useState(false);
  const [togglePass2, setTogglePass2] = useState(false);
  const [togglePass3, setTogglePass3] = useState(false);
  const [updatePassword, { data, isError, isSuccess, isLoading, error }] =
    usePasswordUpdateMutation();

  const toggleIcon =
    "absolute size-5.5 cursor-pointer top-1/2 right-3 text-black/50 -translate-y-1/2";
  // state handling part

  // server route section

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data);

    const passwordInfo = {
      ...data,
    };

    if (passwordInfo) {
      await updatePassword(passwordInfo);
    }
  };

  // server route section

  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { message?: string })?.message ||
          "Something went wrong"
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
        className="border px-4 py-1.5 rounded-md border-black/50 font-medium text-textPrimary cursor-pointer"
      >
        Update Password
      </button>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <h3 className="text-xl font-medium pb-8"> Change Password</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-lg">
            <div className="relative bg-inherit">
              <input
                type={!togglePass ? "password" : "text"}
                id="newPassword"
                {...register("current_password", { required: true })}
                className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                placeholder="Password"
              />
              <label
                htmlFor="newPassword"
                className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
              >
                Old Password
              </label>
              {!togglePass ? (
                <EyeOff
                  onClick={() => setTogglePass(!togglePass)}
                  strokeWidth={1.3}
                  className={toggleIcon}
                />
              ) : (
                <Eye
                  onClick={() => setTogglePass(!togglePass)}
                  strokeWidth={1.3}
                  className={toggleIcon}
                />
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <div className="relative bg-inherit">
              <input
                type={!togglePass2 ? "password" : "text"}
                id="password"
                {...register("password", { required: true })}
                className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
              >
                New Password
              </label>
              {!togglePass2 ? (
                <EyeOff
                  onClick={() => setTogglePass2(!togglePass2)}
                  strokeWidth={1.3}
                  className={toggleIcon}
                />
              ) : (
                <Eye
                  onClick={() => setTogglePass2(!togglePass2)}
                  strokeWidth={1.3}
                  className={toggleIcon}
                />
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <div className="relative bg-inherit">
              <input
                type={!togglePass3 ? "password" : "text"}
                id="password_confirmation"
                {...register("password_confirmation", { required: true })}
                className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                placeholder="Password"
              />
              <label
                htmlFor="password_confirmation"
                className="absolute cursor-text left-0 text-sm -top-3  text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
              >
                Confirm Password
              </label>
              {!togglePass3 ? (
                <EyeOff
                  onClick={() => setTogglePass3(!togglePass3)}
                  strokeWidth={1.3}
                  className={toggleIcon}
                />
              ) : (
                <Eye
                  onClick={() => setTogglePass3(!togglePass3)}
                  strokeWidth={1.3}
                  className={toggleIcon}
                />
              )}
            </div>
          </div>
          <div>
            <button
              disabled={isLoading}
              className="w-40 h-10 flex cursor-pointer justify-center items-center rounded-md bg-black text-white font-medium "
            >
              {isLoading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PasswordUpdate;
