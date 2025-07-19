import { Link } from "react-router";
import { imageProvider } from "../utils/imageProvider";


const CancelPage = () => {
    return (
        <div className="h-screen font-avant w-full flex flex-col justify-center items-center">
        <img src={imageProvider.CancelLogo} alt="" />
      <h3 className="text-4xl text-primary-btn py-4 font-bold">Payment Unsuccessful !</h3>
      <p className="font-medium text-base w-4/12 text-center">
        Something went wrong while processing your payment.
      </p>
      <div className="pt-5">
        <Link to={'/upgrade-plan'}> <button className="px-6 py-2.5 rounded-md cursor-pointer font-medium bg-primary-btn text-white ">Try again !</button> </Link>
      </div>
    </div>
    );
};

export default CancelPage;