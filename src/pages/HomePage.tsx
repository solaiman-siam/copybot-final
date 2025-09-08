import { Modal } from "antd";
import ClientReview from "../components/home/ClientReview";
import ExplorePlan from "../components/home/ExplorePlan";
import Faq from "../components/home/Faq";
import GoalSection from "../components/home/GoalSection";
import Hero from "../components/home/Hero";
import MeetCopybot from "../components/home/MeetCopybot";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { imageProvider } from "../utils/imageProvider";
import { useEffect, useState, type MouseEventHandler } from "react";
import { useNavigate } from "react-router";
import {
  useGoogleLoginMutation,
  useRegisterOtpMutation,
} from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Loader } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";

function HomePage() {
  const navigate = useNavigate();
  const [sendRegisterOtp, { data, error, isError, isSuccess, isLoading }] =
    useRegisterOtpMutation();
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { data: string })?.data || "Something went wrong"
      );
    }

    if (isSuccess && data) {
      toast.success(data?.message);
      navigate("/verify-email");
    }
  }, [data, error, isError, isSuccess, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;

    if (email) {
      const userEmail = {
        email: email,
      };
      await sendRegisterOtp(userEmail);
    }
  };

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
    <div className="relative   md:px-0">
      <Navbar showModal={showModal} />
      <div className="main-content ">
        <Hero showModal={showModal} />
        <MeetCopybot showModal={showModal} />
        <ExplorePlan />
        <ClientReview />
        <Faq />
        <GoalSection showModal={showModal} />
        <Footer />
        {/* background image */}
        <img
          className="absolute top-0 z-0 w-full  left-0 right-0"
          src={imageProvider.HeroLine}
          alt=""
        />
      </div>

      {/* modal */}
      <Modal
        className="rounded-3xl"
        open={isModalOpen}
        centered
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="p-4 space-y-5">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl text-center text-textPrimary font-medium">
              {" "}
              Welcome to Copybot
            </h3>
            <p className="font-medium text-description pt-3 text-center w-10/12">
              Please sign in with your email or create your free account
            </p>
          </div>
          <div className="">
            <button
              onClick={handleGoogleLogin as MouseEventHandler}
              className="flex items-center gap-3 justify-center rounded-md bg-white border border-black/10 w-full py-2.5"
            >
              {googleLoading ? (
                <Loader className="animate-spin size-6" />
              ) : (
                <div className="flex items-center gap-3">
                  <img src={imageProvider.GoogleIcon} alt="google-icon" />
                  <h4 className="font-medium text-base">Start with Google</h4>
                </div>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <hr className="flex-1 text-black/10" />
            <p className="font-medium text-description">
              Please sign in with your email
            </p>
            <hr className="flex-1 text-black/10" />
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                required
                className="px-4 py-3 rounded-md font-medium border border-black/10 w-full placeholder:font-medium text-base"
                placeholder="Work Email"
                type="email"
                name="email"
                id=""
              />
            </div>
            <div className="pt-8">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full h-12 flex justify-center items-center rounded-md bg-black text-white font-medium text-lg cursor-pointer"
              >
                {isLoading ? (
                  <Loader className="animate-spin size-6" />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <p className="text-center pt-2">
            By signing up, you agree to our{" "}
            <span className="text-primary-btn">Terms of Service</span> and{" "}
            <span className="text-primary-btn">Privacy Policy</span>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
