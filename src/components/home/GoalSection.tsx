import { useNavigate } from "react-router";
import Container from "../shared/Container";
import CommonButton from "../shared/CommonButton";
import { imageProvider } from "../../utils/imageProvider";
import Copy from "../Copy";
import { useAppSelector } from "../../redux/hooks";
import type { TShowModal } from "../../types/global.types";





function GoalSection({ showModal }: TShowModal) {

    const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();



  const handleFreeAccess = () => {
    if (token) {
      navigate("/chatbot-home");
    } else {
      showModal();
    }
  }


  return (
    <div className="bg-[#F5F0ED]">
      <Container>
        <div className="flex relative py-16  justify-center flex-col items-center">
          <Copy delay={0.3}>
            <h3 className="lg:text-2xl hidden md:flex text-xl relative z-2 text-center pb-8 font-medium w-11/12 lg:w-7/12">
            Trusted by 500+ marketers, copywriters, and coaches. Built by a real
            copywriter. Not just another AI tool.
          </h3>
          </Copy>
            <h3 className="lg:text-2xl md:hidden flex text-xl relative z-2 text-center pb-8 font-medium w-11/12 lg:w-7/12">
            Trusted by 500+ marketers, copywriters, and coaches. Built by a real
            copywriter. Not just another AI tool.
          </h3>
            <CommonButton
              className="px-8 cursor-pointer font-medium shadow-btn relative z-2 hover:shadow-primary-btn/60 transition-all duration-200  shadow-primary-btn/40 py-2.5 rounded-md  "
            ><h4 onClick={handleFreeAccess}>Get Free Access Now</h4></CommonButton>
          <img className="top-0 absolute h-full " src={imageProvider.GoalGradientImg} alt="" />
        </div>
      </Container>
    </div>
  );
}

export default GoalSection;
