import { Link, useNavigate, useSearchParams } from "react-router";
import { useConfirmPlanMutation } from "../redux/features/subscribe/subscribeApi";
import { useEffect } from "react";
import { imageProvider } from "../utils/imageProvider";
import ChatLoading from "../components/shared/ChatLoading";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();

  const [confirmPlan, { isLoading }] = useConfirmPlanMutation();

  const session_id = searchParams.get("session_id");
  const navigate = useNavigate()

  useEffect(() => {
    const confirmSubscription = async () => {
      if (session_id) {
        const id = { session_id: session_id };
        try {
          const res = await confirmPlan(id);
          if(res.data.status) {
            // console.log('success', res?.data);
          }else{
            navigate('/user/subscription/cancel')
          }
        } catch (error) {
          console.log(error);
          navigate('/user/subscription/cancel')
        }
      }
    };

    confirmSubscription(); // Immediately invoke
  }, [session_id, searchParams, confirmPlan, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ChatLoading />
      </div>
    );
  }

  return (
    <div className="h-screen font-avant w-full flex flex-col justify-center items-center">
        <img src={imageProvider.SuccessLogo} alt="" />
      <h3 className="text-4xl text-primary-btn py-4 font-bold">Payment Successful!</h3>
      <p className="font-medium w-4/12 text-center">
        Thank you for subscribing to upgrade to Pro plan! 
        Your account has been upgraded and you now have access to all premium features.
      </p>
      <div className="pt-4">
        <Link to={'/'}> <button className="px-6 py-2.5 rounded-md cursor-pointer font-medium bg-primary-btn text-white ">Go to homepage</button> </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
