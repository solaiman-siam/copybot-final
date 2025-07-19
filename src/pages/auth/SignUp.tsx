import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
import CommonButton from "../../components/shared/CommonButton";
import { useEffect, useState } from "react";
import {
  useGoogleLoginMutation,
  useRegisterOtpMutation,
} from "../../redux/features/auth/authApi";
import { Loader } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

function SignUp() {
  // const [togglePass, setTogglePass] = useState(false);

  // const toggleIcon =
  //   "absolute size-5.5 cursor-pointer top-1/2 right-3 text-black/50 -translate-y-1/2";

  const [sendRegisterOtp, { data, isError, isLoading, isSuccess, error }] =
    useRegisterOtpMutation();
  const navigate = useNavigate();
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const dispatch = useAppDispatch();

  interface Inputs {
    email: string;
  }

  const { register, handleSubmit } = useForm<Inputs>();

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
      // console.log(data);
      localStorage.setItem("signUpEmail", JSON.stringify(signUpEmail));
      toast.success(data.message);
      navigate("/verify-email");
    }
  }, [data, isError, isSuccess, error, navigate, signUpEmail]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSignUpEmail(data.email);
    const userEmail: Inputs = {
      email: data?.email,
    };
    if (userEmail) {
      await sendRegisterOtp(userEmail);
    }
  };

  // google login
  const [googleLogin, { isLoading: googleLoading }] = useGoogleLoginMutation();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleInfo = {
        token: tokenResponse?.access_token,
        provider: "google",
      };

      try {
        const res = await googleLogin(googleInfo);
        toast.success(res?.data?.message);
        navigate("/chatbot-home");
        dispatch(
          setUser({
            user: {...res?.data?.data?.userData, avatar: null},
            token: res?.data?.data?.token,
          })
        );
      } catch (err) {
        console.log(err);
      }
    },
  });

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
                Create your Account
              </h3>
              <p className="text-black/50 w-11/12 text-center text-[17px] font-medium">
                We recommend signing up with your work email to keep all your
                content in one place.
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
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Email
                    </label>
                  </div>
                </div>
                {/* password field */}
                {/* <div className="bg-white  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type={!togglePass ? "password" : "text"}
                      id="password"
                      name="password"
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Password
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
                </div> */}

                <CommonButton
                  value={isLoading}
                  className="w-full font-medium flex justify-center items-center text-[17px] h-12 rounded-lg "
                >
                  {isLoading ? (
                    <Loader className="animate-spin size-6" />
                  ) : (
                    "Continue"
                  )}
                </CommonButton>

                <div className="flex items-center pt-5 gap-2.5">
                  <div className="flex-1 border border-[#ededed]"></div>
                  <h4 className="font-medium text-black/40">or</h4>
                  <div className="flex-1 border-[0.5px] border-[#ececec]"></div>
                </div>

                <div>
                  <button
                    onClick={handleGoogleLogin as unknown as React.MouseEventHandler<HTMLButtonElement>}
                    type="button"
                    className="flex items-center border cursor-pointer font-medium text-[17px] justify-center  border-black/10 rounded-lg w-full py-3 gap-3"
                  >
                    {googleLoading ? (
                      <Loader className="animate-spin size-6" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <img src={imageProvider.GoogleIcon} alt="google-icon" />
                        <h4>Start with Google</h4>
                      </div>
                    )}
                  </button>
                </div>
                <div className="flex items-center font-medium justify-center gap-1">
                  <span className="text-black/50">
                    Already have an account?
                  </span>
                  <Link to={"/login"}>
                    {" "}
                    <h4 className="text-primary-btn hover:underline font-medium">
                      Log in
                    </h4>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
