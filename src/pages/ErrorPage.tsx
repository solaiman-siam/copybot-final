import { Link } from "react-router";
import { imageProvider } from "../utils/imageProvider";
import CommonButton from "../components/shared/CommonButton";

function ErrorPage() {
  return (
    <div className="w-full font-avant h-screen justify-center items-center bg-white flex flex-col ">
      <img className="w-[600px]" src={imageProvider.ErrorImg} alt="" />

      <p className="font-medium pt-8 w-3/12 text-center">
        The page you are trying to access doesn’t exist or has been moved.Try
        going back to our homepage.
      </p>

      <Link to={"/"}>
        <CommonButton  className="px-4 py-2 rounded-md mt-6">Go to homepage</CommonButton>
      </Link>
    </div>
  );
}

export default ErrorPage;
