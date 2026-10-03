"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { sendOtp, loginWithOtp } = useAuth();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!otpSent) {
        const result = await sendOtp(mobile);
        if (!result.ok) throw new Error(result.error || "Could not send verification code.");
        setOtpSent(true);
        return;
      }

      const result = await loginWithOtp(mobile, otp);
      if (!result.ok) throw new Error(result.error || "Could not verify the code.");
      const destination = new URLSearchParams(window.location.search).get("next");
      router.replace(destination?.startsWith("/") && !destination.startsWith("//") ? destination : "/my-account");
    } catch (submitError) {
      setError(submitError.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#081A33]">
      <style jsx global>{`
        @keyframes loginFade {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loginLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes loginFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        .login-fade {
          animation: loginFade 0.7s ease forwards;
        }

        .login-left {
          animation: loginLeft 0.8s ease forwards;
        }

        .login-float {
          animation: loginFloat 4s ease-in-out infinite;
        }
      `}</style>

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}

        <section className="login-left relative hidden overflow-hidden bg-[#081A33] lg:flex">
          <div className="absolute -right-32 -top-32 h-96 w-96 bg-[#F5A623]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 bg-[#F5A623]/5 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            <Link
              href="/"
              className="text-2xl font-black tracking-[0.12em] text-white"
            >
              DPACK
            </Link>

            <div className="max-w-xl">

              <div className="login-float mb-8 flex h-16 w-16 items-center justify-center bg-[#F5A623] text-[#081A33]">
                <ShoppingBag size={29} />
              </div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#F5A623]">
                WELCOME BACK
              </p>

              <h1 className="text-5xl font-bold leading-[1.1] text-white xl:text-6xl">
                Everything You Need,
                <span className="mt-2 block text-[#F5A623]">
                  In One Account.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-white/55">
                Access your orders, manage your account details, track
                deliveries and make your packaging purchases easier.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Track your orders easily",
                  "Manage your delivery addresses",
                  "Faster checkout experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/75"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#F5A623]"
                    />

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} DPACK. All rights reserved.
            </p>

          </div>
        </section>

        {/* RIGHT SIDE */}

        <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <div className="login-fade w-full max-w-[500px]">

            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-10 block text-center text-2xl font-black tracking-[0.12em] text-[#081A33] lg:hidden"
            >
              DPACK
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F5A623]">
                CUSTOMER LOGIN
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-[#081A33]">
                Welcome Back
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#081A33]/50">
                Sign in securely with a one-time code sent to your mobile.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border border-[#081A33]/10 bg-white p-6 shadow-[0_20px_60px_rgba(8,26,51,0.06)] sm:p-8"
            >

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#081A33]/55">
                  Mobile Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#081A33]/30"
                  />

                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value.replace(/\D/g, ""))}
                    disabled={otpSent}
                    placeholder="10-digit mobile number"
                    className="h-13 w-full border border-[#081A33]/15 bg-[#F7F8FA] pl-12 pr-4 text-sm text-[#081A33] outline-none transition placeholder:text-[#081A33]/25 focus:border-[#F5A623] focus:bg-white"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#081A33]/55">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit code"
                    className="h-13 w-full border border-[#081A33]/15 bg-[#F7F8FA] px-4 text-sm tracking-[0.3em] text-[#081A33] outline-none focus:border-[#F5A623]"
                  />
                </div>
              )}

              {error && (
                <p role="alert" className="mt-5 flex items-start gap-2 text-sm text-red-600">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}
              <div id="recaptcha-container" />

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-7 flex h-13 w-full items-center justify-center gap-3 bg-[#F5A623] text-sm font-bold text-[#081A33] transition hover:bg-[#081A33] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : otpSent ? "Verify and Sign In" : "Send Verification Code"}
                {!loading && <ArrowRight size={18} className="transition group-hover:translate-x-1" />}
              </button>
              {otpSent && (
                <button type="button" onClick={() => { setOtpSent(false); setOtp(""); setError(""); }} className="mt-4 w-full text-xs font-semibold text-[#081A33]/60 hover:text-[#F5A623]">
                  Change mobile number
                </button>
              )}

              {/* Security */}

              <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#081A33]/10 pt-5 text-[11px] text-[#081A33]/40">
                <ShieldCheck size={15} />
                Secure customer account
              </div>
            </form>

            {/* Register */}

            <div className="mt-6 border border-[#081A33]/10 bg-white p-5 text-center">
              <p className="text-sm text-[#081A33]/55">
                Don&apos;t have an account?
              </p>

              <Link
                href="/register"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#081A33] transition hover:text-[#F5A623]"
              >
                Create New Account
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}