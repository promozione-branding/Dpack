"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes dpackFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes dpackFadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dpackFadeRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes dpackPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.2);
          }

          50% {
            box-shadow: 0 0 0 8px rgba(245, 166, 35, 0);
          }
        }

        @keyframes dpackShine {
          0% {
            left: -100%;
          }

          100% {
            left: 120%;
          }
        }

        .dpack-fade-up {
          animation: dpackFadeUp 0.7s ease forwards;
        }

        .dpack-fade-right {
          animation: dpackFadeRight 0.7s ease forwards;
        }

        .dpack-float {
          animation: dpackFloat 4s ease-in-out infinite;
        }

        .dpack-pulse {
          animation: dpackPulse 2.5s infinite;
        }

        .dpack-shine {
          position: relative;
          overflow: hidden;
        }

        .dpack-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.22),
            transparent
          );
          transform: skewX(-20deg);
          animation: dpackShine 3.5s infinite;
        }

        .dpack-input {
          transition: all 0.25s ease;
        }

        .dpack-input:focus {
          border-color: #f5a623;
          box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.1);
          outline: none;
        }

        .dpack-link {
          transition: all 0.25s ease;
        }

        .dpack-link:hover {
          color: #f5a623;
        }
      `}</style>

      <main className="min-h-screen bg-[#F7F8FA] text-[#081A33] lg:h-screen lg:overflow-hidden">
        <div className="grid min-h-screen lg:h-screen lg:grid-cols-[45%_55%]">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <section className="relative hidden overflow-hidden bg-[#081A33] text-white lg:block">

            {/* Background Effects */}
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#F5A623]/10 blur-3xl" />

            <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#F5A623]/10 blur-3xl" />

            <div className="absolute right-16 top-20 h-20 w-20 rotate-12 border border-[#F5A623]/20" />

            <div className="absolute bottom-24 left-16 h-14 w-14 rotate-45 border border-white/10" />

            <div className="relative flex h-full w-full flex-col justify-between p-8 xl:p-12">

              {/* Logo */}
              <div className="dpack-fade-right">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center bg-[#F5A623]">
                    <span className="text-lg font-black text-[#081A33]">
                      D
                    </span>
                  </div>

                  <div>
                    <div className="text-xl font-black tracking-[0.18em]">
                      DPACK
                    </div>

                    <div className="text-[9px] uppercase tracking-[0.25em] text-white/50">
                      Packaging Solutions
                    </div>
                  </div>
                </Link>
              </div>

              {/* Main Content */}
              <div className="relative max-w-xl dpack-fade-up">

                <div className="mb-5 inline-flex items-center gap-2 border border-[#F5A623]/30 bg-[#F5A623]/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 bg-[#F5A623]" />

                  <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                    Account Recovery
                  </span>
                </div>

                <h1 className="text-4xl font-black leading-[1.05] tracking-tight xl:text-5xl">
                  Secure Your
                  <span className="block text-[#F5A623]">
                    DPACK Account.
                  </span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-6 text-white/60">
                  Forgot your password? Don't worry. Enter the email
                  address associated with your account and we'll help
                  you get back in.
                </p>

                {/* Features */}
                <div className="mt-7 grid gap-3">

                  <div className="group flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition group-hover:border-[#F5A623]/40 group-hover:bg-[#F5A623]/10">
                      <Mail
                        size={17}
                        className="text-[#F5A623]"
                      />
                    </div>

                    <div>
                      <p className="text-[16px] font-bold text-white">
                        Email Verification
                      </p>

                      <p className="mt-0.5 text-[14px] text-white/40">
                        We'll send recovery instructions to your email.
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition group-hover:border-[#F5A623]/40 group-hover:bg-[#F5A623]/10">
                      <LockKeyhole
                        size={17}
                        className="text-[#F5A623]"
                      />
                    </div>

                    <div>
                      <p className="text-[16px] font-bold text-white">
                        Secure Recovery
                      </p>

                      <p className="mt-0.5 text-[14px] text-white/40">
                        Keep your account protected throughout the process.
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition group-hover:border-[#F5A623]/40 group-hover:bg-[#F5A623]/10">
                      <ShieldCheck
                        size={17}
                        className="text-[#F5A623]"
                      />
                    </div>

                    <div>
                      <p className="text-[16px] font-bold text-white">
                        Protected Account
                      </p>

                      <p className="mt-0.5 text-[14px] text-white/40">
                        Your account information remains protected.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <p className="text-[14px] uppercase tracking-[0.16em] text-white/30">
                  Smart Packaging. Better Protection.
                </p>

                <div className="dpack-float hidden h-10 w-10 items-center justify-center border border-[#F5A623]/30 bg-[#F5A623]/10 xl:flex">
                  <LockKeyhole
                    size={17}
                    className="text-[#F5A623]"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <section className="flex items-center justify-center px-5 py-6 sm:px-8 lg:h-full lg:overflow-y-auto lg:px-12 lg:py-4">

            <div className="w-full max-w-[520px]">

              {/* Mobile Logo */}
              <div className="mb-5 flex justify-center lg:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-[#081A33]">
                    <span className="font-black text-[#F5A623]">
                      D
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-black tracking-[0.16em] text-[#081A33]">
                      DPACK
                    </div>

                    <div className="text-[8px] uppercase tracking-[0.2em] text-[#081A33]/40">
                      Packaging Solutions
                    </div>
                  </div>
                </Link>
              </div>

              {/* Heading */}
              <div className="mb-5 dpack-fade-up">

                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-7 bg-[#F5A623]" />

                  <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                    Reset Password
                  </span>
                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Forgot Your{" "}
                  <span className="text-[#F5A623]">
                    Password?
                  </span>
                </h2>

                <p className="mt-2 text-sm leading-5 text-[#081A33]/55">
                  Enter your registered email address and we'll
                  send you instructions to reset your password.
                </p>

              </div>

              {/* Form Card */}
              <div className="border border-[#081A33]/10 bg-white p-5 shadow-[0_15px_50px_rgba(8,26,51,0.07)] sm:p-6 dpack-fade-up">

                {!submitted ? (
                  <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#081A33]/70"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#081A33]/35"
                        />

                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="you@example.com"
                          required
                          className="dpack-input h-11 w-full border border-[#081A33]/10 bg-[#F8F9FB] pl-10 pr-4 text-sm text-[#081A33] placeholder:text-[#081A33]/30"
                        />
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      className="dpack-shine dpack-pulse mt-4 flex h-11 w-full items-center justify-center gap-2 bg-[#F5A623] text-sm font-black text-[#081A33] transition duration-300 hover:bg-[#081A33] hover:text-white"
                    >
                      Send Reset Link
                      <ArrowRight size={17} />
                    </button>

                  </form>
                ) : (
                  /* Success State */
                  <div className="py-4 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#F5A623]/10">
                      <CheckCircle2
                        size={30}
                        className="text-[#F5A623]"
                      />
                    </div>

                    <h3 className="mt-5 text-xl font-black text-[#081A33]">
                      Check Your Email
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#081A33]/55">
                      If an account exists with{" "}
                      <span className="font-bold text-[#081A33]">
                        {email}
                      </span>
                      , we've sent instructions to reset your
                      password.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="dpack-link mt-4 text-[16px] font-bold text-[#081A33]"
                    >
                      Try another email
                    </button>

                  </div>
                )}

                {/* Login Box */}
                <div className="mt-3 border border-[#081A33]/8 bg-[#F8F9FB] p-4 text-center">

                  <p className="text-[16px] text-[#081A33]/50">
                    Remember your password?
                  </p>

                  <Link
                    href="/login"
                    className="dpack-link mt-1 inline-flex items-center gap-1 text-[16px] font-black text-[#081A33]"
                  >
                    <ArrowLeft size={13} />
                    Back to Login
                  </Link>

                </div>

              </div>

              {/* Register */}
              <div className="mt-4 text-center">
                <p className="text-[16px] text-[#081A33]/45">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="dpack-link font-black text-[#081A33]"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* Security */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[14px] text-[#081A33]/35">
                <ShieldCheck size={14} />

                <span>
                  Your account recovery process is secure.
                </span>
              </div>

            </div>
          </section>

        </div>
      </main>
    </>
  );
}