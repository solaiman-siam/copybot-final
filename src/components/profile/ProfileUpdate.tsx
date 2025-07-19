// @ts-nocheck
import { DatePicker } from "antd";
import { Camera, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUpdateProfileMutation } from "../../redux/features/auth/profileApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateUser } from "../../redux/features/auth/authSlice";

import dayjs, { Dayjs } from 'dayjs';

import { getProfileImageUrl } from "../../utils/getAvatarImage";
interface Inputs {
  first_name: string;
  last_name: string;
  dob: string;
  avatar: string | null;
}

function ProfileUpdate() {
  const user = useAppSelector((state) => state.auth.user);
  const { first_name, last_name, dob, avatar: profileImage } = user as Inputs;
  

  const fullImageUrl = getProfileImageUrl(profileImage);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>();
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<File | null>();
  const { acceptedFiles, getInputProps } = useDropzone();

  // hooks
  const [updateProfile, { data, isError, isSuccess, isLoading, error }] =
    useUpdateProfileMutation();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { dob: dob, first_name: first_name, last_name: last_name },
  });

  // submit form
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data);
    const profileInfo = new FormData();
    profileInfo.append("avatar", acceptedFiles[0] || "");
    profileInfo.append("first_name", data.first_name);
    profileInfo.append("last_name", data.last_name);
    profileInfo.append("dob", date || dob);

    if (profileInfo) {
      await updateProfile(profileInfo);
    }
  };

  // handle sucess or failed
  useEffect(() => {
    if (isError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { data?: string })?.data || "Something went wrong"
      );
    }

    if (isSuccess && data) {
      toast.success(data.message);
      dispatch(updateUser(data.data));
    }
  }, [data, isError, isSuccess, error, dispatch]);

const handleDate = (date: Dayjs | null): void => {
  // dateString is already in YYYY-MM-DD format if you set the picker's format prop
  if (date && date.isValid()) {
    const formattedDate = date.format('YYYY-MM-DD');
    setDate(formattedDate);
  } else {
    setDate(''); // or your default value
  }
};

  // showImage
  useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      // console.log("Image file:", image); // Will show name, size, type
      setAvatar(image); // storing the File object
      const url = URL.createObjectURL(image);
      setImageUrl(url);
    }
  }, [acceptedFiles, avatar]);

  // console.log(fullImageUrl, imageUrl, "");

  return (
    <div className="rounded-2xl border border-black/10 p-5 lg:p-8">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="pb-8">
            <div className=" rounded-full relative  w-24 h-24 ">
              <label htmlFor="profile">
                <img
                  className="w-full h-full relative rounded-full z-[2] object-cover hover:scale-115 transition-all duration-150"
                  src={
                    imageUrl ||
                    fullImageUrl ||
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                  alt=""
                />
                <span className="absolute p-1.5 cursor-pointer ring ring-black/5 bg-white/70 rounded-full bottom-0 z-[4] right-0">
                  <Camera size={20} className="text-primary-btn" />
                </span>
              </label>
              <input
                className="invisible"
                type="file"
                id="profile"
                {...getInputProps()}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col gap-1.5">
              <label className="font-medium" htmlFor="">
                First Name
              </label>
              <input
                className="px-3 py-2   rounded-md bg-white focus:outline-none border  border-black/5"
                type="text"
                {...register("first_name")}
                placeholder="First name"
              />
            </div>
            <div className="col-apan-1 flex flex-col gap-1.5">
              <label className="font-medium" htmlFor="">
                Last Name
              </label>
              <input
                className="px-3 py-2 rounded-md focus:outline-none  bg-white border border-black/5"
                type="text"
                {...register("last_name")}
                placeholder="Last name"
              />
            </div>
            <div className="col-span-1 flex flex-col pt-2 gap-1.5">
              <label className="font-medium" htmlFor="">
                Date of Birth
              </label>
              {/* <DatePicker className="h-11 placeholder:text-black/50" style={{
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  boxShadow: "none",
                  backgroundColor: "#fff",
                }} format={"YYYY-MM-DD"} onChange={handleDate} /> */}
              <DatePicker
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  boxShadow: "none",
                  backgroundColor: "#fff",
                }}
                format={"YYYY-MM-DD"}
                className="h-11 placeholder:text-black/50"
                onChange={handleDate}
                defaultValue={dob && dayjs(dob) }
              />
            </div>
          </div>
          <div>
            <button
              disabled={isLoading}
              className="w-40 flex justify-center items-center h-10 cursor-pointer font-medium text-sm rounded-md bg-black text-white mt-8"
            >
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

export default ProfileUpdate;
