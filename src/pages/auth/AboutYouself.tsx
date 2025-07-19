import { Link, useNavigate } from "react-router";
import Container from "../../components/shared/Container";
import { imageProvider } from "../../utils/imageProvider";
import CommonButton from "../../components/shared/CommonButton";
import { DatePicker, type DatePickerProps } from "antd";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

type Inputs = {
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  // role: string,
};

function AboutYourself() {
  const [dob, setDob] = useState<string | string[]>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerUser, { data, isError, isSuccess, isLoading, error }] =
    useRegisterMutation();

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setDob(dateString);
  };

  const [togglePass, setTogglePass] = useState(false);
  const [togglePass2, setTogglePass2] = useState(false);

  const toggleIcon =
    "absolute size-5.5 cursor-pointer top-1/2 right-3 text-black/50 -translate-y-1/2";

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { data: string })?.data || "Something went wrong"
      );
    }
    if (isSuccess) {
      // console.log(data);
      toast.success(data?.message);
      navigate("/chatbot-home");
    }
  }, [data, error, isError, isSuccess, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const storedEmail = localStorage.getItem("signUpEmail");
    const email = storedEmail ? JSON.parse(storedEmail) : null;


    // @ts-ignore
    const [month, day, year] = dob.split("-");
    const backendFormattedDate = `${year}-${month}-${day}`;

    const userInfo = {
      ...data,
      dob: dob && backendFormattedDate,
      email: email,
    };

    console.log(userInfo);

    const res = await registerUser(userInfo).unwrap();
    dispatch(setUser({ user: res?.data?.userData, token: res?.data?.token }));
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
                Tell us about you
              </h3>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full w-full font-avant rounded-xl pt-8 "
            >
              <div className="space-y-2 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="text"
                      id="first_name"
                      {...register("first_name", { required: true })}
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder=""
                    />
                    <label
                      htmlFor="first_name"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      First Name
                    </label>
                  </div>
                </div>
                <div className="bg-white  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="text"
                      id="last_name"
                      {...register("last_name", { required: true })}
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder=""
                    />
                    <label
                      htmlFor="last_name"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Last Name
                    </label>
                  </div>
                </div>
                <DatePicker
                  placeholder="MM/DD/YYYY"
                  style={{
                    padding: "10px 14px",
                    marginTop: "0px",
                    color: "#595959",
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  className="col-span-2 custom-date "
                  format={"MM-DD-YYYY"}
                  onChange={onChange}
                />
                {/* password field */}
                <div className="bg-white col-span-2 pt-2 rounded-lg">
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
                {/* password field */}
                <div className="bg-white col-span-2 rounded-lg">
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
                {/* <div className="bg-white col-span-2  rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      type="date"
                      id="last_name"
                      name="last_name"
                      className="peer bg-transparent h-11 w-full font-medium rounded-lg  text-black/70  placeholder-transparent ring px-4 ring-black/10 focus:ring-primary-btn  focus:outline-none"
                      placeholder="Enter your code here"
                    />
                    <label
                      htmlFor="last_name"
                      className="absolute cursor-text left-0 -top-3 text-sm text-black/50 font-medium bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-primary-btn peer-focus:text-sm transition-all"
                    >
                      Date of Birth
                    </label>
                  </div>
                </div> */}
                <div className="pt-2 flex justify-center items-center w-full col-span-2">
                  <CommonButton
                    value={isLoading}
                    className="w-full flex justify-center font-medium items-center text-[17px] h-12 rounded-lg "
                  >
                    {isLoading ? (
                      <Loader className="animate-spin size-6" />
                    ) : (
                      "Register"
                    )}
                  </CommonButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutYourself;