import { useGSAP } from "@gsap/react";
import { imageProvider } from "../../utils/imageProvider";
import Copy from "../Copy";
import Container from "../shared/Container";
import gsap from "gsap";
import { Collapse, type CollapseProps } from "antd";
import { GoArrowUp } from "react-icons/go";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommonButton from "../shared/CommonButton";
import type { TShowModal } from "../../types/global.types";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";

gsap.registerPlugin(ScrollTrigger);

function MeetCopybot({ showModal }: TShowModal) {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <h3 className="text-lg font-semibold py-2">Fast Output</h3>
        </div>
      ),
      children: (
        <p className="text-description font-medium">
          Our AI engine is optimized for speed, just input your idea, and get
          conversion-ready copy almost instantly. Perfect for marketers on tight
          deadlines who need results fast.
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <h3 className="text-lg font-semibold py-2">
            Instant Prompt Templates
          </h3>
        </div>
      ),
      children: (
        <p className="text-description font-medium">
          Skip the guesswork, choose from a library of pre-built,
          high-converting prompt templates tailored for marketing, ads, blogs,
          and more. Just select, input, and generate in seconds.
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <h3 className="text-lg font-semibold py-2">
            Unlimited Access with Pro Subscription
          </h3>
        </div>
      ),
      children: (
        <p className="text-description font-medium">
          Upgrade to unlock unlimited prompt generations, priority performance,
          and premium features — built for creators who need more power, more
          often.
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          <h3 className="text-lg font-semibold py-2">Easy to Use</h3>
        </div>
      ),
      children: (
        <p className="text-description font-medium">
          A clean, intuitive interface that helps you focus on writing — not
          figuring out how the tool works. Just select a prompt, type your
          input, and let the AI do the rest. No tech skills required.
        </p>
      ),
    },
  ];

  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useGSAP(() => {
    const images = gsap.utils.toArray<HTMLElement>(".copybot-image");

    if (images.length === 0) return;

    images.forEach((img) => {
      gsap.from(img, {
        translateX: 100,
        translateY: -40,
        duration: 2,
        filter: "blur(10px)",
        opacity: 0,
        stagger: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 75%",
        },
      });
    });
  }, []);

  const handleTryItFree = () => {
    if (token) {
      navigate("/chatbot-home");
    } else {
      showModal();
    }
  };

  return (
    <div id="features" className="lg:pt-52 pt-20 px-4 lg:px-0 relative z-[8]">
      <Container>
        <div className="flex justify-center flex-col items-center gap-2">
          <Copy delay={0.3}>
            <h3 className="md:text-4xl text-[25px] text-center font-medium w-full md:w-9/12">
              Meet Cash Flow Copybot. Your AI-Powered Copywriter for
              Conversion-Ready Content.
            </h3>
          </Copy>

          <Copy delay={0.3}>
            <p className="text-center hidden md:flex w-11/12 lg:w-6/12 text-description font-medium pt-2 text-[15px]  lg:text-[17px] ">
              Smart, reliable, and secure, Copybot helps you craft
              high-performing copy instantly, so you can write less, sell more,
              and scale faster.
            </p>
          </Copy>
          <p className=" flex md:hidden text-center w-11/12 lg:w-6/12 text-description font-medium pt-2 text-[15px]  lg:text-[17px] ">
            Smart, reliable, and secure, Copybot helps you craft high-performing
            copy instantly, so you can write less, sell more, and scale faster.
          </p>
          <div onClick={handleTryItFree}>
            <CommonButton className="px-12 text-base lg:text-lg hover:shadow-primary-btn/60 cursor-pointer transition-all duration-300 mt-4 shadow-btn font-medium shadow-primary-btn/40 py-3 rounded-full text-white">
              Try It Out For Free
            </CommonButton>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center lg:gap-18  pt-20  lg:pt-14">
          <div className=" col-span-6  shadow-meetbot rounded-3xl shadow-primary-btn/10">
            <div className=" relative h-[360px] lg:h-[450px] rounded-3xl py-24 ">
              <img
                className="absolute copybot-image -right-2 lg:-right-14  rounded-xl z-8 bottom-20 "
                src={imageProvider.MetBotImage1}
                alt=""
              />
              <img
                className="absolute copybot-image lg:bottom-8 lg:-left-52 -left-8  z-4 "
                src={imageProvider.MetBotImage2}
                alt=""
              />
              <img
                className="absolute copybot-image object-contain md:object-cover  w-full h-full rounded-3xl right-0 top-0 overflow-hidden z-2 "
                src={imageProvider.MetBotImage3}
                alt=""
              />
            </div>
          </div>
          <div className="col-span-6">
            <Collapse
              key={"text-lg"}
              defaultActiveKey={"1"}
              expandIconPosition="end"
              style={{
                backgroundColor: "transparent",
                fontSize: "17px",
              }}
              className="!px-2 !lg:px-5 !py-20"
              bordered={false}
              expandIcon={({ isActive }) => (
                <div
                  className={`p-1 rounded-full border duration-300 border-black/10 transition-all ${
                    isActive ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <GoArrowUp size={18} className="text-black/80" />
                </div>
              )}
              accordion
              items={items}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MeetCopybot;
