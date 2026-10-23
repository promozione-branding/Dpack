
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Dpack ",
  description:
    "",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Dpack
          </p>

          <h1 className="mb-5 text-3xl font-bold text-[#081a33] sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mb-8 leading-7 text-gray-600">
            At Dpack , we respect your privacy and
            are committed to protecting the personal information
            you share with us when using our website or purchasing
            our products.
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                1. Information We Collect
              </h2>
              <p className="leading-7">
                We may collect information such as your name,
                phone number, email address, billing address,
                shipping address, order details, and other
                information you voluntarily provide when placing
                an order, contacting us, or submitting an enquiry.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                2. How We Use Your Information
              </h2>
              <p className="leading-7">
                Your information may be used to process and deliver
                orders, respond to enquiries, provide customer
                support, communicate order updates, manage
                cancellations and replacements, improve our
                website, and meet applicable legal requirements.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                3. Payment Information
              </h2>
              <p className="leading-7">
                Payments may be processed through third-party
                payment service providers. Your payment
                information is handled according to the relevant
                provider's policies and security procedures.
                We do not intentionally store complete payment
                card details on our website servers.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                4. Sharing of Information
              </h2>
              <p className="leading-7">
                We may share necessary information with delivery
                partners, payment processors, technology service
                providers, and other service providers when
                required to fulfil your order or operate our
                business. Information may also be disclosed when
                required by applicable law.
              </p>
              <p className="mt-3 leading-7">
                We do not sell your personal information to third
                parties for their independent marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                5. Cookies and Website Data
              </h2>
              <p className="leading-7">
                Our website may use cookies and similar
                technologies to support essential website
                functions, remember preferences, understand
                website usage, and improve the user experience.
                You can manage cookies through your browser
                settings, although disabling certain cookies may
                affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                6. Data Security
              </h2>
              <p className="leading-7">
                We take reasonable measures to protect personal
                information against unauthorised access, loss,
                misuse, or disclosure. However, no method of
                electronic storage or internet transmission can
                be guaranteed to be completely secure.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                7. Data Retention
              </h2>
              <p className="leading-7">
                We retain personal information for as long as
                reasonably necessary to fulfil orders, provide
                support, maintain business records, resolve
                disputes, and comply with applicable legal
                obligations.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                8. Your Privacy Rights
              </h2>
              <p className="leading-7">
                Subject to applicable law, you may request access
                to, correction of, or deletion of your personal
                information. Certain information may need to be
                retained where legally required or necessary for
                legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                9. Third-Party Links
              </h2>
              <p className="leading-7">
                Our website may contain links to third-party
                websites or services. We are not responsible
                for the privacy practices or content of those
                external websites. Please review their privacy
                policies before sharing information.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                10. Changes to This Policy
              </h2>
              <p className="leading-7">
                We may update this Privacy Policy from time to
                time. Any updated version will be published on
                this page. Your continued use of the website
                after an update is subject to applicable law
                and the updated policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                11. Contact Us
              </h2>
              <p className="mb-5 leading-7">
                If you have questions about this Privacy Policy
                or your personal information, please contact
                Dpack.
              </p>

              <div className="space-y-4 rounded-xl bg-[#f7f8fa] p-5">
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500">
                    Call Us
                  </p>
                  <a
                    href="tel:+917669988825"
                    className="font-semibold text-[#081a33] hover:text-[#f5a623]"
                  >
                    +91-7669988825
                  </a>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500">
                    Email Us
                  </p>
                  <a
                    href="mailto:dpacksolutionindia@gmail.com"
                    className="break-all font-semibold text-[#081a33] hover:text-[#f5a623]"
                  >
                    dpacksolutionindia@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
          
          </div>
        </div>
      </div>
    </main>
  );
}
