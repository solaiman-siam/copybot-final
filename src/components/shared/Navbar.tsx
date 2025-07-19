import { Link, useNavigate } from "react-router";
import type { TNavItems } from "../../types/navbar.type";
import { imageProvider } from "../../utils/imageProvider";
import Container from "./Container";
import Copy from "../Copy";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import type { TShowModal } from "../../types/global.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AlignLeft, Plus } from "lucide-react";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { logoutUser } from "../../redux/features/auth/authSlice";

function Navbar({ showModal }: TShowModal) {
  const auth = useAppSelector((state) => state.auth);
  const [isSidebar, setIsSidebar] = useState(false);
  const { token }: { token: string | null } = auth;

  // console.log(auth);
  const navItem: TNavItems[] = [
    {
      id: 1,
      name: "Features",
      link: "#features",
    },
    {
      id: 2,
      name: "Pricing",
      link: "upgrade-plan",
    },
    {
      id: 3,
      name: "FAQ",
      link: "#faq",
    },
  ];

  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      duration: 1.5,
      filter: "blur(5px)",
      stagger: 1,
      scale: 0.98,
    });
  });

  const handleGetStarted = () => {
    if (!token) {
      showModal();
    }
    if (token) {
      navigate("/chatbot-home");
    }
  };

  const body = document.getElementById("body");

  if (isSidebar) {
    body?.classList.add("overflow-hidden");
  } else {
    body?.classList.remove("overflow-hidden");
  }
  const smallNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      if (isSidebar) {
        mainContent.classList.add("blur-effect");
      } else {
        mainContent.classList.remove("blur-effect");
      }
    }
    return () => {
      mainContent?.classList.remove("blur-effect"); // Cleanup
    };
  }, [isSidebar]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        smallNavRef.current &&
        !smallNavRef.current.contains(event.target as Node)
      ) {
        setIsSidebar(false);
      }
    }

    // Only add the event listener if the sidebar is open
    if (isSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebar]); // Re-run effect when isSidebar changes

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
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

  // console.log(data);

  return (
    <div className="lg:py-8 py-0 flex justify-center items-center relative">
      <Container>
        <div
          ref={navRef}
          className="px-8 relative hidden z-[1] lg:flex  rounded-full  items-center justify-between bg-black py-4"
        >
          <Link to={"/"}>
            <img src={imageProvider.CopybotLogo} alt="" />
          </Link>
          <div className="flex items-center gap-1">
            {navItem.map((item) => (
              <Link key={item.id} to={item.link}>
                <Copy delay={0.5}>
                  <h4 className="cursor-pointer font-normal text-white px-3 py-2 ">
                    {item.name}
                  </h4>
                </Copy>
              </Link>
            ))}

            <div className="flex items-center gap-3 pl-3">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-6 font-medium cursor-pointer rounded-full border border-white/40  text-white py-2"
                >
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="px-6 font-medium cursor-pointer rounded-full border border-white/40  text-white py-2">
                    Sign in
                  </button>
                </Link>
              )}
              <div onClick={handleGetStarted}>
                <button className="px-4 font-medium shadow-primary-btn cursor-pointer border-white border rounded-full bg-white   py-2">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* navbar small screen */}
      <div
        ref={smallNavRef}
        className=" w-screen md:hidden mx-auto  z-[10] rounded-full px-1  fixed top-0  "
      >
        <div className="mt-1">
          <div className="bg-black flex justify-between rounded-full px-6 items-center h-14">
            <Link to={"/"}>
              <img className="w-28" src={imageProvider.CopybotLogo} alt="" />
            </Link>
            <div onClick={() => setIsSidebar(!isSidebar)}>
              <span className="px-2">
                <AlignLeft className="text-white" />
              </span>
            </div>
          </div>
        </div>
        {/* sidebar */}
        {
          <div
            className={` ${
              isSidebar ? "translate-x-0" : "-translate-x-80"
            } w-64 transition-all duration-300 absolute rounded-r-lg left-0 top-0 z-[100] px-4 py-4 bg-black min-h-screen`}
          >
            <span
              onClick={() => setIsSidebar(!isSidebar)}
              className="bg-white absolute top-3 right-3 p-1 rounded-full"
            >
              <Plus className="rotate-45 size-5" />
            </span>
            <Link to={"/"}>
              <img className="w-28" src={imageProvider.CopybotLogo} alt="" />
            </Link>
            <div className="flex pt-20 w-full items-center flex-col  gap-1">
              {navItem.map((item) => (
                <Link
                  onClick={() => setIsSidebar(false)}
                  key={item.id}
                  to={item.link}
                >
                    <h4 className="cursor-pointer font-normal text-white px-3 py-2 ">
                      {item.name}
                    </h4>
                </Link>
              ))}

              <div className="flex flex-col w-full  gap-3 pt-8 pl-3">
                <Link to={"/login"}>
                  <button className="w-full font-medium cursor-pointer rounded-full border border-white/40  text-white py-2">
                    Sign in
                  </button>
                </Link>
                <div onClick={handleGetStarted}>
                  <button className="w-full font-medium shadow-primary-btn cursor-pointer border-white border rounded-full bg-white   py-2">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Navbar;
