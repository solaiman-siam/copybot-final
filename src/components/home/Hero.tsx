import { imageProvider } from "../../utils/imageProvider";
import Copy from "../Copy";
import CommonButton from "../shared/CommonButton";
import Container from "../shared/Container";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { TShowModal } from "../../types/global.types";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";

function Hero({ showModal }: TShowModal) {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useGSAP(() => {
    const images = gsap.utils.toArray(".hero-images");

    if (images.length === 0) return;

    gsap.from(images, {
      translateX: 100,
      translateY: -40,
      duration: 2,
      filter: "blur(10px)",
      opacity: 0,
      stagger: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleGetDemo = () => {
    if (token) {
      navigate("/chatbot-home");
    } else {
      showModal();
    }
  };

  return (
    <div className="relative z-[1] mt-24 px-4 lg:px-0 md:mt-20">
      <Container>
        <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-20">
          <div>
            <div className="">
              <Copy delay={0.5}>
                <p className="font-medium text-description pb-2">
                  Turn Words Into Cash Flow - In Seconds.
                </p>

                <h1 className="md:text-[2.6rem] text-wrap text-[1.5rem] flex-wrap font-semibold leading-[38px]  md:leading-[60px]">
                  Generate scroll-stopping hooks, persuasive emails and{" "}
                  <span className="text-primary-btn">high-converting ad</span>{" "}
                  copy with Copybot.
                </h1>
                <p className=" w-11/12 hidden md:flex lg:w-10/12 text-description pt-4 text-base md:text-xl font-medium">
                  No guesswork. No burnout. Just instant, revenue ready
                  messaging that works.
                </p>
              </Copy>
              <p className=" w-11/12 fled md:hidden lg:w-10/12 text-description pt-4 text-base md:text-xl font-medium">
                No guesswork. No burnout. Just instant, revenue ready messaging
                that works.
              </p>
            </div>
            <div onClick={handleGetDemo} className="w-fit">
              <CommonButton className="rounded-full w-fit text-base lg:text-lg transition-all duration-300 shadow-primary-btn/40 hover:shadow-primary-btn/70 shadow-btn mt-8 md:px-12 px-10 font-medium py-2 md:py-3">
                Get Demo
              </CommonButton>
            </div>
            <div className="pt-12  flex items-center ">
              <div className="flex items-center ">
                <img
                  className="size-10 rounded-full  "
                  src="https://media.craiyon.com/2025-04-03/dvDZs3e9SViR5x3s-Qjazw.webp"
                  alt=""
                />
                <img
                  className="size-10 -translate-x-3 rounded-full  "
                  src="https://media.craiyon.com/2025-04-16/4yzQ6LuKQm-6BW896ZL4kw.webp"
                  alt=""
                />
                <img
                  className="size-10 -translate-x-6 rounded-full  "
                  src="https://media.craiyon.com/2025-04-15/hkJ6T1RTTnKGHXOE7rIMiA.webp"
                  alt=""
                />
              </div>

              <Copy delay={0.5}>
                <h4 className=" px-4 lg:text-nowrap text-wrap py-2 lg:py-2.5 md:text-base text-[11px] lg:flex hidden  rounded-full text-primary-btn font-medium border border-primary-btn/30">
                  Trusted by professional freelancers and business owners worldwide
                </h4>
              </Copy>
                <h4 className=" px-4 lg:text-nowrap text-wrap py-2 lg:hidden flex lg:py-2.5 md:text-base text-[11px]   rounded-full text-primary-btn font-medium border border-primary-btn/30">
                  Trusted by professional freelancers and business owners worldwide
                </h4>
            </div>
          </div>
          <div className="h-fit shadow-hero rounded-3xl shadow-primary-btn/10">
            <div className="bg-[#EAE4E2] relative h-[550px] md:h-[550px] rounded-3xl py-24 ">
              <img
                className="absolute hero-images right-0 z-[2] top-4 "
                src={imageProvider.HeroChatImage2}
                alt=""
              />
              <img
                className="absolute hero-images bottom-4 left-0 z-[4] "
                src={imageProvider.HeroChatImage1}
                alt=""
              />
              <img
                className="absolute hero-images  top-24 md:absolute -left-4 md:left-90  md:top-72 z-[8] "
                src={imageProvider.HeroReview}
                alt=""
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
