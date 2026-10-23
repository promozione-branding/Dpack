
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Dpack ",
  description:
    "Read the terms and conditions for using the Dpack  website and purchasing products.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Dpack 
          </p>

          <h1 className="mb-5 text-3xl font-bold text-[#081a33] sm:text-4xl">
            Terms &amp; Conditions
          </h1>

          <p className="mb-8 leading-7 text-gray-600">
            Welcome to Dpack. By accessing or
            using our website, you agree to comply with these
            Terms &amp; Conditions. Please read them carefully
            before placing an order.
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                1. Website Usage
              </h2>
              <p className="leading-7">
                You agree to use this website only for lawful
                purposes and in a manner that does not violate
                applicable laws, infringe the rights of others,
                or interfere with the operation or security
                of the website.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                2. Product Information
              </h2>
              <p className="leading-7">
                We make reasonable efforts to display accurate
                product descriptions, specifications, images,
                and other information. However, actual product
                appearance, packaging, colours, or specifications
                may vary where applicable.
              </p>
              <p className="mt-3 leading-7">
                If you require clarification about a product's
                specifications or suitability, please contact
                our team before placing your order.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                3. Pricing and Orders
              </h2>
              <p className="leading-7">
                Product prices, availability, offers, and
                applicable charges are displayed on the website
                where available and may change from time to time.
                An order is subject to confirmation, product
                availability, and successful payment where
                applicable.
              </p>
              <p className="mt-3 leading-7">
                If a pricing, listing, or availability error
                occurs, we will take reasonable steps to contact
                you and resolve the issue in accordance with
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                4. Payments
              </h2>
              <p className="leading-7">
                Customers must provide accurate information
                required to complete a purchase. Payments may
                be processed through third-party payment
                providers and are subject to their applicable
                terms and security procedures.
              </p>
              <p className="mt-3 leading-7">
                Orders may not be processed until the required
                payment has been successfully confirmed.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                5. Shipping and Delivery
              </h2>
              <p className="leading-7">
                Orders are processed subject to product
                availability and order confirmation. Delivery
                timelines may vary depending on the destination,
                courier service, product availability, and
                logistical circumstances.
              </p>
              <p className="mt-3 leading-7">
                Customers are responsible for providing a
                complete and accurate shipping address and
                valid contact details.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                6. Returns, Replacements and Refunds
              </h2>
              <p className="leading-7">
                Products are generally non-returnable and
                non-refundable, except where applicable law
                requires otherwise or a replacement request
                is approved under our published policy.
                Damaged, defective, or incorrect products
                should be reported within 48 hours of delivery.
              </p>
              <p className="mt-3 leading-7">
                Please refer to our Shipping &amp; Cancellations
                Policy for further details regarding eligible
                replacement requests and order cancellations.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                7. Order Cancellation
              </h2>
              <p className="leading-7">
                Cancellation requests may be submitted within
                24 hours of placing an order, provided it has
                not been dispatched. Once an order has been
                shipped, cancellation may not be possible,
                subject to applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                8. Intellectual Property
              </h2>
              <p className="leading-7">
                Website content, including text, graphics,
                logos, photographs, and other materials, may
                be protected by intellectual property laws.
                You may not reproduce, distribute, modify,
                or commercially use such material without
                appropriate authorisation, except where
                permitted by law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                9. Limitation of Liability
              </h2>
              <p className="leading-7">
                To the extent permitted by applicable law,
                Dpack shall not be liable for
                indirect or consequential losses arising from
                website interruptions, third-party services,
                or circumstances beyond our reasonable control.
                Nothing in these terms excludes or limits
                liability that cannot legally be excluded
                or limited.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                10. Third-Party Services
              </h2>
              <p className="leading-7">
                Our website may use or link to third-party
                services, including payment gateways and
                delivery providers. Your use of those services
                may be subject to their own terms and policies.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                11. Changes to These Terms
              </h2>
              <p className="leading-7">
                We may update these Terms &amp; Conditions
                from time to time. Updated terms will be
                published on this page and will apply as
                permitted by applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                12. Governing Law
              </h2>
              <p className="leading-7">
                These Terms &amp; Conditions are subject to
                applicable laws of India. Any disputes will
                be handled by the competent courts or forums
                having jurisdiction under applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                13. Contact Us
              </h2>
              <p className="mb-5 leading-7">
                If you have any questions regarding these
                Terms &amp; Conditions, please contact
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
