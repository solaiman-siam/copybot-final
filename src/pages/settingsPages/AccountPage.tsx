import { Popconfirm, type PopconfirmProps } from "antd";
import PasswordUpdate from "../../components/account/PasswordUpdate";
import DeleteAccount from "../../components/account/DeleteAccount";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";


function AccountPage() {

  const token = useAppSelector(state => state.auth.token)
  const [logout, {data, isSuccess, error, isError}] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  

  const confirm: PopconfirmProps["onConfirm"] = async () => {
    await logout(undefined).unwrap()

  };

    useEffect(() => {
      if (isError) {
        const errorData = error as FetchBaseQueryError;
        toast.error(
          (errorData.data as { message?: string })?.message || "Something went wrong"
        );
      }
      if (isSuccess && data) {
        toast.success(data.message);
        dispatch(logoutUser())
        navigate('/login')
      }
    }, [isError, isSuccess, error, data, dispatch, navigate]);

 

  return (
    <div>
      <div className="rounded-2xl border border-black/10 space-y-4 p-5 lg:p-8">
        <h3 className="text-xl font-medium"> Account</h3>
        <div className="flex items-center justify-between pb-4 ">
          <h4 className="font-medium text-black/70">Update your password</h4>
          <PasswordUpdate/>
        </div>
        <div className="flex items-center justify-between pb-4 ">
          <h4 className="font-medium text-black/70">Log out of all devices</h4>
          <Popconfirm
            title="Logout"
            description="Are you sure to logout from you account "
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
           <button className="border px-4 py-1.5 rounded-md border-black/50 font-medium text-textPrimary cursor-pointer">
            Log out
          </button>
          </Popconfirm>
        </div>
        {
          token && <div className="flex items-center justify-between ">
          <h4 className="font-medium text-black/70">Delete your account</h4>
            <DeleteAccount/>
        </div>
        }
      </div>
    </div>
  );
}

export default AccountPage;