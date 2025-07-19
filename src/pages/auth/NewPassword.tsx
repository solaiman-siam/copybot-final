import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
import CommonButton from "../../components/shared/CommonButton";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";

import { useForm, type SubmitHandler } from "react-hook-form"
import { useSetNewPassMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Inputs = {
  password: string
  password_confirmation: string
}

function NewPassword() {
  const [togglePass, setTogglePass] = useState(false);
  const [togglePass2, setTogglePass2] = useState(false);
  const navigate = useNavigate()
  const [setNewPass, {data, error, isError, isLoading, isSuccess}] = useSetNewPassMutation();


  useEffect(() => {
    if(isError) {
      const errorData = error as FetchBaseQueryError
      toast.error((errorData.data as {message : string} )?.message || 'Something went wrong' )
    }
    if(isSuccess && data) {
      toast.success(data?.message)
      navigate('/login')
    }
  }, [data, isError, isSuccess, error, navigate])
      

 const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    const storedEmail = localStorage.getItem('resetEmail')
    const email = storedEmail ? JSON.parse(storedEmail) : null;
    const newPassInfo = {
      email: email,
      ...data
    }
    if(newPassInfo) {
      await setNewPass(newPassInfo)
    }
  }


  const toggleIcon =
    "absolute size-5.5 cursor-pointer top-1/2 right-3 text-black/50 -translate-y-1/2";
  return (
    <div className="py-8 lg:px-0 px-4 min-h-screen font-avant">
      <Container>
        <div>
          <Link to={"/"}>
            <img src={imageProvider.CopybotLogoBlack} alt="logo" />
          </Link>
          <div className="max-w-[450px] mx-auto mt-32 flex h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <h3 className="lg:text-3xl text-2xl text-center font-semibold pb-2">New Password</h3>
              <p className="text-black/50  text-center text-[17px] font-medium">
                Enter the new password
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full font-avant rounded-xl pt-8 ">
              <div className="space-y-6">
                <div className="bg-white  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type={!togglePass ? "password" : "text"}
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
                <div className="bg-white  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type={!togglePass2 ? "password" : "text"}
                      id="password_confirmation"
                      {...register("password_confirmation", { required: true })}
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password_confirmation"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Confirm Password
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
                <div className="pt-0">
                  <CommonButton value={isLoading}
                    className="w-full font-medium text-[17px] h-12 flex justify-center items-center rounded-lg "
                  >{isLoading ?   <Loader  className="animate-spin size-6" /> : 'Confirm password'}</CommonButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NewPassword;
