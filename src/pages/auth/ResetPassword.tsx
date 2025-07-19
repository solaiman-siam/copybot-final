import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
import CommonButton from "../../components/shared/CommonButton";

import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useForgetPassMutation } from "../../redux/features/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";


type Inputs = {
  email: string;
};

function ResetPassword() {
  const [forgetPass, {data, error, isError, isLoading, isSuccess}] = useForgetPassMutation()
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState<string>('')

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  // console.log(data);

  useEffect(() => {
    if(isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error((errorData.data as {data: string })?.data || 'Something went wrong' )
    }

    if(isSuccess && data){
      toast.success(data?.message)
    localStorage.setItem('resetEmail', JSON.stringify(resetEmail))
      
      // console.log(data);
      navigate('/verify-otp')
    }
  }, [isSuccess, data, navigate, isError, error, resetEmail]) 

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setResetEmail(data.email)
    const userEmail = {
      email: data.email
    }
    await forgetPass(userEmail);
    
  };

  return (
    <div className="py-8 lg:px-0 px-4 min-h-screen font-avant">
      <Container>
        <div>
          <Link to={"/"}>
            <img src={imageProvider.CopybotLogoBlack} alt="logo" />
          </Link>
          <div className="max-w-[450px] mx-auto mt-32 flex h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <h3 className="lg:text-3xl text-2xl text-center font-semibold pb-2">
                Reset Your Password
              </h3>
              <p className="text-black/50  text-center text-[17px] font-medium">
                Enter your email and we’ll send you a reset link.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full w-full font-avant rounded-xl pt-8 "
            >
              <div className="space-y-6">
                <div className="bg-white  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: true })}
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Enter your code here"
                    />
                    <label
                      htmlFor="email"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <CommonButton value={isLoading} className="w-full font-medium text-[17px] items-center h-12 flex justify-center rounded-lg ">
                  {isLoading ? (
                    <Loader className="animate-spin size-6" />
                  ) : (
                    "Reset password"
                  )}
                </CommonButton>
                <Link to={"/login"} className="">
                  <h4 className="text-primary-btn mt-3 mx-auto w-fit hover:underline text-center cursor-pointer font-medium select-none">
                    Return to login
                  </h4>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ResetPassword;
