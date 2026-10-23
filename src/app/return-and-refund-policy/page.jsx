
import Link from "next/link";

export const metadata = {
  title: "Return & Refund Policy | Dpack Solution India",
  description:
    "Read Dpack Solution India's return, replacement, refund, and cancellation policy.",
};

export default function ReturnRefundPolicy() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5a623]">
            Dpack Solution India
          </p>

          <h1 className="mb-5 text-3xl font-bold text-[#081a33] sm:text-4xl">
            Return &amp; Refund Policy
          </h1>

          <p className="mb-8 leading-7 text-gray-600">
            Please read our return, replacement, refund, and order
            cancellation policy before placing an order with Dpack
            Solution India.
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                1. Can I Return an Item Ordered from Dpack?
              </h2>

              <p className="leading-7">
                All sales are generally non-returnable and
                non-refundable. However, if you receive a damaged,
                defective, or incorrect product, you may request a
                replacement by contacting us within 48 hours of
                delivery.
              </p>

              <p className="mt-3 leading-7">
                The product must be unused, in its original
                condition, and accompanied by its original packaging
                and included accessories, wherever applicable.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                2. Is There a Refund Option?
              </h2>

              <p className="leading-7">
                Dpack generally does not offer refunds for purchases.
                Replacement requests may be considered for verified
                damaged, defective, or incorrect products, subject
                to inspection and approval.
              </p>

              <p className="mt-3 leading-7">
                Please contact our support team within 48 hours of
                delivery and provide your order details along with
                photographs or videos showing the issue.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                3. Can I Cancel My Order?
              </h2>

              <p className="leading-7">
                Orders may be eligible for cancellation within 24
                hours of placing the order, provided the order has
                not yet been dispatched.
              </p>

              <p className="mt-3 leading-7">
                Once an order has been dispatched or shipped,
                cancellation requests will generally not be accepted.
                Refunds are not available under this policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                4. How to Request a Replacement
              </h2>

              <p className="leading-7">
                If you receive a damaged, defective, or incorrect
                product, contact our team within 48 hours of
                delivery. Include your order number, a description
                of the issue, and clear supporting photographs or
                videos.
              </p>

              <p className="mt-3 leading-7">
                Our team will review your request and inform you
                about the next steps. Replacements are subject to
                verification and product availability.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-[#081a33]">
                5. Contact Us
              </h2>

              <p className="mb-5 leading-7">
                For replacement requests, order cancellations, or
                questions regarding this policy, please contact
                Dpack Solution India.
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
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-[#f5a623] px-6 py-3 font-semibold text-[#081a33] transition hover:bg-[#e99a13]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
