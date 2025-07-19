import { useEffect, useState } from "react";
import { useEmailUpdateMutation } from "../../redux/features/auth/profileApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { setNewEmail } from "../../redux/features/auth/authSlice";

interface Inputs {
  email: string;
  password: string;
}

function EmailUpdate() {

  const user = useAppSelector((state) => state.auth.user);
  const {email}  = user as Inputs
  const [togglePass, setTogglePass] = useState(false);
  const dispatch = useDispatch()

  const [toggle, setToggle] = useState<boolean>(false);
  const [updateEmail, { data, isError, isSuccess, isLoading, error }] =
    useEmailUpdateMutation();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { email: email },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const emailInfo = {
      email: data.email,
      current_password: data.password,
    };

    if (emailInfo) {
      // console.log(emailInfo);
      await updateEmail(emailInfo);
    }
  };

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
      dispatch(setNewEmail(data?.data))
    }
  }, [data, isError, isSuccess, error, dispatch]);

  const toggleIcon =
    "absolute size-5.5 cursor-pointer top-[70%] right-3 text-black/50 -translate-y-1/2";

  return (
    <div className="rounded-2xl mt-5 border border-black/10 p-5 lg:p-8">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="grid grid-cols-1 gap-5">
            <div className="flex items-end gap-4">
              <div className="col-span-1 flex-1 flex flex-col gap-1.5">
                <label className="font-medium" htmlFor="">
                  Email
                </label>
                <input
                  className="px-3 py-2   rounded-md bg-white focus:outline-none border  border-black/5"
                  type="text"
                  placeholder="sajid@gmail.com"
                  id="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="px-6 h-10 cursor-pointer rounded-md bg-black text-sm font-medium text-white"
                >
                  Change
                </button>
              </div>
            </div>
            <div
              className={`col-apan-1 ${
                toggle && "opacity-100 h-fit visible"
              } transition-all duration-200 opacity-0 relative h-0 invisible flex flex-col gap-1.5`}
            >
              <label className="font-medium" htmlFor="">
                To change email, type your password
              </label>
              <input
                className="px-3 py-2 rounded-md focus:outline-none  bg-white border border-black/5"
                type={!togglePass ? 'password' : 'text'}
                {...register("password", { required: true })}
                id="password"
                required
              />
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
          <div
            className={`${
              toggle && "opacity-100 h-full visible"
            }  opacity-0 h-0 invisible`}
          >
            <button disabled={isLoading} className="w-40 h-10 cursor-pointer flex justify-center items-center font-medium text-sm rounded-md bg-black text-white mt-6">
              {isLoading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailUpdate;
