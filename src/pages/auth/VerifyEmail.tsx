import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
import { Input } from "antd";
import type { OTPProps } from "antd/es/input/OTP";
import {
  useResendRegisterOtpMutation,
  useVerifyRegisterOtpMutation,
} from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Loader } from "lucide-react";

function VerifyEmail() {
  const navigate = useNavigate();
  const [verifyRegisterOtp, { data, isError, isLoading, isSuccess, error }] =
    useVerifyRegisterOtpMutation();

  const [
    resendOtp,
    {
      data: resendData,
      error: resendError,
      isSuccess: resendIsSuccess,
      isError: resendIsError,
      isLoading: resendIsLoading,
    },
  ] = useResendRegisterOtpMutation();

  const storedEmail = localStorage.getItem("signUpEmail");
  const email = storedEmail ? JSON.parse(storedEmail) : null;

  const MaskedEmail = ({ email }: { email: string }) => {
    const maskEmail = (email: string) => {
      const [name, domain] = email && email.split("@");
      if (name?.length <= 4) return email; 

      const masked =
        name?.slice(0, 2) + "*".repeat(name?.length - 4) + name?.slice(-2);
      return `${masked}@${domain}`;
    };

    return <p>{maskEmail(email)}</p>;
  };

  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData?.data as { message?: string })?.message ??
          "Something went wrong"
      );
    }
    if (isSuccess) {
      // console.log(data);
      toast.success(data?.message);
      navigate("/about-yourself");
    }
  }, [error, isError, isSuccess, data, navigate]);

  const onChange: OTPProps["onChange"] = async (text) => {
    const storedEmail = localStorage.getItem("signUpEmail");
    const email = storedEmail ? JSON.parse(storedEmail) : null;
    const otpInfo = {
      email: email,
      otp: text,
    };
    await verifyRegisterOtp(otpInfo);
  };

  useEffect(() => {
    if (resendIsError) {
      const errorData = resendError as FetchBaseQueryError;
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

    if (resendIsSuccess && resendData) {
      // console.log(resendData);
      toast.success(resendData.message);
    }
  }, [
    resendData,
    resendError,
    resendIsSuccess,
    resendIsError,
    resendIsLoading,
  ]);

  const handleResendOtp = async () => {
    const storedEmail = localStorage.getItem("signUpEmail");
    const email = storedEmail ? JSON.parse(storedEmail) : null;
    const userEmail = {
      email: email,
    };

    if (userEmail) {
      await resendOtp(userEmail);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className="py-8 lg:px-0 px-4 min-h-screen font-avant">
      <Container>
        <div>
          <Link to={"/"}>
            <img src={imageProvider.CopybotLogoBlack} alt="copybot-logo" />
          </Link>
          <div className="max-w-[450px] mx-auto mt-32 flex h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <h3 className="lg:text-3xl text-2xl text-center font-semibold pb-2 ">Please check your spam folder</h3>
              <div className="text-black/50 w-11/12 text-center text-[17px] font-medium">
                <span className="text-nowrap">
                  Enter the verification code we just sent to{" "}
                </span>
                <MaskedEmail email={email} />
              </div>
            </div>

            <form className="h-full w-full font-avant rounded-xl pt-8 ">
              <div className="space-y-6">
                {/* <div className="bg-white rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Enter your code here"
                    />
                    <label
                      htmlFor="code"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Code
                    </label>
                  </div>
                </div> */}

                {isLoading || resendIsLoading ? (
                  <h4 className="animate-pulse flex justify-center py-10 text-xl text-black/50 font-medium">
                    {isLoading && "Verifying..."}
                    {resendIsLoading && (
                      <Loader size={24} className="animate-spin" />
                    )}
                  </h4>
                ) : (
                  <div className="space-y-6 w-full">
                    <Input.OTP
                      length={4}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        gap: "14px",
                      }}
                      size="large"
                      formatter={(str) => str.toUpperCase()}
                      {...sharedProps}
                    />
                    {/* <CommonButton className="w-full flex justify-center items-center font-medium text-[17px] py-3 rounded-lg ">
                    {isLoading ?   <Loader  className="animate-spin size-6" /> : 'Verify'}
                  </CommonButton> */}
                    <h4 className=" mt-6  text-center ">
                      {" "}
                      <span className="text-black/70">
                        Didn’t receive code?
                      </span>{" "}
                      <span
                        onClick={handleResendOtp}
                        className="text-primary-btn cursor-pointer font-medium select-none hover:underline"
                      >
                        Resend
                      </span>
                    </h4>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default VerifyEmail;
