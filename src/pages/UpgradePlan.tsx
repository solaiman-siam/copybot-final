import { Segmented } from "antd";
import Container from "../components/shared/Container";
import { imageProvider } from "../utils/imageProvider";
import { useState } from "react";
import { Loader, X } from "lucide-react";
import { Link } from "react-router";
import { useCurrentPlanInfoQuery, useUpgradePlanMutation } from "../redux/features/subscribe/subscribeApi";
import toast from "react-hot-toast";

function UpgradePlan() {
  type Align = "Monthly" | "Annually";
  const [alignValue, setAlignValue] = useState<Align>("Monthly");
  const [upgradePlan, { isLoading }] = useUpgradePlanMutation();


// get chat list
  const { data: currentPlanInfo } =
    useCurrentPlanInfoQuery(null);

    console.log(currentPlanInfo?.data);

  const handleUpgradeSubscription = async () => {
    if (alignValue) {
      try {
        if (alignValue) {
          const planDuration = { plan: alignValue.toLowerCase() };
          const res = await upgradePlan(planDuration);
          // console.log(res?.data);
          // toast.success(res?.data?.message)
          if(res?.data?.data) {
            window.location.href = res?.data?.data
          }
        }
      } catch (err) {
        console.log(err);
        toast.error('something went wrong')
      }
    }
  };




  



  return (
    <div className="min-h-screen px-4 py-20 lg:py-0 lg:px-0 relative font-avant flex items-center justify-center">
      <div className=" w-full">
        <Container>
          <div className="flex relative items-center flex-col pb-8 gap-10 lg:gap-8">
            <h3 className=" text-3xl lg:text-4xl text-center font-medium">
              Upgrage Your Plan
            </h3>
            <Segmented
              value={alignValue}
              size="large"
              style={{ marginBottom: 8 }}
              onChange={setAlignValue}
              options={["Monthly", "Annually"]}
              className="custom-segment"
            />
          </div>
          <div className="relative">
            <div className=" grid-cols-1 lg:grid-cols-2 relative z-[1] gap-10 grid justify-center max-w-[800px] mx-auto">
              <div className="h-full hover:translate-y-2 group hover:shadow-btn hover:shadow-primary-btn/30 transition-all duration-300 bg-white border rounded-2xl w-full border-black/10">
                <div className="px-10 pt-10 pb-4 border-b border-black/10">
                  <h3 className="text-3xl pb-px font-semibold ">Free</h3>
                  <p>Try Copylot </p>
                  <div className="pt-6">
                    <h3 className="text-4xl font-semibold">
                      $0<span className=" text-lg  font-medium"></span>
                    </h3>
                  </div>
                  <div className=" pb-4 mt-14">
                    <button disabled={currentPlanInfo?.data?.subscription !== 'free'} className="w-full disabled:cursor-not-allowed py-2.5 rounded-lg border font-medium cursor-pointer border-black/40 ">
                      Stay on Free Plan
                    </button>
                  </div>
                </div>
                <div className="px-10 pb-10 space-y-3 pt-6">
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
              <div className="h-full  bg-white border hover:translate-y-2 group hover:shadow-btn hover:shadow-primary-btn/30 transition-all duration-300 rounded-2xl w-full border-black/10">
                <div className="px-10 pt-10 pb-4 border-b border-black/10">
                  <h3 className="text-3xl pb-px font-semibold ">Pro</h3>
                  <p>For Everyday Productivity</p>
                  <div className="pt-6">
                    <h3 className="text-4xl font-semibold">
                      ${alignValue === "Monthly" ? "19.97" : "137"}
                      <span className=" text-lg  font-medium">/{alignValue === "Monthly" ? "month" : "year"}</span>
                    </h3>
                  </div>
                  <div className=" pb-4 mt-14">
                    {
                      currentPlanInfo?.data?.subscription !== 'free' ? <button disabled={currentPlanInfo?.data?.subscription !== 'free'}
                      onClick={handleUpgradeSubscription}
                      className="w-full h-12 flex justify-center items-center  group-hover:shadow-primary-btn/80 transition-all duration-300 shadow-btn shadow-primary-btn/40 capitalize disabled:cursor-not-allowed bg-black text-white  rounded-lg border font-medium cursor-pointer border-black/40 "
                    >
                    
                        {
                          `${currentPlanInfo?.data?.subscription} Plan Activated`
                        }
                     
                    </button> : <button
                      onClick={handleUpgradeSubscription}
                      className="w-full h-12 flex justify-center items-center  group-hover:shadow-primary-btn/80 transition-all duration-300 shadow-btn shadow-primary-btn/40  bg-black text-white  rounded-lg border font-medium cursor-pointer border-black/40 "
                    >
                      {isLoading ? (
                        <Loader className="animate-spin size-6" />
                      ) : (
                        "Upgrade to Pro"
                      )}
                    </button>
                    }
                  </div>
                </div>
                <div className="px-10 pb-10 space-y-3 pt-6">
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
              className="top-0 w-full h-full absolute"
              alt=""
            />
          </div>
        </Container>
      </div>

      <Link to={"/"}>
        <span className="absolute top-4 right-8 bg-[#F0EBE8] p-3 rounded-full hover:bg-black/5 cursor-pointer transition-all duration-200">
          <X size={20} className="" />
        </span>
      </Link>
    </div>
  );
}

export default UpgradePlan;
