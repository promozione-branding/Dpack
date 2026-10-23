
import Link from "next/link";

export const metadata = {
  title: "Shipping & Cancellations Policy | Dpack ",
  description:
    "Read the shipping, cancellation, return, and replacement policy of Dpack",
};

export default function ShippingCancellationsPolicy() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Dpack
          </p>

          <h1 className="mb-5 text-3xl font-bold text-[#081a33] sm:text-4xl">
            Shipping &amp; Cancellations Policy
          </h1>

          <p className="mb-8 leading-7 text-gray-600">
            Please read our policy carefully before requesting a
            return, replacement, or order cancellation.
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                1. Can I Return an Item Ordered from Dpack?
              </h2>

              <p className="leading-7">
                All sales are generally{" "}
                <strong className="font-semibold text-[#081a33]">
                  non-returnable and non-refundable
                </strong>
                . However, if you receive a{" "}
                <strong className="font-semibold text-[#081a33]">
                  damaged, defective, or incorrect product
                </strong>
                , you may request a{" "}
                <strong className="font-semibold text-[#081a33]">
                  replacement (not a refund)
                </strong>{" "}
                by contacting us within{" "}
                <strong className="font-semibold text-[#081a33]">
                  48 hours of delivery
                </strong>
                .
              </p>

              <p className="mt-3 leading-7">
                The item must be{" "}
                <strong className="font-semibold text-[#081a33]">
                  unused
                </strong>
                , in its{" "}
                <strong className="font-semibold text-[#081a33]">
                  original condition
                </strong>
                , and must include all{" "}
                <strong className="font-semibold text-[#081a33]">
                  original packaging materials
                </strong>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                2. Is There a Refund Option?
              </h2>

              <p className="leading-7">
                We currently{" "}
                <strong className="font-semibold text-[#081a33]">
                  do not offer refunds
                </strong>{" "}
                for purchases. Only replacement requests are
                accepted in cases involving verified{" "}
                <strong className="font-semibold text-[#081a33]">
                  damaged, defective, or incorrect items
                </strong>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                3. Can I Cancel My Order?
              </h2>

              <p className="leading-7">
                Orders can be cancelled within{" "}
                <strong className="font-semibold text-[#081a33]">
                  24 hours of placing the order
                </strong>
                , only if the order has{" "}
                <strong className="font-semibold text-[#081a33]">
                  not been dispatched
                </strong>
                .
              </p>

              <p className="mt-3 leading-7">
                Once the order has been shipped,{" "}
                <strong className="font-semibold text-[#081a33]">
                  cancellations or refunds are not possible
                </strong>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                4. Shipping Policy
              </h2>

              <p className="leading-7">
                Orders are processed and dispatched according to
                product availability and order confirmation.
                Shipping and delivery timelines may vary depending
                on the delivery location, courier service, and
                other logistical factors.
              </p>

              <p className="mt-3 leading-7">
                Customers should ensure that the shipping address
                and contact details provided at checkout are
                accurate and complete.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                5. Contact Us
              </h2>

              <p className="mb-5 leading-7">
                For shipping enquiries, replacement requests, or
                order cancellation assistance, please contact
                Dpack
              </p>

              <div className="space-y-4 rounded-xl bg-[#f7f8fa] p-5">
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500">
                    Call Us
                  </p>
                  <a
                    href="tel:+917669988825"
                    className="font-semibold text-[#081a33] transition hover:text-[#f5a623]"
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
                    className="break-all font-semibold text-[#081a33] transition hover:text-[#f5a623]"
                  >
                    dpacksolutionindia@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
