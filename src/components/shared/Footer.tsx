import { imageProvider } from "../../utils/imageProvider";
import Container from "./Container";
import { SlSocialYoutube } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";

import Copy from "../Copy";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSubscribeNewsLetterMutation } from "../../redux/features/subscribe/subscribeApi";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

type Inputs = {
  email: string;
};

function Footer() {
  // class variable
  const iconHover: string =
    "text-primary-btn hover:text-white transition-all duration-200 cursor-pointer size-6.5";
  const linkHover: string =
    "hover:text-primary-btn text-nowrap transition-all w-fit duration-200 cursor-pointer";

  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsLetterMutation();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userEmail = {email: data.email}
      if(userEmail) {
        const res = await subscribeNewsletter(userEmail);
        toast.success(res?.data?.message)
        reset()
      }
    } catch (error : unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Some thing went wrong'
      toast.error(errorMessage)
    }
  };

  
 
  return (
    <div className="bg-[#141413] lg:px-0 px-4 pt-16">
      <Container>
        <div className="grid gap-10 lg:gap-10 lg:grid-cols-12">
          <div className="col-span-4 w-full flex flex-col ">
            <img className="w-fit" src={imageProvider.CopybotLogo} alt="" />
            <div className="py-8">
              <p className="text-white w-10/12">Streamline your workflow with intelligent search and customizable AI prompts. Designed to boost productivity.
               </p>
            </div>
            <div className="flex flex-col ">
              <Copy delay={0.3}>
                <h3 className="pb-4 text-[17px] text-white">Contact Us</h3>
              </Copy>
              <Copy delay={0.3}>
                <h4 className="text-white">
                  <span className="text-primary-btn">Email</span>:{" "}
                  amanda@cashflowcopy.io
                </h4>
              </Copy>
            </div>
          </div>
          <Copy delay={0.3}>
            <div className="col-span-2 flex flex-col *:text-[17px] *:text-white space-y-2.5  w-full">
              <Link to={'#features'} className={linkHover}>Features</Link>
              <Link to={'#pricing'} className={linkHover}>Pricing</Link>
              <Link to={'#faq'} className={linkHover}>FAQ</Link>
            </div>
          </Copy>
          <Copy delay={0.3}>
            <div className="col-span-2 flex flex-col *:text-[17px] *:text-white space-y-2.5 w-full">
              <Link to={'/terms-service'} className={linkHover}> Terms of Service </Link>
              <Link to={'/privacy-policy'} className={linkHover}> Privacy Policy </Link>
              {/* <h3 className={linkHover}>Sign up</h3> */}
            </div>
          </Copy>
          <div className="col-span-4 w-full">
            <Copy delay={0.3}>
              <h3 className="text-white text-[17px]  pb-4">Get in Touch</h3>
            </Copy>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#F4EEEC] w-fit p-1 rounded-md flex items-center "
            >
              <input
                placeholder="Enter email"
                className="w-52 font-sm text-black focus:border-none focus:outline-0 px-4 py-2"
                type="email"
                {...register("email", { required: true })}
                id=""
              />
              <button
                disabled={isLoading}
                className="w-28 cursor-pointer bg-primary-btn text-white flex justify-center items-center h-10 font-medium rounded-sm "
              >
                {isLoading ? (
                  <Loader className="animate-spin size-6" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
            <Copy delay={0.3}>
              {" "}
              <h3 className="text-white text-[17px]  pt-6">Follow us</h3>
            </Copy>
            <div className="flex pt-3 items-center gap-3">
              {/* <Link to={""}>
                <RiTwitterXLine className={iconHover} />
              </Link> */}
              <a className="hover:translate-y-px transition-all duration-200" href="https://www.instagram.com/amandacatarzi/" target="_blank">
                <FaInstagram className={iconHover} />
              </a>
              <a className="hover:translate-y-px transition-all duration-200" href={"https://www.youtube.com/@AmandaCatarzi"} target="_blank">
                <SlSocialYoutube className={iconHover} />
              </a>
              {/* <Link to={""}>
                <RxDiscordLogo className={iconHover} />
              </Link> */}
              {/* <Link to={""}>
                <PiTelegramLogo className={iconHover} />
              </Link> */}
            </div>
          </div>
        </div>
        <Copy delay={0.3}>
          <h4 className="flex items-center justify-center w-full pt-10 lg:pt-20  text-center text-white/40 pb-6">
            Copyright Florida 2025. All rights reserved
          </h4>
        </Copy>
      </Container>
    </div>
  );
}

export default Footer;
