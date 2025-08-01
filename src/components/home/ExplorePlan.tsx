import { useState } from "react";
import Container from "../shared/Container";
import { Segmented } from "antd";
import { imageProvider } from "../../utils/imageProvider";
import Copy from "../Copy";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

function ExplorePlan() {
  type Align = "Monthly" | "Annually";

  const [alignValue, setAlignValue] = useState<Align>("Monthly");

  useGSAP(() => {
    const pricingCards = gsap.utils.toArray<HTMLDivElement>(".pricing-card");

    pricingCards.forEach((card, index) => {
      const fromX = index % 2 === 0 ? -70 : 70; // left for even, right for odd

      gsap.fromTo(
        card,
        {
          x: fromX,
          y: -50,
          filter: "blur(10px)",
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            once: true,
            start: "top 70%",
            toggleActions: "play none none none", // smooth in/out behavior
            onEnter: () => {
              // Remove no-hover class after animation completes
              setTimeout(() => {
                card.classList.remove("no-hover");
              }, 1200); // match duration
            },
          },
        }
      );
    });
  }, []);

  const inActivePlan = {
    planStatus: false,
    data: null,
  };

  const activePlan = {
    planStatus: true,
    planName: "monthly",
    startDate: "10-12-2025",
    endDate: "20-12-2025",
  };

  const planStatus = true;

  return (
    <div id="pricing" className="lg:py-24 py-10 px-4">
      <Container>
        <div className="flex relative items-center flex-col pb-8 gap-8">
          <Copy delay={0.3}>
            <h3 className="lg:text-4xl text-3xl text-center">Pricing Plan</h3>
          </Copy>
          <Segmented
            value={alignValue}
            size="large"
            style={{ marginBottom: 8 }}
            onChange={setAlignValue}
            options={["Monthly", "Annually"]}
            className="custom-segment "
          />
        </div>
        <div className="relative ">
          <div className=" grid-cols-1 lg:grid-cols-2 relative z-[1] gap-10 grid justify-center max-w-[800px] mx-auto">
            <div
              style={{ willChange: "transform, filter" }}
              className="h-full  hover:transition-all hover:duration-300  pricing-card  hover:translate-y-2 group no-hover hover:shadow-btn hover:shadow-primary-btn/30 bg-white border rounded-2xl w-full border-black/10"
            >
              <div className="lg:px-10 px-8 pt-8 lg:pt-10 pb-4 border-b border-black/10">
                <h3 className=" text-2xl lg:text-3xl pb-px font-semibold ">
                  Free
                </h3>
                <p>Try Copybot </p>
                <div className=" pt-4 lg:pt-6">
                  <h3 className=" text-3xl lg:text-4xl font-semibold">
                    $0<span className=" text-lg  font-medium"></span>
                  </h3>
                </div>
                <div className=" pb-4 mt-8 lg:mt-14">
                  <button disabled={planStatus} className="w-full disabled:cursor-not-allowed py-2 lg:py-2.5 rounded-lg border font-medium cursor-pointer border-black/40 ">
                    Stay on Free Plan
                  </button>
                </div>
              </div>
              <div className="lg:px-10 px-8 lg:pb-10 pb-10 space-y-3.5 lg:space-y-3 pt-6">
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>5 prompt generations per day</h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>Write, edit, and create content</h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>Chat on web, iOS, and Android</h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>Analyze text and images</h4>
                </div>
              </div>
            </div>
            <div
              style={{ willChange: "transform, filter" }}
              className="h-full no-hover hover:transition-all hover:duration-300 pricing-card  bg-white border hover:translate-y-2 group hover:shadow-btn hover:shadow-primary-btn/30 rounded-2xl w-full border-black/10"
            >
              <div className="lg:px-10 px-8 pt-8 lg:pt-10 pb-4 border-b border-black/10">
                <h3 className="lg:text-3xl text-2xl pb-px font-semibold ">
                  Pro
                </h3>
                <p>For Everyday Productivity</p>
                <div className="pt-6">
                  <h3 className="lg:text-4xl text-3xl font-semibold">
                    ${alignValue === "Monthly" ? "19.97" : "137"}
                    <span className=" text-lg  font-medium">
                      /{alignValue === "Monthly" ? "month" : "year"}
                    </span>
                  </h3>
                </div>
                <div>
                  {
                    <div className=" pb-4 mt-14">
                      {planStatus ? (
                        <button
                          disabled={planStatus}
                          className="w-full h-12 flex justify-center items-center  group-hover:shadow-primary-btn/80 transition-all duration-300 shadow-btn shadow-primary-btn/40 capitalize disabled:cursor-not-allowed bg-black text-white  rounded-lg border font-medium cursor-pointer border-black/40 "
                        >
                          {`${activePlan.planName} Plan Activated`}
                        </button>
                      ) : (
                        <Link to={"/upgrade-plan"}>
                          <div className=" pb-4 mt-8 lg:mt-14">
                            <button className="w-full py-2 lg:py-2.5  group-hover:shadow-primary-btn/80 transition-all duration-300 shadow-btn shadow-primary-btn/40  bg-black text-white  rounded-lg border font-medium cursor-pointer border-black/40 ">
                              Upgrade to Pro
                            </button>
                          </div>
                        </Link>
                      )}
                    </div>
                  }
                </div>
              </div>
              <div className="lg:px-10 px-8 lg:pb-10 pb-8 space-y-3.5 lg:space-y-3 pt-6">
                <h4 className="pb-2">Everything in Free, plus:</h4>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>
                    <span className="text-primary-btn font-medium">
                      Unlimited prompts:
                    </span>{" "}
                    Unlimited daily access to GPT tools
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>
                    <span className="text-primary-btn font-medium">
                      Premium prompts:
                    </span>{" "}
                    Prompt Vault (100+ custom prompts)
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>
                    <span className="text-primary-btn font-medium">
                      Bonus tools:
                    </span>{" "}
                    Cold DM writer, VSL script generator, Funnel copy creator
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>Ability to use more models</h4>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imageProvider.Circle} alt="" />
                  <h4>Analyze text and images</h4>
                </div>
              </div>
            </div>
          </div>
          <img
            src={imageProvider.HeroLine}
            className="top-0 w-full absolute"
            alt=""
          />
        </div>
      </Container>
    </div>
  );
}

export default ExplorePlan;
