"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ordersAPI, userAPI } from "@/lib/apiClient";
import { useAuth } from "@/app/context/AuthContext";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock3,
  ArrowRight,
  Mail,
  Phone,
  Edit3,
  Home,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: User,
  },
  {
    id: "orders",
    label: "My Orders",
    icon: Package,
  },
  {
    id: "address",
    label: "My Address",
    icon: MapPin,
  },
  {
    id: "account",
    label: "Account Details",
    icon: User,
  },
];

export default function MyAccountPage() {
  const router = useRouter();
  const { user, hydrated, isLoggedIn, logout, wishlistCount } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: { line1: "", line2: "", city: "", state: "", pincode: "", country: "India" },
  });

  useEffect(() => {
    if (!hydrated || !isLoggedIn) return;
    let cancelled = false;
    ordersAPI.list()
      .then((result) => {
        if (!cancelled) setOrders(Array.isArray(result.orders) ? result.orders : []);
      })
      .catch((fetchError) => {
        if (!cancelled) setError(fetchError.message || "Could not load your orders.");
      })
      .finally(() => {
        if (!cancelled) setLoadingOrders(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, isLoggedIn]);

  const accountProfile = profileEdited
    ? profile
    : {
        name: user?.name || "",
        email: user?.email || "",
        address: {
          line1: user?.address?.line1 || "",
          line2: user?.address?.line2 || "",
          city: user?.address?.city || "",
          state: user?.address?.state || "",
          pincode: user?.address?.pincode || "",
          country: user?.address?.country || "India",
        },
      };

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const result = await userAPI.updateProfile({
        name: accountProfile.name,
        email: accountProfile.email,
        address: accountProfile.address,
      });
      setProfile((current) => ({
        ...current,
        name: result.user.name || "",
        email: result.user.email || "",
        address: {
          line1: result.user.address?.line1 || "",
          line2: result.user.address?.line2 || "",
          city: result.user.address?.city || "",
          state: result.user.address?.state || "",
          pincode: result.user.address?.pincode || "",
          country: result.user.address?.country || "India",
        },
      }));
      setProfileEdited(true);
      setNotice("Account details saved.");
    } catch (saveError) {
      setError(saveError.message || "Could not save account details.");
    } finally {
      setSaving(false);
    }
  };

  const updateAddress = (field, value) => {
    setProfileEdited(true);
    setProfile((current) => ({
      ...current,
      address: { ...accountProfile.address, [field]: value },
    }));
  };

  if (!hydrated) {
    return <main className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">Loading account…</main>;
  }

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center text-[#081A33]">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="text-sm text-gray-500">Your orders, saved products, and account details are available after signing in.</p>
        <Link href="/login?next=%2Fmy-account" className="bg-[#081A33] px-6 py-3 text-sm font-bold text-white">Sign in</Link>
      </main>
    );
  }

  const displayOrders = orders.map((order) => {
    const status = order.status || "pending";
    const statusType = ["delivered", "shipped", "cancelled"].includes(status) ? status : "processing";
    return {
      id: order._id,
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "—",
      items: order.items?.length || 0,
      amount: Number(order.total || 0),
      status: status.charAt(0).toUpperCase() + status.slice(1),
      statusType,
    };
  });

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#081A33] overflow-hidden">
      <style jsx global>{`
        @keyframes accountFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes accountFadeRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes accountFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes accountPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(245, 166, 35, 0);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(245, 166, 35, 0.08);
          }
        }

        @keyframes accountLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .account-fade-up {
          animation: accountFadeUp 0.7s ease forwards;
        }

        .account-fade-right {
          animation: accountFadeRight 0.7s ease forwards;
        }

        .account-float {
          animation: accountFloat 4s ease-in-out infinite;
        }

        .account-pulse {
          animation: accountPulse 2.5s ease-in-out infinite;
        }

        .account-delay-1 {
          animation-delay: 0.1s;
        }

        .account-delay-2 {
          animation-delay: 0.2s;
        }

        .account-delay-3 {
          animation-delay: 0.3s;
        }

        .account-delay-4 {
          animation-delay: 0.4s;
        }

        .account-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .account-scroll::-webkit-scrollbar-thumb {
          background: #f5a623;
        }
      `}</style>

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#081A33]">
        <div className="absolute -right-20 -top-20 h-72 w-72 bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 bg-[#F5A623]/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12">
          <div className="account-fade-right opacity-0">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
              <Link
                href="/"
                className="transition hover:text-[#F5A623]"
              >
                Home
              </Link>

              <ChevronRight size={15} />

              <span className="text-[#F5A623]">My Account</span>
            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F5A623]">
                  DPACK CUSTOMER AREA
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  My Account
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                  Manage your orders, account details, addresses and
                  packaging purchases from one place.
                </p>
              </div>

              <div className="flex items-center gap-3 border border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="flex h-11 w-11 items-center justify-center bg-[#F5A623] text-[#081A33]">
                  <User size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/45">
                    Welcome back
                  </p>

                  <p className="font-semibold text-white">
                    {accountProfile.name || "Customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN ACCOUNT AREA
      ========================================================= */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="account-fade-right opacity-0 account-delay-1">
            <div className="border border-[#081A33]/10 bg-white">

              {/* Profile */}
              <div className="border-b border-[#081A33]/10 bg-[#081A33] p-6">
                <div className="flex items-center gap-4">
                  <div className="account-pulse flex h-14 w-14 shrink-0 items-center justify-center bg-[#F5A623] text-[#081A33]">
                    <User size={25} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/45">
                      Account
                    </p>

                    <h3 className="mt-1 font-semibold text-white">
                      {accountProfile.name || "Customer"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`group relative mb-1 flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium transition-all ${
                        active
                          ? "bg-[#FFF4DD] text-[#081A33]"
                          : "text-[#081A33]/65 hover:bg-[#F7F8FA] hover:text-[#081A33]"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-[#F5A623]" />
                      )}

                      <span className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={
                            active
                              ? "text-[#F5A623]"
                              : "text-[#081A33]/50"
                          }
                        />

                        {item.label}
                      </span>

                      <ChevronRight
                        size={15}
                        className={`transition ${
                          active
                            ? "translate-x-0 text-[#F5A623]"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  );
                })}

                <div className="my-3 border-t border-[#081A33]/10" />

                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            {/* Help box */}
            <div className="mt-5 border border-[#F5A623]/20 bg-[#FFF9EF] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#F5A623] text-[#081A33]">
                <ShieldCheck size={19} />
              </div>

              <h4 className="font-semibold text-[#081A33]">
                Need Help?
              </h4>

              <p className="mt-2 text-xs leading-6 text-[#081A33]/55">
                Our team is available to help you with orders and
                packaging requirements.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#081A33] transition hover:text-[#F5A623]"
              >
                Contact Support
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div className="min-w-0">

            {/* ===================================================
                DASHBOARD
            =================================================== */}

            {activeTab === "dashboard" && (
              <div className="space-y-8">

                {/* Welcome */}
                <div className="account-fade-up opacity-0 account-delay-1 border border-[#081A33]/10 bg-white p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                        ACCOUNT DASHBOARD
                      </p>

                      <h2 className="text-2xl font-bold text-[#081A33] sm:text-3xl">
                        Hello, {accountProfile.name || "Customer"}
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#081A33]/55">
                        From your account dashboard you can view your
                        recent orders, manage your addresses and update
                        your account details.
                      </p>
                    </div>

                    <Link
                      href="/products"
                      className="group inline-flex shrink-0 items-center justify-center gap-3 bg-[#F5A623] px-6 py-3.5 text-sm font-bold text-[#081A33] transition hover:bg-[#081A33] hover:text-white"
                    >
                      Continue Shopping
                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                  <AccountStat
                    icon={Package}
                    number={String(orders.length).padStart(2, "0")}
                    label="Total Orders"
                    delay="account-delay-1"
                  />

                  <AccountStat
                    icon={Truck}
                    number={String(orders.filter((order) => ["pending", "confirmed", "shipped"].includes(order.status)).length).padStart(2, "0")}
                    label="Active Order"
                    delay="account-delay-2"
                  />

                  <AccountStat
                    icon={CheckCircle2}
                    number={String(orders.filter((order) => order.status === "delivered").length).padStart(2, "0")}
                    label="Delivered"
                    delay="account-delay-3"
                  />

                  <AccountStat
                    icon={Heart}
                    number={String(wishlistCount).padStart(2, "0")}
                    label="Wishlist"
                    delay="account-delay-4"
                  />

                </div>

                {/* Recent Orders */}
                <div className="account-fade-up opacity-0 account-delay-2 border border-[#081A33]/10 bg-white">

                  <div className="flex flex-col justify-between gap-3 border-b border-[#081A33]/10 p-6 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                        ORDER HISTORY
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-[#081A33]">
                        Recent Orders
                      </h2>
                    </div>

                    <button
                      onClick={() => setActiveTab("orders")}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#081A33] hover:text-[#F5A623]"
                    >
                      View All
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="account-scroll overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="bg-[#F7F8FA] text-left text-xs uppercase tracking-wider text-[#081A33]/45">
                          <th className="px-6 py-4 font-semibold">
                            Order
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Date
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Items
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Total
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Status
                          </th>

                          <th className="px-6 py-4" />
                        </tr>
                      </thead>

                      <tbody>
                        {displayOrders.slice(0, 5).map((order) => (
                          <OrderRow
                            key={order.id}
                            order={order}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Address + Account */}
                <div className="grid gap-5 md:grid-cols-2">

                  <div className="account-fade-up opacity-0 account-delay-3 border border-[#081A33]/10 bg-white p-6">
                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center bg-[#FFF4DD] text-[#F5A623]">
                          <MapPin size={19} />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-[#081A33]/40">
                            Default
                          </p>

                          <h3 className="font-bold text-[#081A33]">
                            Billing Address
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab("address")}
                        className="text-[#081A33]/40 transition hover:text-[#F5A623]"
                      >
                        <Edit3 size={17} />
                      </button>
                    </div>

                    <div className="text-sm leading-7 text-[#081A33]/60">
                      <p className="font-semibold text-[#081A33]">
                        {accountProfile.name || "Customer"}
                      </p>

                      {accountProfile.address?.line1 && <p>{accountProfile.address.line1}</p>}
                      {(accountProfile.address?.city || accountProfile.address?.state) && <p>{[accountProfile.address.city, accountProfile.address.state].filter(Boolean).join(", ")}</p>}
                      {(accountProfile.address?.country || accountProfile.address?.pincode) && <p>{[accountProfile.address.country || "India", accountProfile.address.pincode].filter(Boolean).join(" - ")}</p>}
                    </div>
                  </div>

                  <div className="account-fade-up opacity-0 account-delay-4 border border-[#081A33]/10 bg-white p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#FFF4DD] text-[#F5A623]">
                        <User size={19} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#081A33]/40">
                          Profile
                        </p>

                        <h3 className="font-bold text-[#081A33]">
                          Account Details
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-[#081A33]/60">
                        <Mail size={16} className="text-[#F5A623]" />
                        {accountProfile.email || "No email added"}
                      </div>

                      <div className="flex items-center gap-3 text-[#081A33]/60">
                        <Phone size={16} className="text-[#F5A623]" />
                        {user?.mobile || "No phone number"}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("account")}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#081A33] transition hover:text-[#F5A623]"
                    >
                      Edit Details
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* ===================================================
                ORDERS
            =================================================== */}

            {activeTab === "orders" && (
              <div className="account-fade-up opacity-0">
                <AccountSectionHeader
                  eyebrow="ORDER HISTORY"
                  title="My Orders"
                  description="Track and manage your recent DPACK orders."
                />

                <div className="mt-6 space-y-4">
                  {error && <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
                  {loadingOrders ? (
                    <p className="border border-gray-200 bg-white p-5 text-sm text-gray-500">Loading your orders…</p>
                  ) : displayOrders.length === 0 ? (
                    <div className="border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                      No orders yet. <Link href="/products" className="font-semibold text-[#081A33] underline">Browse products</Link>
                    </div>
                  ) : displayOrders.map((order) => (
                    <div
                      key={order.id}
                      className="group border border-[#081A33]/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#F5A623]/40 hover:shadow-[0_15px_40px_rgba(8,26,51,0.07)] sm:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#FFF4DD] text-[#F5A623]">
                            <ShoppingBag size={20} />
                          </div>

                          <div>
                            <h3 className="font-bold text-[#081A33]">
                              {order.id}
                            </h3>

                            <p className="mt-1 text-xs text-[#081A33]/45">
                              Placed on {order.date}
                            </p>

                            <p className="mt-2 text-sm text-[#081A33]/60">
                              {order.items} product
                              {order.items > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:min-w-[450px]">

                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#081A33]/35">
                              Total
                            </p>

                            <p className="mt-1 font-bold text-[#081A33]">
                              ₹{order.amount.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#081A33]/35">
                              Status
                            </p>

                            <StatusBadge order={order} />
                          </div>

                          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#081A33] transition hover:text-[#F5A623]">
                            View Order
                            <ArrowRight size={14} />
                          </button>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================
                ADDRESS
            =================================================== */}

            {activeTab === "address" && (
              <div className="account-fade-up opacity-0">
                <AccountSectionHeader
                  eyebrow="ADDRESS BOOK"
                  title="My Address"
                  description="Manage your billing and delivery address."
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  <AddressCard
                    title="Billing Address"
                    label="Default"
                    name={accountProfile.name}
                    mobile={user?.mobile}
                    address={user?.billingAddress?.line1 ? user.billingAddress : accountProfile.address}
                    onEdit={() => setActiveTab("account")}
                  />

                  <AddressCard
                    title="Shipping Address"
                    label="Default"
                    name={accountProfile.name}
                    mobile={user?.mobile}
                    address={accountProfile.address}
                    onEdit={() => setActiveTab("account")}
                  />

                </div>

                <div className="mt-5 border border-[#F5A623]/20 bg-[#FFF9EF] p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F5A623] text-[#081A33]">
                        <MapPin size={19} />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#081A33]">
                          Need to change your address?
                        </h3>

                        <p className="mt-1 text-sm text-[#081A33]/55">
                          Update your address before placing your next
                          order.
                        </p>
                      </div>
                    </div>

                    <button onClick={() => setActiveTab("account")} className="inline-flex items-center justify-center gap-2 bg-[#081A33] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#F5A623] hover:text-[#081A33]">
                      <Edit3 size={14} />
                      Edit Address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================
                ACCOUNT DETAILS
            =================================================== */}

            {activeTab === "account" && (
              <div className="account-fade-up opacity-0">
                <AccountSectionHeader
                  eyebrow="PROFILE SETTINGS"
                  title="Account Details"
                  description="Update your personal information and contact details."
                />

                <div className="mt-6 border border-[#081A33]/10 bg-white p-6 sm:p-8">

                  <div className="grid gap-5 md:grid-cols-2">

                    <AccountInput
                      label="First Name"
                      value={accountProfile.name.split(/\s+/)[0] || ""}
                      onChange={(value) => {
                        setProfileEdited(true);
                        setProfile((current) => ({
                          ...current,
                          name: `${value} ${accountProfile.name.split(/\s+/).slice(1).join(" ")}`.trim(),
                        }));
                      }}
                    />

                    <AccountInput
                      label="Last Name"
                      value={accountProfile.name.split(/\s+/).slice(1).join(" ")}
                      onChange={(value) => {
                        setProfileEdited(true);
                        setProfile((current) => ({
                          ...current,
                          name: `${accountProfile.name.split(/\s+/)[0] || ""} ${value}`.trim(),
                        }));
                      }}
                    />

                    <AccountInput
                      label="Email Address"
                      value={accountProfile.email}
                      type="email"
                      onChange={(value) => {
                        setProfileEdited(true);
                        setProfile((current) => ({ ...current, email: value }));
                      }}
                    />

                    <AccountInput
                      label="Phone Number"
                      value={user?.mobile || ""}
                      disabled
                    />

                  </div>

                  <div className="mt-6 border-t border-[#081A33]/10 pt-6">
                    <h3 className="mb-5 font-bold text-[#081A33]">
                      Delivery Address
                    </h3>

                    <div className="grid gap-5 md:grid-cols-2">

                      <AccountInput
                        label="Street address"
                        value={accountProfile.address.line1}
                        onChange={(value) => updateAddress("line1", value)}
                      />

                      <AccountInput
                        label="Apartment / landmark"
                        value={accountProfile.address.line2}
                        onChange={(value) => updateAddress("line2", value)}
                      />
                      <AccountInput
                        label="City"
                        value={accountProfile.address.city}
                        onChange={(value) => updateAddress("city", value)}
                      />
                      <AccountInput
                        label="State"
                        value={accountProfile.address.state}
                        onChange={(value) => updateAddress("state", value)}
                      />
                      <AccountInput
                        label="Pincode"
                        value={accountProfile.address.pincode}
                        onChange={(value) => updateAddress("pincode", value)}
                      />
                    </div>
                  </div>

                  {error && <p role="alert" className="mt-5 text-sm text-red-600">{error}</p>}
                  {notice && <p role="status" className="mt-5 text-sm text-green-700">{notice}</p>}
                  <div className="mt-7 flex justify-end">
                    <button onClick={saveProfile} disabled={saving} className="group inline-flex items-center gap-3 bg-[#F5A623] px-7 py-3.5 text-sm font-bold text-[#081A33] transition hover:bg-[#081A33] hover:text-white disabled:opacity-50">
                      {saving ? "Saving…" : "Save Changes"}
                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM FEATURES
      ========================================================= */}

      <section className="border-t border-[#081A33]/10 bg-white">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-3">

          <Feature
            icon={Truck}
            title="Reliable Delivery"
            text="Fast and secure delivery across India."
          />

          <Feature
            icon={ShieldCheck}
            title="Secure Shopping"
            text="Your account and order information stays protected."
          />

          <Feature
            icon={Package}
            title="Quality Packaging"
            text="Packaging solutions designed for dependable protection."
          />

        </div>
      </section>
    </main>
  );
}

/* =============================================================
   COMPONENTS
============================================================= */

function AccountStat({
  icon: Icon,
  number,
  label,
  delay,
}) {
  return (
    <div
      className={`account-fade-up opacity-0 ${delay} group border border-[#081A33]/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#F5A623]/40 hover:shadow-[0_15px_35px_rgba(8,26,51,0.06)]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center bg-[#FFF4DD] text-[#F5A623] transition group-hover:bg-[#F5A623] group-hover:text-[#081A33]">
          <Icon size={20} />
        </div>

        <span className="text-3xl font-bold text-[#081A33]">
          {number}
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#081A33]/45">
        {label}
      </p>
    </div>
  );
}

function OrderRow({ order }) {
  return (
    <tr className="border-t border-[#081A33]/10 transition hover:bg-[#FFF9EF]">
      <td className="px-6 py-5">
        <span className="font-bold text-[#081A33]">
          {order.id}
        </span>
      </td>

      <td className="px-6 py-5 text-sm text-[#081A33]/55">
        {order.date}
      </td>

      <td className="px-6 py-5 text-sm text-[#081A33]/55">
        {order.items}
      </td>

      <td className="px-6 py-5 font-semibold text-[#081A33]">
        ₹{order.amount.toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-5">
        <StatusBadge order={order} />
      </td>

      <td className="px-6 py-5">
        <button className="flex h-9 w-9 items-center justify-center border border-[#081A33]/10 text-[#081A33]/45 transition hover:border-[#F5A623] hover:text-[#F5A623]">
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
}

function StatusBadge({ order }) {
  const styles = {
    delivered:
      "bg-green-50 text-green-700 border-green-200",
    shipped:
      "bg-blue-50 text-blue-700 border-blue-200",
    processing:
      "bg-[#FFF4DD] text-[#A86600] border-[#F5A623]/30",
    cancelled:
      "bg-red-50 text-red-700 border-red-200",
  };

  const icons = {
    delivered: CheckCircle2,
    shipped: Truck,
    processing: Clock3,
    cancelled: Clock3,
  };

  const Icon = icons[order.statusType];

  return (
    <span
      className={`mt-2 inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[order.statusType]}`}
    >
      <Icon size={12} />
      {order.status}
    </span>
  );
}

function AccountSectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#081A33]">
        {title}
      </h2>

      <div className="mt-4 h-[2px] w-14 bg-[#F5A623]" />

      <p className="mt-4 text-sm leading-7 text-[#081A33]/55">
        {description}
      </p>
    </div>
  );
}

function AddressCard({ title, label, name, mobile, address, onEdit }) {
  return (
    <div className="group border border-[#081A33]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F5A623]/40 hover:shadow-[0_15px_35px_rgba(8,26,51,0.06)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center bg-[#FFF4DD] text-[#F5A623]">
            <Home size={19} />
          </div>

          <div>
            <h3 className="font-bold text-[#081A33]">
              {title}
            </h3>

            <span className="mt-1 inline-block text-[9px] font-bold uppercase tracking-wider text-[#F5A623]">
              {label}
            </span>
          </div>
        </div>

        <button onClick={onEdit} className="text-[#081A33]/35 transition hover:text-[#F5A623]">
          <Edit3 size={17} />
        </button>
      </div>

      <div className="mt-6 border-t border-[#081A33]/10 pt-5 text-sm leading-7 text-[#081A33]/60">
        <p className="font-semibold text-[#081A33]">
          {name || "Customer"}
        </p>

        {address?.line1 && <p>{address.line1}</p>}
        {address?.line2 && <p>{address.line2}</p>}
        {(address?.city || address?.state) && <p>{[address.city, address.state].filter(Boolean).join(", ")}</p>}
        {(address?.country || address?.pincode) && <p>{[address.country || "India", address.pincode].filter(Boolean).join(" - ")}</p>}
        {mobile && <p className="mt-2">{mobile}</p>}
        {!address?.line1 && <p className="text-[#081A33]/40">No address saved yet.</p>}
      </div>
    </div>
  );
}

function AccountInput({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#081A33]/55">
        {label}
      </label>

      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="h-12 w-full border border-[#081A33]/15 bg-[#F7F8FA] px-4 text-sm text-[#081A33] outline-none transition placeholder:text-[#081A33]/25 focus:border-[#F5A623] focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group border-r border-[#081A33]/10 p-7 last:border-r-0">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#FFF4DD] text-[#F5A623] transition group-hover:bg-[#F5A623] group-hover:text-[#081A33]">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="font-bold text-[#081A33]">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-6 text-[#081A33]/50">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}