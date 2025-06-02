import { PublicLayout } from "@/components/public-layout"

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none">
            <p className="lead text-xl mb-6">Last Updated: May 14, 2023</p>

            <p>
              At TFB STUDIOS, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website or use our platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-bold mt-6 mb-3">Personal Data</h3>
            <p>
              We may collect personal identification information from users in various ways, including, but not limited
              to, when users visit our site, register on the site, place an order, fill out a form, and in connection
              with other activities, services, features or resources we make available on our site. Users may be asked
              for, as appropriate, name, email address, mailing address, phone number, and payment information.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">Non-Personal Data</h3>
            <p>
              We may collect non-personal identification information about users whenever they interact with our site.
              Non-personal identification information may include the browser name, the type of computer, and technical
              information about users&apos; means of connection to our site, such as the operating system and the
              Internet service providers utilized and other similar information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p>We may use the information we collect from you in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                To personalize your experience and deliver the type of content and product offerings in which you are
                most interested
              </li>
              <li>To improve our website in order to better serve you</li>
              <li>To allow us to better service you in responding to your customer service requests</li>
              <li>To administer a contest, promotion, survey or other site feature</li>
              <li>To quickly process your transactions</li>
              <li>To send periodic emails regarding your order or other products and services</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">How We Protect Your Information</h2>
            <p>
              We adopt appropriate data collection, storage, and processing practices and security measures to protect
              against unauthorized access, alteration, disclosure, or destruction of your personal information,
              username, password, transaction information, and data stored on our site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Sharing Your Personal Information</h2>
            <p>
              We do not sell, trade, or rent users&apos; personal identification information to others. We may share
              generic aggregated demographic information not linked to any personal identification information regarding
              visitors and users with our business partners, trusted affiliates, and advertisers.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              TFB STUDIOS has the discretion to update this privacy policy at any time. When we do, we will revise the
              updated date at the top of this page. We encourage users to frequently check this page for any changes to
              stay informed about how we are helping to protect the personal information we collect.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Acceptance of These Terms</h2>
            <p>
              By using this site, you signify your acceptance of this policy. If you do not agree to this policy, please
              do not use our site. Your continued use of the site following the posting of changes to this policy will
              be deemed your acceptance of those changes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contacting Us</h2>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with
              this site, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@tfbstudios.com
              <br />
              Address: 123 Fashion Avenue, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
