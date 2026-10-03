"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.terms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Account created successfully!");
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
            rgba(255, 255, 255, 0.2),
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
            {/* Background shapes */}
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
                    Join DPACK
                  </span>
                </div>

                <h1 className="text-4xl font-black leading-[1.05] tracking-tight xl:text-5xl">
                  Protect Your
                  <span className="block text-[#F5A623]">
                    Products Better.
                  </span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-6 text-white/60">
                  Create your DPACK account and get access to premium
                  packaging solutions, faster ordering and a smoother
                  shopping experience.
                </p>

                {/* Features */}
                <div className="mt-7 grid gap-3">
                  <div className="group flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition group-hover:border-[#F5A623]/40 group-hover:bg-[#F5A623]/10">
                      <CheckCircle2
                        size={17}
                        className="text-[#F5A623]"
                      />
                    </div>

                    <div>
                      <p className="text-[16px] font-bold text-white">
                        Premium Packaging Products
                      </p>

                      <p className="mt-0.5 text-[14px] text-white/40">
                        Reliable solutions for safe shipping.
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition group-hover:border-[#F5A623]/40 group-hover:bg-[#F5A623]/10">
                      <ShoppingBag
                        size={17}
                        className="text-[#F5A623]"
                      />
                    </div>

                    <div>
                      <p className="text-[16px] font-bold text-white">
                        Easy & Faster Ordering
                      </p>

                      <p className="mt-0.5 text-[14px] text-white/40">
                        Manage your orders from one place.
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
                        Secure Account
                      </p>

                      <p className="mt-0.5 text-[14px] text-white/40">
                        Your account information stays protected.
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
                  <ShoppingBag
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
            <div className="w-full max-w-[560px]">
              {/* Mobile Logo */}
              <div className="mb-5 flex justify-center lg:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3"
                >
                

                </Link>
              </div>

              {/* Heading */}
              <div className="mb-5 dpack-fade-up">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-7 bg-[#F5A623]" />

                  <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                    Create Account
                  </span>
                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Create Your{" "}
                  <span className="text-[#F5A623]">
                    DPACK Account
                  </span>
                </h2>

                <p className="mt-2 text-sm leading-5 text-[#081A33]/55">
                  Register now to manage your orders and get a
                  better packaging experience.
                </p>
              </div>

              {/* Form Card */}
              <div className="border border-[#081A33]/10 bg-white p-5 shadow-[0_15px_50px_rgba(8,26,51,0.07)] sm:p-6 dpack-fade-up">
                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#081A33]/70"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#081A33]/35"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="dpack-input h-11 w-full border border-[#081A33]/10 bg-[#F8F9FB] pl-10 pr-4 text-sm text-[#081A33] placeholder:text-[#081A33]/30"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="dpack-input h-11 w-full border border-[#081A33]/10 bg-[#F8F9FB] pl-10 pr-3 text-sm text-[#081A33] placeholder:text-[#081A33]/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#081A33]/70"
                      >
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#081A33]/35"
                        />

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          className="dpack-input h-11 w-full border border-[#081A33]/10 bg-[#F8F9FB] pl-10 pr-3 text-sm text-[#081A33] placeholder:text-[#081A33]/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mt-3">
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#081A33]/70"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#081A33]/35"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                        minLength={6}
                        className="dpack-input h-11 w-full border border-[#081A33]/10 bg-[#F8F9FB] pl-10 pr-11 text-sm text-[#081A33] placeholder:text-[#081A33]/30"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#081A33]/40 transition hover:text-[#F5A623]"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mt-3">
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#081A33]/70"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#081A33]/35"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                        className="dpack-input h-11 w-full border border-[#081A33]/10 bg-[#F8F9FB] pl-10 pr-11 text-sm text-[#081A33] placeholder:text-[#081A33]/30"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#081A33]/40 transition hover:text-[#F5A623]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mt-3 flex items-start gap-2.5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={form.terms}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#F5A623]"
                    />

                    <label
                      htmlFor="terms"
                      className="text-[11px] leading-4 text-[#081A33]/55"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="dpack-link font-bold text-[#081A33]"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="dpack-link font-bold text-[#081A33]"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="dpack-shine dpack-pulse mt-4 flex h-11 w-full items-center justify-center gap-2 bg-[#F5A623] text-sm font-black text-[#081A33] transition duration-300 hover:bg-[#081A33] hover:text-white"
                  >
                    Create Account
                    <ArrowRight size={17} />
                  </button>
                </form>

                {/* Login */}
                <div className="mt-3 border border-[#081A33]/8 bg-[#F8F9FB] p-4 text-center">
                  <p className="text-[16px] text-[#081A33]/50">
                    Already have an account?
                  </p>

                  <Link
                    href="/login"
                    className="dpack-link mt-1 inline-flex items-center gap-1 text-[16px] font-black text-[#081A33]"
                  >
                    Login to your account
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Security */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[14px] text-[#081A33]/35">
                <ShieldCheck size={14} />

                <span>
                  Your information is protected with secure
                  account practices.
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}