"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  cartCount as countCartItems,
  cartSubtotal,
  formatINR,
  useCart,
} from "@/lib/cartBus";

import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Phone,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  CircleHelp,
  Zap,
  MapPin,
} from "lucide-react";

import { usePathname } from "next/navigation";

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  orange: "#F5A623",
  orangeDark: "#B83F1C",
  dark: "#0C203A",
  text: "#171717",
  muted: "#6B7280",
  border: "#E5E7EB",
  light: "#F7F7F5",
};

/* =========================================================
   NAVIGATION
========================================================= */

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Us",
    href: "/about-us",
    dropdown: true,
  },
  {
    name: "Products",
    href: "/products",
    dropdown: true,
  },
  {
    name: "Articles",
    href: "/articles",
    dropdown: true,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

/* =========================================================
   SOCIAL ICONS
========================================================= */

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.66.34-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M15 3h3.1c.35 1.75 1.42 3.16 2.9 4.05v3.15a8.5 8.5 0 0 1-3-1v6.1A5.7 5.7 0 1 1 13 9.8v3.2a2.5 2.5 0 1 0 2.8 2.3V3H15Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 12s0-4-1-5-2.2-1-2.2-1C17.8 5.5 12 5.5 12 5.5S6.2 5.5 4.2 6C4.2 6 2 6 1 7s-1 5-1 5 0 4 1 5 2.2 1 2.2 1c2 .5 7.8.5 7.8.5s5.8 0 7.8-.5c0 0 2.2 0 3.2-1s1-5 1-5ZM9.5 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.64 19.31c-.08-1.64-.02-3.61.41-5.48l1.1-4.66s-.28-.56-.28-1.38c0-1.3.75-2.27 1.68-2.27.79 0 1.17.59 1.17 1.3 0 .79-.5 1.97-.76 3.06-.22.91.46 1.65 1.36 1.65 1.63 0 2.73-1.72 2.73-3.76 0-1.55-1.04-2.72-2.93-2.72-2.14 0-3.47 1.6-3.47 3.39 0 .62.18 1.06.46 1.44.13.17.15.24.1.43l-.17.68c-.05.22-.2.3-.37.22-1.38-.56-2.02-2.06-2.02-3.74 0-2.78 2.35-6.12 7.02-6.12 3.75 0 6.22 2.72 6.22 5.64 0 3.86-2.15 6.75-5.32 6.75-1.07 0-2.08-.58-2.43-1.24l-.66 2.61c-.24.95-.71 1.9-1.14 2.64A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

/* =========================================================
   HEADER ICON
========================================================= */

function HeaderIcon({
  href,
  label,
  badge,
  children,
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        group
        relative
        flex
        items-center
        gap-2
        px-2
        transition-all
        duration-300
      "
    >
      <span
        className="
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          rounded-full
          text-[#171717]
          transition-all
          duration-300
          group-hover:bg-[#F6E7E1]
          group-hover:text-[#F5A623]
        "
      >
        {children}
      </span>

      {label !== "Search" && (
        <span
          className="
            hidden
            text-[12px]
            font-medium
            text-[#171717]
            xl:block
          "
        >
          {label}
        </span>
      )}

      {badge !== undefined && (
        <span
          className="
            absolute
            left-[27px]
            top-[-2px]
            flex
            h-[17px]
            min-w-[17px]
            items-center
            justify-center
            rounded-full
            bg-[#F5A623]
            px-1
            text-[8px]
            font-bold
            text-white
            ring-2
            ring-white
          "
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");

  const { wishlistCount } = useAuth();

  const cart = useCart();
  const cartItemCount = countCartItems(cart);
  const cartTotal = cartSubtotal(cart);

  /* =======================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =======================================================
     LOAD CATEGORIES
  ======================================================= */

  useEffect(() => {
    if (isAdminRoute) return undefined;

    let cancelled = false;

    async function loadCategories() {
      try {
        setCategoriesError("");

        const response = await fetch("/api/categories", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.error || "Unable to load categories."
          );
        }

        if (!cancelled) {
          setCategories(
            Array.isArray(data.categories)
              ? data.categories.filter(
                  (category) =>
                    category && category !== "All"
                )
              : []
          );
        }
      } catch (error) {
        console.error(
          "Navbar categories fetch failed:",
          error
        );

        if (!cancelled) {
          setCategoriesError(
            "Categories are temporarily unavailable."
          );
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, [isAdminRoute]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    if (!categoriesOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setCategoriesOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      closeOnEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        closeOnEscape
      );
  }, [categoriesOpen]);

  /* =======================================================
     ADMIN
  ======================================================= */

  if (isAdminRoute) return null;

  return (
    <>
      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header className="relative z-[100] w-full overflow-x-clip bg-white">

        {/* ===================================================
            TOP BAR
        =================================================== */}

        <div className="hidden h-[35px] border-b border-[#E5E7EB] bg-[#FAFAF9] sm:block">
          <div
            className="
              mx-auto
              flex
              h-full
              max-w-[1440px]
              items-center
              justify-between
              px-4
              sm:px-5
              lg:px-8
              xl:px-10
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-5">
              <p
                className="
                  hidden
                  text-[12px]
                  font-medium
                  text-[#171717]
                  md:block
                "
              >
                Welcome DPACK Store!
              </p>

              <div className="hidden items-center gap-3 md:flex">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-[#171717] transition-colors hover:text-[#F5A623]"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-[#171717] transition-colors hover:text-[#F5A623]"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="#"
                  aria-label="TikTok"
                  className="text-[#171717] transition-colors hover:text-[#F5A623]"
                >
                  <TikTokIcon />
                </a>

                <a
                  href="#"
                  aria-label="Youtube"
                  className="text-[#171717] transition-colors hover:text-[#F5A623]"
                >
                  <YoutubeIcon />
                </a>

                <a
                  href="#"
                  aria-label="Pinterest"
                  className="text-[#171717] transition-colors hover:text-[#F5A623]"
                >
                  <PinterestIcon />
                </a>
              </div>
            </div>

            {/* CENTER OFFER */}

            <div
              className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                items-center
                gap-2
                text-[12px]
                text-[#333]
                lg:flex
              "
            >
              <ChevronDown
                size={14}
                className="rotate-90 text-[#777]"
              />

              <span>
                Get 10% off Your First Order.
              </span>

              <Link
                href="/products"
                className="
                  font-semibold
                  underline
                  underline-offset-2
                  transition-colors
                  hover:text-[#F5A623]
                "
              >
                Shop Now
              </Link>

              <ChevronDown
                size={14}
                className="-rotate-90 text-[#777]"
              />
            </div>

            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-4 text-[12px] text-[#333]">
              <button
                type="button"
                className="
                  hidden
                  items-center
                  gap-1.5
                  transition-colors
                  hover:text-[#F5A623]
                  sm:flex
                "
              >
                <span>English</span>
                <ChevronDown size={12} />
              </button>

              <span className="hidden h-4 w-px bg-[#D9D9D9] sm:block" />
            </div>
          </div>
        </div>

        {/* ===================================================
            MAIN LOGO / MENU / ACCOUNT
        =================================================== */}

        <div
          className="
            h-[66px]
            border-b
            border-[#E5E7EB]
            bg-white
            sm:h-[74px]
            lg:h-[80px]
          "
        >
          <div
            className="
              mx-auto
              flex
              h-full
              max-w-[1440px]
              items-center
              justify-between
              gap-3
              px-4
              sm:px-5
              lg:px-8
              xl:px-10
            "
          >
            {/* LOGO */}

            <Link
              href="/"
              className="
                flex
                min-w-0
                shrink
                items-center
                transition-transform
                duration-300
                hover:scale-[1.02]
              "
            >
              <Image
                src="/logo (21).webp"
                alt="DPACK"
                width={165}
                height={55}
                priority
                className="
                  h-[39px]
                  w-auto
                  max-w-[145px]
                  object-contain
                  sm:h-[48px]
                  sm:max-w-[165px]
                  lg:h-[52px]
                "
              />
            </Link>

            {/* DESKTOP MENU */}

            <nav
              className="
                hidden
                items-center
                gap-7
                lg:flex
                xl:gap-9
              "
            >
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-1.5
                    whitespace-nowrap
                    py-4
                    uppercase
                    text-[15px]
                    font-semibold
                    text-[#171717]
                    transition-colors
                    duration-300
                    hover:text-[#F5A623]
                  "
                >
                  {item.name}

                  {item.dropdown && (
                    <ChevronDown
                      size={0}
                      strokeWidth={1.8}
                      className="
                        transition-transform
                        duration-300
                        group-hover:rotate-180
                      "
                    />
                  )}

                  <span
                    className="
                      absolute
                      bottom-[5px]
                      left-0
                      h-[2px]
                      w-full
                      origin-left
                      scale-x-0
                      bg-[#F5A623]
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />
                </Link>
              ))}
            </nav>

            {/* DESKTOP RIGHT SIDE */}

            <div
              className="
                hidden
                items-center
                gap-2
                lg:flex
              "
            >
              {/* PHONE */}

              <div className="mr-2 flex items-center gap-2.5">
                <Phone
                  size={22}
                  strokeWidth={1.7}
                  className="text-[#171717]"
                />

                <div className="leading-tight">
                  <a
                    href="tel:7669988825"
                    className="
                      block
                      whitespace-nowrap
                      text-[15px]
                      font-semibold
                      text-[#171717]
                      transition-colors
                      hover:text-[#F5A623]
                    "
                  >
                    +91-7669988825
                  </a>
                </div>
              </div>

              <div className="mx-1 h-9 w-px bg-[#E5E7EB]" />

              {/* ACCOUNT */}

              <HeaderIcon
                href="/my-account"
                label="Account"
              >
                <UserRound
                  size={22}
                  strokeWidth={1.7}
                />
              </HeaderIcon>

              {/* WISHLIST */}

              <HeaderIcon
                href="/wishlist"
                label="Wishlist"
                badge={wishlistCount}
              >
                <Heart
                  size={23}
                  strokeWidth={1.7}
                />
              </HeaderIcon>

              {/* CART */}

              <Link
                href="/cart"
                aria-label="Cart"
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-2
                  px-2
                "
              >
                <span
                  className="
                    flex
                    h-[38px]
                    w-[38px]
                    items-center
                    justify-center
                    rounded-full
                    text-[#171717]
                    transition-all
                    duration-300
                    group-hover:bg-[#F6E7E1]
                    group-hover:text-[#F5A623]
                  "
                >
                  <ShoppingBag
                    size={23}
                    strokeWidth={1.7}
                  />
                </span>

                <div className="hidden xl:block">
                  <span className="block text-[12px] font-medium text-[#171717]">
                    Cart
                  </span>

                  <span className="block text-[11px] font-semibold text-[#171717]">
                    {formatINR(cartTotal)}
                  </span>
                </div>

                <span
                  className="
                    absolute
                    left-[28px]
                    top-[-2px]
                    flex
                    h-[17px]
                    min-w-[17px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F5A623]
                    px-1
                    text-[8px]
                    font-bold
                    text-white
                    ring-2
                    ring-white
                  "
                >
                  {cartItemCount}
                </span>
              </Link>
            </div>

            {/* MOBILE ACTIONS */}

            <div className="flex shrink-0 items-center gap-1.5 lg:hidden">

              {/* MOBILE WISHLIST */}

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#0C203A]
                  transition-colors
                  hover:bg-[#F6E7E1]
                  hover:text-[#F5A623]
                  sm:h-10
                  sm:w-10
                "
              >
                <Heart
                  size={20}
                  strokeWidth={1.8}
                />

                {wishlistCount > 0 && (
                  <span
                    className="
                      absolute
                      right-0
                      top-0
                      flex
                      h-[15px]
                      min-w-[15px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F5A623]
                      px-1
                      text-[8px]
                      font-bold
                      text-white
                    "
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* MOBILE CART */}

              <Link
                href="/cart"
                aria-label="Cart"
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#0C203A]
                  transition-colors
                  hover:bg-[#F6E7E1]
                  hover:text-[#F5A623]
                  sm:h-10
                  sm:w-10
                "
              >
                <ShoppingBag
                  size={20}
                  strokeWidth={1.8}
                />

                <span
                  className="
                    absolute
                    right-0
                    top-0
                    flex
                    h-[15px]
                    min-w-[15px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F5A623]
                    px-1
                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  {cartItemCount}
                </span>
              </Link>

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F6E7E1]
                  text-[#F5A623]
                  sm:h-10
                  sm:w-10
                "
              >
                <Menu size={21} />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
            DESKTOP BOTTOM SEARCH NAV
        =================================================== */}

        <div className="hidden bg-[#0C203A] lg:block">
          <div
            className="
              mx-auto
              flex
              h-[63px]
              max-w-[1440px]
              items-center
              gap-7
              px-5
              lg:px-8
              xl:px-10
            "
          >
            {/* BROWSE CATEGORIES */}

            <div
              className="relative shrink-0"
              onMouseEnter={() =>
                setCategoriesOpen(true)
              }
              onMouseLeave={() =>
                setCategoriesOpen(false)
              }
            >
              <button
                type="button"
                aria-expanded={categoriesOpen}
                aria-haspopup="menu"
                className="
                  flex
                  items-center
                  gap-2
                  text-[13px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:text-[#F5A623]
                "
              >
                <Menu
                  size={20}
                  strokeWidth={1.8}
                />

                <span>Browse Categories</span>

                <ChevronDown
                  size={14}
                  className={`text-white/70 transition-transform ${
                    categoriesOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div
                  role="menu"
                  aria-label="Product categories"
                  className="
                    absolute
                    left-0
                    top-full
                    z-[120]
                    w-[280px]
                    pt-3
                  "
                >
                  <div
                    className="
                      max-h-[min(70vh,520px)]
                      overflow-y-auto
                      border
                      border-[#E5E7EB]
                      bg-white
                      py-2
                      text-[#171717]
                      shadow-[0_18px_45px_rgba(0,0,0,0.18)]
                    "
                  >
                    <Link
                      href="/products"
                      role="menuitem"
                      onClick={() =>
                        setCategoriesOpen(false)
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-[#E5E7EB]
                        px-5
                        py-3
                        text-[13px]
                        font-bold
                        text-[#0C203A]
                        transition-colors
                        hover:bg-[#F7F7F5]
                        hover:text-[#F5A623]
                      "
                    >
                      All Products
                      <ArrowRight size={14} />
                    </Link>

                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(
                          category
                        )}`}
                        role="menuitem"
                        onClick={() =>
                          setCategoriesOpen(false)
                        }
                        className="
                          flex
                          items-center
                          justify-between
                          px-5
                          py-3
                          text-[13px]
                          font-medium
                          transition-colors
                          hover:bg-[#F7F7F5]
                          hover:text-[#F5A623]
                        "
                      >
                        {category}

                        <ArrowRight
                          size={14}
                          className="text-gray-300"
                        />
                      </Link>
                    ))}

                    {categoriesError && (
                      <p
                        role="status"
                        className="px-5 py-3 text-xs text-gray-500"
                      >
                        {categoriesError}
                      </p>
                    )}

                    {!categoriesError &&
                      categories.length === 0 && (
                        <p className="px-5 py-3 text-xs text-gray-500">
                          Loading categories...
                        </p>
                      )}
                  </div>
                </div>
              )}
            </div>

            {/* SEARCH */}
<form
  onSubmit={(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = String(formData.get("q") || "").trim();

    if (!query) return;

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
  }}
  className="
    flex
    h-[46px]
    min-w-0
    max-w-[650px]
    flex-1
    overflow-hidden
    rounded-full
    border
    border-[#F5A623]
    bg-white
  "
>
  <div className="relative flex-1">
    <Search
      size={18}
      strokeWidth={1.8}
      className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        text-[#777]
      "
    />

    <input
      type="text"
      name="q"
      placeholder="I'm looking for..."
      autoComplete="off"
      className="
        h-full
        w-full
        bg-transparent
        pl-12
        pr-4
        text-[13px]
        text-[#171717]
        outline-none
        placeholder:text-[#999]
      "
    />
  </div>

  <button
    type="submit"
    className="
      flex
      w-[130px]
      shrink-0
      items-center
      justify-center
      gap-2
      bg-[#F5A623]
      text-[13px]
      font-semibold
      text-white
      transition-colors
      duration-300
      hover:bg-[#B83F1C]
    "
  >
    <Search size={17} />
    Search
  </button>
</form>

            {/* RIGHT QUICK LINKS */}

            <div className="ml-auto flex shrink-0 items-center">
              <Link
                href="/flash-sale"
                className="
                  flex
                  items-center
                  gap-1.5
                  border-r
                  border-white/15
                  px-4
                  text-[12px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:text-[#F5A623]
                "
              >
                <Zap
                  size={14}
                  className="text-[#F5A623]"
                />
                Flash Sale
              </Link>

              <Link
                href="/faqs"
                className="
                  flex
                  items-center
                  gap-1.5
                  px-4
                  text-[12px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:text-[#F5A623]
                "
              >
                <CircleHelp
                  size={14}
                  className="text-[#F5A623]"
                />
                FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE SEARCH
        =================================================== */}

        <div
          className="
            border-b
            border-[#E5E7EB]
            bg-white
            px-3
            py-2.5
            sm:px-4
            sm:py-3
            lg:hidden
          "
        >
         <form
  onSubmit={(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = String(formData.get("q") || "").trim();

    if (!query) return;

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
  }}
  className="
    flex
    h-[40px]
    w-full
    overflow-hidden
    rounded-full
    border
    border-[#F5A623]
    bg-white
    sm:h-[42px]
  "
>
  <div className="relative min-w-0 flex-1">
    <Search
      size={16}
      className="
        absolute
        left-3.5
        top-1/2
        -translate-y-1/2
        text-[#777]
        sm:left-4
      "
    />

    <input
      type="text"
      name="q"
      placeholder="Search products..."
      autoComplete="off"
      className="
        h-full
        w-full
        min-w-0
        bg-transparent
        pl-9
        pr-2
        text-[12px]
        text-[#171717]
        outline-none
        placeholder:text-[#999]
        sm:pl-10
        sm:text-[13px]
      "
    />
  </div>

  <button
    type="submit"
    className="
      flex
      w-[72px]
      shrink-0
      items-center
      justify-center
      bg-[#F5A623]
      text-[11px]
      font-semibold
      text-white
      sm:w-[85px]
      sm:text-[12px]
    "
  >
    Search
  </button>
</form>
        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            lg:hidden
          "
        >
          {/* OVERLAY */}

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          />

          {/* DRAWER */}

          <aside
            className="
              absolute
              right-0
              top-0
              flex
              h-full
              w-[88%]
              max-w-[390px]
              flex-col
              overflow-hidden
              bg-white
              shadow-2xl
              sm:w-[82%]
            "
          >
            {/* DRAWER TOP */}

            <div
              className="
                flex
                h-[56px]
                shrink-0
                items-center
                justify-between
                bg-[#0C203A]
                px-4
                sm:px-5
              "
            >
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white
                "
              >
                DPACK Menu
              </span>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F5A623]
                  text-white
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

              {/* LOGO */}

              <div
                className="
                  flex
                  items-center
                  border-b
                  border-[#E5E7EB]
                  px-4
                  py-4
                  sm:px-5
                  sm:py-5
                "
              >
                <Image
                  src="/logo (21).webp"
                  alt="DPACK"
                  width={145}
                  height={50}
                  className="
                    h-[40px]
                    w-auto
                    max-w-[145px]
                    object-contain
                    sm:h-[45px]
                  "
                />
              </div>

              {/* MOBILE NAV */}

              <nav className="px-4 py-2 sm:px-5 sm:py-3">
                {navLinks.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="
                      group
                      flex
                      min-h-[52px]
                      items-center
                      justify-between
                      border-b
                      border-[#E5E7EB]
                      py-3
                      text-[14px]
                      font-semibold
                      text-[#171717]
                      transition-colors
                      hover:text-[#F5A623]
                      active:text-[#F5A623]
                      sm:min-h-[56px]
                      sm:text-[15px]
                    "
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="
                          font-mono
                          text-[10px]
                          font-bold
                          text-[#F5A623]
                          sm:text-[11px]
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="truncate">
                        {item.name}
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-2">
                      {item.dropdown && (
                        <ChevronDown
                          size={14}
                          className="text-[#999]"
                        />
                      )}

                      <ArrowRight
                        size={15}
                        className="
                          text-[#F5A623]
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </span>
                  </Link>
                ))}
              </nav>

              {/* QUICK LINKS */}

              <div
                className="
                  mx-4
                  mt-3
                  grid
                  grid-cols-3
                  overflow-hidden
                  rounded-sm
                  border
                  border-[#E5E7EB]
                  sm:mx-5
                "
              >
                <Link
                  href="/wishlist"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex
                    min-w-0
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    border-r
                    border-[#E5E7EB]
                    px-1
                    py-3.5
                    text-[#0C203A]
                    transition-colors
                    hover:bg-[#F7F7F5]
                  "
                >
                  <Heart size={18} />

                  <span className="text-center text-[9px] font-semibold leading-tight sm:text-[10px]">
                    Wishlist
                    <br />
                    ({wishlistCount})
                  </span>
                </Link>

                <Link
                  href="/my-account"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex
                    min-w-0
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    border-r
                    border-[#E5E7EB]
                    px-1
                    py-3.5
                    text-[#0C203A]
                    transition-colors
                    hover:bg-[#F7F7F5]
                  "
                >
                  <UserRound size={18} />

                  <span className="text-[10px] font-semibold sm:text-[11px]">
                    Account
                  </span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex
                    min-w-0
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    px-1
                    py-3.5
                    text-[#0C203A]
                    transition-colors
                    hover:bg-[#F7F7F5]
                  "
                >
                  <ShoppingBag size={18} />

                  <span className="text-center text-[9px] font-semibold leading-tight sm:text-[10px]">
                    Cart
                    <br />
                    ({cartItemCount})
                  </span>
                </Link>
              </div>

              {/* CONTACT */}

              <div
                className="
                  mx-4
                  mt-4
                  bg-[#F6E7E1]
                  p-4
                  sm:mx-5
                  sm:mt-5
                  sm:p-5
                "
              >
                {/* PHONE */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F5A623]
                      text-white
                    "
                  >
                    <Phone size={15} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-[#F5A623]
                      "
                    >
                      Need Help?
                    </p>

                    <a
                      href="tel:+917669988825"
                      className="
                        mt-1
                        block
                        truncate
                        text-[13px]
                        font-bold
                        text-[#0C203A]
                        sm:text-[14px]
                      "
                    >
                      +91 766 998 8825
                    </a>
                  </div>
                </div>

                <div className="my-4 h-px bg-[#F5A623]/15" />

                {/* LOCATION / BRAND */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0C203A]
                      text-white
                    "
                  >
                    <MapPin size={15} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-[#F5A623]
                      "
                    >
                      DPACK Solutions
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        font-medium
                        leading-5
                        text-[#0C203A]
                        sm:text-[12px]
                      "
                    >
                      Protective Packaging Solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS */}

              <div className="mx-4 mt-4 grid grid-cols-2 gap-2 sm:mx-5">
                <Link
                  href="/flash-sale"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    border
                    border-[#E5E7EB]
                    px-3
                    py-3
                    text-[10px]
                    font-semibold
                    text-[#0C203A]
                    transition-colors
                    hover:border-[#F5A623]
                    hover:text-[#F5A623]
                  "
                >
                  <Zap
                    size={14}
                    className="text-[#F5A623]"
                  />
                  Flash Sale
                </Link>

                <Link
                  href="/faqs"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    border
                    border-[#E5E7EB]
                    px-3
                    py-3
                    text-[10px]
                    font-semibold
                    text-[#0C203A]
                    transition-colors
                    hover:border-[#F5A623]
                    hover:text-[#F5A623]
                  "
                >
                  <CircleHelp
                    size={14}
                    className="text-[#F5A623]"
                  />
                  FAQs
                </Link>
              </div>

              {/* CTA */}

              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <Link
                  href="/products"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    bg-[#F5A623]
                    px-4
                    py-3.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.05em]
                    text-white
                    transition-colors
                    duration-300
                    hover:bg-[#0C203A]
                    sm:px-5
                    sm:py-4
                    sm:text-[12px]
                  "
                >
                  <span>
                    Explore Products
                  </span>

                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
