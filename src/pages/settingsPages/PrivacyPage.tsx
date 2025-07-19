import { Link } from "react-router";
import { imageProvider } from "../../utils/imageProvider";

function PrivacyPage() {
  return (
    <div className="rounded-2xl  border border-black/10  p-5 lg:p-8">
      <div className="flex items-center gap-2">
        <img src={imageProvider.Security} alt="" />
        <div>
          <h3 className="text-lg font-semibold text-textPrimary">
            Data Privacy{" "}
          </h3>
          <p className="text-description font-medium">
            Copybot believes in transparent data practices
          </p>
        </div>
      </div>
      <p className="text-textPrimary font-medium pt-4">
        Keeping your data safe is a priority. Learn how your information is
        protected when using Copybot products, and visit our{" "}
        <Link to={'/terms-service'} className="text-primary-btn hover:underline">Terms Service</Link> and{" "}
        <Link to={'/privacy-policy'} className="text-primary-btn hover:underline">Privacy Policy</Link> for more
        details{" "}
      </p>

      <h4 className="font-semibold  text-textPrimary  pt-4 pb-2">
        How we protect your data
      </h4>
      <div className="space-y-1">
        <div className="flex items-start font-medium gap-2 text-description">
          <span>•</span>
          <h4>
            By default, Copybot doesn’t train our generative models on your
            conversations.
          </h4>
        </div>
        <div className="flex items-start font-medium gap-2 text-description">
          <span>•</span>
          <h4>Copybot doesn’t sell your data to third parties.</h4>
        </div>
        <div className="flex items-start font-medium gap-2 text-description">
          <span>•</span>
          <h4>
            Copybot deletes your data promptly when requested, except for safety
            violations or conversations you’ve shared through feedback.
          </h4>
        </div>
      </div>
      <h4 className="font-semibold  text-textPrimary  pt-4 pb-2">
        How we use your data
      </h4>
      <div className="space-y-1">
        <div className="flex items-start font-medium gap-2 text-description">
          <span>•</span>
          <h4>
            By default, Copybot doesn’t train our generative models on your
            conversations.
          </h4>
        </div>
        <div className="flex items-start font-medium gap-2 text-description">
          <span>•</span>
          <h4>Copybot doesn’t sell your data to third parties.</h4>
        </div>
        <div className="flex items-start font-medium gap-2 text-description">
          <span>•</span>
          <h4>
            Copybot deletes your data promptly when requested, except for safety
            violations or conversations you’ve shared through feedback.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
