import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import CommonButton from "../../components/shared/CommonButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const [togglePass, setTogglePass] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // login
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(userInfo).unwrap();
      if (res?.status) {
        dispatch(
          setUser({ user: res?.data?.userData, token: res?.data?.token })
        );
        navigate("/chatbot-home");
        toast.success(res?.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Credentails not found";
      toast.error(errorMessage);
    }
  };

  // custom class
  const toggleIcon =
    "absolute size-5.5 cursor-pointer top-1/2 right-3 text-black/50 -translate-y-1/2";

  // google login
  const [googleLogin] = useGoogleLoginMutation();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      const googleInfo = {
        token: tokenResponse?.access_token,
        provider: "google",
      };
      try {
        const res = await googleLogin(googleInfo);

        if (res?.data?.status) {
          toast.success(res?.data?.message);
          navigate("/chatbot-home");
          setGoogleLoading(false);
          dispatch(
            setUser({
              user: { ...res?.data?.data?.userData, avatar: null },
              token: res?.data?.data?.token,
            })
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Someting went wrong";
        toast.error(errorMessage);
        setGoogleLoading(false);
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
                Welcome Back
              </h3>
              <p className="text-black/50 text-[17px] font-medium">
                Please login to continue to your account.
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
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Email
                    </label>
                  </div>
                </div>
                <div className="bg-white  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type={!togglePass ? "password" : "text"}
                      id="password"
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Password"
                      {...register("password", { required: true })}
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
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="remember-checkbox"
                      id="remember-checkbox"
                      className="accent-textPrimary"
                    />
                    <label
                      htmlFor="remember-checkbox"
                      className="text-black/50 select-none font-medium"
                    >
                      Keep me logged in
                    </label>
                  </div>
                  <Link to={"/reset-password"}>
                    <h4 className="text-primary-btn hover:underline font-medium">
                      Forgot Password?
                    </h4>
                  </Link>
                </div>

                <div aria-disabled={isLoading} className="pt-4">
                  <CommonButton
                    value={isLoading}
                    className={` w-full flex justify-center items-center font-medium text-[17px] h-12 rounded-lg `}
                  >
                    {isLoading ? (
                      <Loader className="animate-spin size-6" />
                    ) : (
                      "Sign in"
                    )}
                  </CommonButton>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex-1 border border-[#ededed]"></div>
                  <h4 className="font-medium text-black/40">or</h4>
                  <div className="flex-1 border-[0.5px] border-[#ececec]"></div>
                </div>

                <div>
                  <button
                    onClick={
                      handleGoogleLogin as unknown as React.MouseEventHandler<HTMLButtonElement>
                    }
                    type="button"
                    className="flex items-center border cursor-pointer font-medium text-[17px]  justify-center  border-black/10 rounded-lg w-full py-3 gap-3"
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
                  <span className="text-black/50">Don’t have an account?</span>
                  <Link to={"/signUp"}>
                    <h4 className="text-primary-btn hover:underline font-medium">
                      Sign up for free
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

export default Login;
