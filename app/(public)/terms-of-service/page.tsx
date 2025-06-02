import { PublicLayout } from "@/components/public-layout"

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-invert max-w-none">
            <p className="lead text-xl mb-6">Last Updated: May 14, 2023</p>

            <p>
              Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before
              using the TFB STUDIOS website or platform operated by TFB STUDIOS.
            </p>

            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these
              Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of
              the terms then you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
              termination of your account on our Service.
            </p>

            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any
              activities or actions under your password, whether your password is with our Service or a third-party
              service.
            </p>

            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming
              aware of any breach of security or unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of TFB STUDIOS and its licensors. The Service is protected by copyright, trademark, and other
              laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in
              connection with any product or service without the prior written consent of TFB STUDIOS.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you
              post on or through the Service, including its legality, reliability, and appropriateness.
            </p>

            <p>
              By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours
              (you own it) or you have the right to use it and grant us the rights and license as provided in these
              Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights,
              publicity rights, copyrights, contract rights or any other rights of any person.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Subscription and Payments</h2>
            <p>
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring
              and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set on a monthly or annual basis,
              depending on the type of subscription plan you select when purchasing a Subscription.
            </p>

            <p>
              At the end of each Billing Cycle, your Subscription will automatically renew under the exact same
              conditions unless you cancel it or TFB STUDIOS cancels it. You may cancel your Subscription renewal either
              through your online account management page or by contacting TFB STUDIOS customer support team.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>

            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
              account, you may simply discontinue using the Service or contact us to delete your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall TFB STUDIOS, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
              party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or
              alteration of your transmissions or content, whether based on warranty, contract, tort (including
              negligence) or any other legal theory, whether or not we have been informed of the possibility of such
              damage.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will try to provide at least 30 days&apos; notice prior to any new terms taking effect.
              What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <p className="mt-2">
              Email: terms@tfbstudios.com
              <br />
              Address: 123 Fashion Avenue, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
