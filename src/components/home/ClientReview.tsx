import { imageProvider } from "../../utils/imageProvider";
import Copy from "../Copy";
import Container from "../shared/Container";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

function ClientReview() {

  useGSAP(() => {
  const images = gsap.utils.toArray<HTMLElement>(".review-image");
  if (!images.length) return;
  images.forEach((img) => {
    gsap.from(img, {
      duration: 1.4,
      filter: "blur(5px)",
      scale: 0.9,
      stagger: 0.4,
      ease: "power3.out",
      // yoyo: true,
      // repeat: -1,
      scrollTrigger: {
        trigger: img,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
}, []);

  return (
    <div className="bg-[#141413] py-14 lg:px-6 2xl:px-0 lg:py-24">
      <Container>
        <div className="px-4 lg:px-0">
          <Copy delay={0.5}>
            <h3 className="text-white w-10/12 lg:w-3/12 text-3xl lg:text-4xl pb-10">
              See what our clients are saying
            </h3>
          </Copy>
          <div className="flex relative select-none flex-wrap space-x-2 space-y-2 w-full">
            <img
              className="h-full select-none review-image"
              src={imageProvider.ReviewImg4}
              alt="review"
            />
            <img
              className="h-full select-none review-image"
              src={imageProvider.ReviewImg2}
              alt="review"
            />
            <img
              className="h-full select-none review-image translate-y-0 lg:translate-y-5"
              src={imageProvider.ReviewImg6}
              alt="review"
            />
            <img
              className="h-full select-none review-image"
              src={imageProvider.ReviewImg3}
              alt="review"
            />
            <img
              className="h-full lg:mt-6 select-none review-image"
              src={imageProvider.ReviewImg5}
              alt="review"
            />
            <img
              className="h-full select-none review-image"
              src={imageProvider.ReviewImg7}
              alt="review"
            />
            <img
              className="h-full select-none review-image"
              src={imageProvider.ReviewImg1}
              alt="review"
            />
            {/* bg transparent */}
            <img
              className="absolute top-0 w-full "
              src={imageProvider.ReviewBg}
              alt=""
            />
            <img
              className="absolute bottom-0 h-[300px] rotate-180 w-full "
              src={imageProvider.ReviewBg}
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ClientReview;
