import Container from "../components/shared/Container";
import { imageProvider } from "../utils/imageProvider";

const PrivacyPolicyPage = () => {
  return (
    <Container>
      <div className="min-h-screen py-20 font-avant w-full flex flex-col gap-14">
        <div className="flex justify-center gap-2">
          <img src={imageProvider.CopybotLogoBlack} alt="" />
          <h4 className="font-medium text-2xl ">Privacy Policy</h4>
        </div>
        <div>
          <div className=" ">
            <h3 className="font-medium text-xl">Effective Date: 7/11/2025</h3> <br></br><h4 className="font-medium text-lg">Welcome to <span className="text-primary-btn">CopyBot, your AI-powered </span>  
            copywriting assistant. Please read these Terms of Service <span className="text-primary-btn">("Terms") </span>
            carefully before using CopyBot. By accessing or using our services,
            you agree to be bound by these Terms. If you do not agree, please do
            not use the service.</h4> <br></br><p className="font-medium px-8 text-black/80">
                <h4>1. Acceptance of Terms By accessing or using
            CopyBot, you represent that you are at least 18 years old and agree
            to comply with and be legally bound by these Terms. If you are using
            CopyBot on behalf of an organization, you represent and warrant that
            you have the authority to bind that organization to these Terms.</h4> <br></br><h4>2.
            Service Description CopyBot is an AI-powered tool designed to assist
            users with copywriting tasks including, but not limited to,
            marketing copy, email scripts, social media content, website copy,
            and advertising text. All output is AI-generated and should be
            reviewed by a human before use. We do not guarantee the accuracy,
            originality, or legal compliance of the content generated.</h4> <br></br><h4>3. User
            Responsibilities You agree not to use CopyBot to: Generate or
            disseminate false or misleading information Create content that is
            offensive, discriminatory, defamatory, or harmful Violate any laws,
            intellectual property rights, or third-party terms Infringe on
            privacy or confidentiality obligations You are solely responsible
            for how you use the content CopyBot provides. </h4><br></br><h4>4. Intellectual
            Property CopyBot retains all rights, title, and interest in the
            underlying technology, software, and platform. You own the rights to
            any content you input into the tool and any output you choose to
            use, subject to OpenAI's and CopyBot’s licensing terms. </h4><br></br><h4>5. License
            Grant Subject to these Terms, CopyBot grants you a limited,
            non-exclusive, non-transferable license to use the services for your
            personal or business use. This license does not permit resale,
            sublicensing, or distribution of generated content as a standalone
            product. </h4><br></br><h4>6. Payment & Subscriptions If CopyBot offers paid plans,
            you agree to pay all applicable fees in accordance with the selected
            subscription tier. Payments are non-refundable unless otherwise
            stated. We reserve the right to change pricing, introduce new
            features, or modify existing ones at any time with notice. </h4><br></br><h4>7.
            Disclaimers CopyBot is provided “as is” and “as available.” We make
            no warranties, express or implied, regarding the reliability,
            accuracy, or suitability of the content. You are responsible for
            ensuring that content meets your specific needs, including legal or
            regulatory compliance. </h4><br></br><h4>8. Limitation of Liability To the fullest
            extent permitted by law, CopyBot and its creators shall not be
            liable for any indirect, incidental, special, or consequential
            damages, or loss of profits, data, or business opportunities arising
            from or related to your use of the service. </h4><br></br><h4>9. Termination We may
            suspend or terminate your access to CopyBot at any time, with or
            without notice, if we believe you have violated these Terms or are
            using the service in a way that could harm others or our platform.</h4>
            <br></br><h4>10. Privacy Policy Your use of CopyBot is also governed by our
            Privacy Policy, which outlines how we collect, use, and protect your
            data. </h4><br></br><h4>11. Modifications to Terms We reserve the right to update or
            modify these Terms at any time. Continued use of CopyBot after
            changes constitutes your acceptance of the revised Terms. We
            recommend reviewing them regularly.</h4> <br></br><h4>12. Governing Law These Terms
            are governed by the laws of Florida, USA without regard to its
            conflict of laws principles. Any disputes shall be resolved in the
            courts of Florida </h4><br></br>13. Contact Us For questions about these Terms,
            please contact us at <span className="text-primary-btn hover:underline">amanda@cashflowcopy.io</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
