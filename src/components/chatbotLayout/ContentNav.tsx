import { Modal, Popover } from "antd";
import { content } from "../../utils/staticData";
import { AlignLeft, ChevronDown, Loader } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { getProfileImageUrl } from "../../utils/getAvatarImage";
import { setToggleSidebar } from "../../redux/features/navbar/navbarSlice";
import Swal from "sweetalert2";

function ContentNav() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation();
  const user = useAppSelector((state) => state.auth.user);
  const { avatar: profileImage, email } = user as {
    avatar: string;
    email: string;
  };


  const fullImageUrl = getProfileImageUrl(profileImage);

const handleLogout = async () => {
    // await logoutUser('')

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6A00",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      backdrop: true,
      width: "350px",
      allowOutsideClick: true,
      customClass: {
        popup: "custom-swal-font",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Show loading state while processing
          Swal.showLoading();

          await logout(""); // Not sure why you have this empty string parameter?
          dispatch(logoutUser());
          navigate("/login");
          Swal.fire({
            title: "Success!",
            text: "Logout Successful.",
            icon: "success",
            timer: 2000, // Auto close after 2 seconds
            showConfirmButton: false,
          });
        } catch (err : unknown) {
          
          const error = err instanceof Error ? err.message : "Failed to delete the item. Please try again."
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  const content2 = (
    <div className="p-2 rounded-xl   w-[220px] space-y-0">
      <h4 className="font-medium text-description pb-3 pl-3">
        {email ?? "unknown@gmail.com"}
      </h4>
      <hr className="text-black/10" />
      <Link to={"/upgrade-plan"}>
        <h4 className=" text-textPrimary mt-2 font-medium  cursor-pointer px-4 hover:bg-black/5 rounded-lg py-2">
          Upgrade plan
        </h4>
      </Link>
      <Link to={"settings"}>
        <h4 className="text-textPrimary font-medium  cursor-pointer px-4 hover:bg-black/5 rounded-lg py-2">
          Settings
        </h4>
      </Link>
      <hr className="text-black/10 my-2" />
      <h4
        onClick={handleLogout}
        className="text-textPrimary font-medium  cursor-pointer w-full flex justify-center items-center hover:bg-black/5 rounded-lg h-10"
      >
        {isLoading ? <Loader className="animate-spin size-6" /> : "Logout"}
      </h4>
    </div>
  );


  const handleSidebarOpen = () => {
    dispatch(setToggleSidebar())
  }
  

  return (
    <div className="lg:py-2 py-1 items-center lg:bg-transparent bg-[#F4EFEC] right-0 left-0 px-4 flex justify-between  border-black/10  ">
      <span onClick={handleSidebarOpen} className=" z-[100] lg:hidden flex relative" > <AlignLeft /></span>
      <Popover
        placement="bottomLeft"
        arrow={false}
        content={content}
        className="cursor-pointer hover:bg-black/5 px-3 py-2 lg:flex hidden transition-all duration-150 rounded-xl"
        style={{ borderRadius: "80px" }}
        trigger="click"
      >
        <h4 className="text-lg cursor-pointer font-medium w-fit text-textPrimary flex items-center gap-1">
          Copybot <ChevronDown className="size-5" />
        </h4>
      </Popover>

      <div className="flex items-center gap-3">
        {/* <button
          onClick={showModal}
          className="flex items-center hover:bg-black/5 transition-all duration-150 gap-2 rounded-full cursor-pointer ring ring-black/60 text-textPrimary font-medium  px-6 py-2"
        >
          {" "}
          <Upload className="size-4" /> <span>Share</span>
        </button> */}

        {/* <Popover
          placement="bottomLeft"
          arrow={false}
          content={content3}
          className="cursor-pointer hover:bg-black/5  transition-all duration-150 rounded-full"
          style={{ borderRadius: "80px" }}
          trigger="click"
        >
          <span className="py-2 px-2 rounded-full hover:bg-black/5 transition-all duration-150">
            <EllipsisVertical className="size-5.5   cursor-pointer" />
          </span>
        </Popover> */}

        <div className="p-1 hover:bg-black/5 transition-all duration-150 rounded-full ">
          <Popover
            placement="bottomLeft"
            arrow={false}
            content={content2}
            className="cursor-pointer hover:bg-black/5  transition-all duration-150 rounded-full"
            style={{ borderRadius: "80px" }}
            trigger="click"
          >
            <img
              className="rounded-full cursor-pointer object-cover size-10"
              src={
                fullImageUrl ||
                "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              }
              alt="profile_image"
            />
          </Popover>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        centered
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="h-full p-4">
          <h3 className="text-xl pb-4 font-semibold ">
            Share public link to chat
          </h3>
          <hr className="text-black/10" />

          <p className="pt-3 font-medium text-base">
            Your name, custom instructions, and any messages you add after
            sharing stay private.
          </p>
          <div className="flex rounded-full border-black/10 py-1 px-1  border mt-4 items-center gap-2">
            <input
              className="flex-1 px-4 text-base focus:border-none focus:outline-none font-medium"
              type="text"
              name=""
              id=""
            />
            <button className="h-full text-base bg-black cursor-pointer text-white px-4 py-2.5 rounded-full font-medium">
              Copy Link
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ContentNav;
