import Container from "../components/shared/Container";
import { imageProvider } from "../utils/imageProvider";

const TermsPolicyPage = () => {
  return (
    <Container>
      <div className="min-h-screen py-20 font-avant w-full flex flex-col gap-14">
        <div className="flex justify-center gap-2">
          <img src={imageProvider.CopybotLogoBlack} alt="" />
          <h4 className="font-medium text-2xl ">Terms of Service</h4>
        </div>
        <div>
          <div className=" ">
            <h3 className="font-medium text-xl">
              Effective Date: July 11, 2025
            </h3>{" "}
            <br></br>
            <h4 className="font-medium text-lg">
              At CopyBot, your privacy matters. This <span className="text-primary-btn">Privacy Policy</span> explains how
              we collect, use, and protect your personal information when you
              use our services. By using CopyBot, you agree to this policy. If
              you do not agree, please do not use the service.
            </h4>{" "}
            <br></br>
            <p>
              <div className="pb-2 space-y-2">
                <h3 className="font-medium text-black/80 pb-1">
                  {" "}
                  1. Information We Collect We collect the following types of
                  information when you interact with CopyBot:{" "}
                </h3>
                <div className="px-8 space-y-4">
                  <h4>
                    a. Personal Information When you create an account,
                    subscribe, or contact us, we may collect: Full name Email
                    address Payment details (processed securely via Stripe)
                    Company name (optional) Any information you voluntarily
                    provide
                  </h4>
                  <h4>
                    b. Usage Data We automatically collect data about how you
                    use the service, such as: IP address and location
                    Browser/device information Pages visited, prompts submitted,
                    outputs received Time, date, and referral source{" "}
                  </h4>
                  <h4>
                    c. Prompt & Output Data We store inputs and outputs to:
                    Improve the quality and accuracy of the AI Deliver customer
                    support Analyze product usage and trends You may request
                    deletion of specific data at any time.{" "}
                  </h4>
                </div>
              </div>
              <h3 className="pb-2 font-medium text-black/80">
                2. How We Use Your Information We use your information to:
                Provide and maintain CopyBot services Process payments and
                manage subscriptions Improve AI performance and user experience
                Communicate updates, features, and relevant offers Respond to
                inquiries and support requests Comply with legal obligations{" "}
              </h3>
              <div className="pb-3">
                <h3 className="pb-2 font-medium text-black/80">
                  3. How We Share Information We do not sell your personal data.
                  We only share it with:{" "}
                </h3>
                <div className="space-y-2 px-8">
                  <h4>
                    a. Service Providers We use third-party vendors like: Stripe
                    for secure payment processing Analytics tools (e.g., Google
                    Analytics) to understand user behavior Email and marketing
                    tools to keep you informed These providers have access to
                    your data only to perform services on our behalf and are
                    bound by confidentiality agreements.{" "}
                  </h4>{" "}
                  <h4>
                    b. Legal Compliance We may disclose your data if required by
                    law or to protect the rights, safety, and security of
                    CopyBot or others.{" "}
                  </h4>
                </div>
              </div>
              <h4 className="pb-3 font-medium text-black/80">
                {" "}
                4. Your Rights You have the right to: Access, correct, or delete
                your data Withdraw consent at any time Opt out of marketing
                communications Request a copy of your data To exercise any of
                these rights, contact us at <span className="font-medium  text-primary-btn hover:underline">amanda@cashflowcopy.io.</span>{" "}
              </h4>
              <h4 className="pb-3 font-medium text-black/80">
                5. Data Retention We retain your information only as long as
                necessary to: Provide services Comply with legal obligations
                Resolve disputes Enforce agreements You may request deletion at
                any time.{" "}
              </h4>
              <h4 className="pb-3 font-medium text-black/80">
                6. Security We implement appropriate technical and
                organizational security measures to protect your data. However,
                no system is 100% secure. Please use discretion when sharing
                sensitive data via prompts or uploads.
              </h4>{" "}
              <h4 className="pb-3 font-medium text-black/80">7. Cookies & Tracking Technologies We use cookies and similar
              tools to: Improve website functionality Analyze usage and improve
              performance Personalize content and offers You can manage or
              disable cookies via your browser settings. </h4><h4 className="pb-3 font-medium text-black/80">8. Payments &
              Third-Party Processors All payment information is handled securely
              via Stripe. We do not store your full credit card number or
              billing credentials on our servers. Stripe’s use of your data is
              governed by their privacy policy: https://stripe.com/privacy </h4><h4 className="pb-3 font-medium text-black/80">9.
              GDPR Notice (EU Residents) If you are located in the European
              Economic Area (EEA), you have specific rights under the General
              Data Protection Regulation (GDPR), including: The right to be
              informed The right of access The right to rectification The right
              to erasure The right to restrict processing The right to data
              portability The right to object We rely on the following legal
              bases to process your personal data: Performance of a contract
              (e.g., your subscription) Consent (e.g., marketing emails)
              Legitimate interest Compliance with legal obligations </h4><h4 className="pb-3 font-medium text-black/80">10. CCPA
              Notice (California Residents) If you are a California resident,
              you may have the right to: Know what personal data we collect and
              how it's used Access and request deletion of your data Opt out of
              the sale (we do not sell data) Not be discriminated against for
              exercising these rights To make a request under CCPA, email
              amanda@cashflowcopy.io with the subject line “CCPA Request.” </h4><h4 className="pb-3 font-medium text-black/80">11.
              Children’s Privacy CopyBot is not intended for children under 13
              (or 16 in certain regions). We do not knowingly collect personal
              data from minors. If you believe a child has submitted data to us,
              contact us immediately for removal. </h4><h4 className="pb-3 font-medium text-black/80">12. International Users If
              you’re accessing CopyBot from outside the U.S., your data may be
              transferred to and stored in the United States or other
              jurisdictions with different data protection laws. By using the
              service, you consent to such transfers. </h4><h4 className="pb-3 font-medium text-black/80">13. Changes to This Policy
              We may update this Privacy Policy from time to time. Material
              changes will be communicated via email or in-app notice. Continued
              use after updates constitutes acceptance. </h4><h4 className="pb-3 font-medium text-black/80">14. Contact Us If you
              have questions about this Privacy Policy, or wish to make a
              request regarding your data, contact: 📧 <span className="text-primary-btn font-medium  hover:underline">amanda@cashflowcopy.io</span>
              rivacy Policy summary blurb you can use in your site footer,
              subscription checkout, or sign-up page: Footer Privacy Policy We
              respect your privacy. We collect limited personal data to provide
              and improve CopyBot’s services, including secure subscription
              billing via Stripe. We never sell your information. For details on
              how we collect, use, and protect your data—and your rights under
              GDPR and CCPA—please read our full Privacy Policy.</h4>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TermsPolicyPage;
