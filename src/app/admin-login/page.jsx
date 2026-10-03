"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
  BarChart3,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("dpack_token");

    if (token) {
      fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data?.user?.role === "admin") {
            router.replace("/admin");
          }
        })
        .catch(() => {});
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid credentials");
        return;
      }

      await loginWithToken(data.token);
      router.replace("/admin");
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F7FA]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#0B1F3A]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#0B1F3A]/5 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-[430px]">

          {/* Logo / Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F3A] shadow-[0_12px_35px_rgba(11,31,58,0.18)]">
              <BarChart3 className="h-8 w-8 text-white" strokeWidth={1.8} />
            </div>

            <h1 className="text-[28px] font-bold tracking-[-0.5px] text-[#111827]">
              DPack Admin
            </h1>

            <p className="mt-2 text-[14px] text-gray-500">
              Manage your store from one place
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-[24px] border border-gray-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">

            {/* Card Header */}
            <div className="mb-7">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-[18px] w-[18px] text-[#0B1F3A]" />
                <h2 className="text-[18px] font-semibold text-gray-900">
                  Welcome back
                </h2>
              </div>

              <p className="text-[13px] leading-5 text-gray-500">
                Sign in with your administrator credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-[13px] font-semibold text-gray-700"
                >
                  Username
                </label>

                <div className="group relative">
                  <User
                    className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#0B1F3A]"
                    strokeWidth={1.8}
                  />

                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    autoFocus
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your username"
                    className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-11 pr-4 text-[14px] text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0B1F3A] focus:bg-white focus:ring-4 focus:ring-[#0B1F3A]/5"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-[13px] font-semibold text-gray-700"
                  >
                    Password
                  </label>
                </div>

                <div className="group relative">
                  <Lock
                    className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#0B1F3A]"
                    strokeWidth={1.8}
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-11 pr-12 text-[14px] text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0B1F3A] focus:bg-white focus:ring-4 focus:ring-[#0B1F3A]/5"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#0B1F3A]"
                    tabIndex={-1}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-[17px] w-[17px]" />
                    ) : (
                      <Eye className="h-[17px] w-[17px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] leading-5 text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-[51px] w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] text-[14px] font-semibold text-white shadow-[0_10px_25px_rgba(11,31,58,0.18)] transition duration-200 hover:bg-[#102A4C] hover:shadow-[0_12px_30px_rgba(11,31,58,0.24)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-5">
              <Lock className="h-3.5 w-3.5 text-gray-400" />
              <p className="text-[11px] text-gray-400">
                Secure administrator access
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 text-center">
            <p className="text-[12px] text-gray-400">
              This area is restricted to administrators.
            </p>

            <Link
              href="/"
              className="mt-2 inline-block text-[12px] font-medium text-[#0B1F3A] transition hover:underline"
            >
              ← Back to store
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
