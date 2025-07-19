import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
import { Input } from "antd";
import type { OTPProps } from "antd/es/input/OTP";
import toast from "react-hot-toast";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Loader } from "lucide-react";

function VerifyOtp() {
  const navigate = useNavigate();

  const [verifyOtp, { data, error, isSuccess, isError, isLoading }] =
    useVerifyOtpMutation();
  const [
    resendOtp,
    {
      data: resendData,
      error: resendError,
      isSuccess: resendIsSuccess,
      isError: resendIsError,
      isLoading: resendIsLoading,
    },
  ] = useResendOtpMutation();

  const onChange: OTPProps["onChange"] = async (text) => {
    const storedEmail = localStorage.getItem("resetEmail");
    const email = storedEmail ? JSON.parse(storedEmail) : null;
    const otpInfo = {
      email: email,
      otp: text,
    };

    if (otpInfo) {
      await verifyOtp(otpInfo);
    }
  };

  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { message: string }).message ||
          "Something went wrong"
      );
    }

    if (isSuccess && data) {
      toast.success(data.message);
      navigate("/new-password");
    }
  }, [isSuccess, data, isError, error, navigate]);

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
    const storedEmail = localStorage.getItem("resetEmail");
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
            <img src={imageProvider.CopybotLogoBlack} alt="logo" />
          </Link>
          <div className="max-w-[450px] mx-auto mt-32 flex h-full flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <h3 className="lg:text-3xl text-2xl text-center font-semibold pb-2">Verify Otp</h3>
              <p className="text-black/50  text-center text-[17px] font-medium">
                Your code was sent to you via email
              </p>
            </div>
            {isLoading || resendIsLoading ? (
              <h4 className="animate-pulse py-10 text-xl text-black/50 font-medium">
                {isLoading && "Verifying..."}
                {resendIsLoading && (
                  <Loader size={24} className="animate-spin" />
                )}
              </h4>
            ) : (
              <form className="h-full w-full font-avant rounded-xl pt-8 ">
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
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default VerifyOtp;
