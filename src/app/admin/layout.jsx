"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  Grid3x3,
  ShoppingBag,
  TicketPercent,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Grid3x3 },
  { href: "/admin/inventory", label: "Inventory", icon: Layers },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, hydrated, isLoggedIn, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const timer = setTimeout(() => {
      setReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [hydrated]);

  useEffect(() => {
    if (!ready) return;

    if (!isLoggedIn || user?.role !== "admin") {
      router.replace("/admin-login");
    }
  }, [ready, isLoggedIn, user, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  if (!hydrated || !ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F6FA]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3d7a72] border-t-transparent" />
        <p className="text-sm text-gray-500">
          Checking authentication…
        </p>
      </div>
    );
  }

  if (!isLoggedIn || user?.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4F6FA]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3d7a72] border-t-transparent" />
        <p className="text-sm text-gray-500">
          Redirecting…
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-[#F4F6FA]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 flex-col overflow-y-auto overscroll-contain bg-black text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 min-h-16 shrink-0 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rust text-white">
            <BarChart3 className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              DPack Admin
            </p>
            <p className="text-[10px] text-white/40">
              Control Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="ml-auto rounded-lg p-1.5 text-white/50 hover:bg-white/10 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-rust text-white shadow-md"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span>{label}</span>

                {active && (
                  <ChevronRight className="ml-auto h-3.5 w-3.5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Profile */}
        <div className="mt-auto shrink-0 border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rust text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">
                {user?.name || "Admin"}
              </p>
              <p className="truncate text-[11px] text-white/40">
                {user?.email || user?.mobile}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Area */}
      <div className="flex h-dvh min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="relative z-30 flex h-16 min-h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="flex min-w-0 items-center gap-1.5 overflow-hidden text-sm text-gray-500">
            <Link
              href="/admin"
              className="shrink-0 hover:text-gray-900"
            >
              Admin
            </Link>

            {pathname !== "/admin" && (
              <>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />

                <span className="truncate font-medium capitalize text-gray-900">
                  {pathname
                    .split("/")
                    .filter(Boolean)
                    .pop()
                    ?.replace(/-/g, " ")}
                </span>
              </>
            )}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <span className="hidden text-xs text-gray-400 sm:inline">
              Hello Mr. Admin
            </span>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorY: "auto",
            touchAction: "pan-y",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}