"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   NAVIGATION DATA
========================================================= */

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
    dropdown: true,
  },
  {
    name: "Collection",
    href: "/collection",
    dropdown: true,
  },
  {
    name: "My Account",
    href: "/my-account",
  },
  {
    name: "Pages",
    href: "/pages",
    dropdown: true,
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =======================================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* =====================================================
          NORMAL HEADER
          NOT STICKY
      ===================================================== */}

      <header
        className="
          relative
          z-[100]
          w-full
          bg-white
        "
      >
        {/* ===================================================
            THIN TOP OFFER BAR
        =================================================== */}

        <div
          className="
            relative
            h-[24px]
            overflow-hidden
            bg-[#0B2A42]
            text-white
          "
        >
          {/* LEFT GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -left-10
              top-1/2

              h-16
              w-16

              -translate-y-1/2

              rounded-full
              bg-[#2F7180]/30
              blur-xl
            "
          />

          {/* RIGHT GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-10
              top-1/2

              h-16
              w-16

              -translate-y-1/2

              rounded-full
              bg-[#F5A623]/15
              blur-xl
            "
          />

          <div
            className="
              relative
              mx-auto

              flex
              h-full
              max-w-[1400px]
              items-center
              justify-center

              px-4
            "
          >
            <p
              className="
                flex
                items-center
                justify-center

                whitespace-nowrap

                text-[10px]
                font-medium
                tracking-[0.04em]
                text-white/90

                sm:text-[11px]
              "
            >
              Protective Packaging Solutions

              <span
                className="
                  mx-2
                  text-[#F5A623]
                "
              >
                •
              </span>

              Bulk Orders Available

              <Link
                href="/shop"
                className="
                  ml-3

                  hidden

                  font-bold
                  text-[#F5A623]

                  transition-colors
                  duration-300

                  hover:text-white

                  sm:inline
                "
              >
                Shop Now →
              </Link>
            </p>
          </div>
        </div>

        {/* ===================================================
            MAIN HEADER
        =================================================== */}

        <div
          className="
            h-[62px]

            border-b
            border-[#DCE3E7]

            bg-white
          "
        >
          <div
            className="
              mx-auto
              h-full
              max-w-[1400px]

              px-4
              sm:px-5
              lg:px-8
            "
          >
            <div
              className="
                relative

                flex
                h-full
                items-center
                justify-between
              "
            >
              {/* =============================================
                  LEFT CONTACT
              ============================================= */}

              <div
                className="
                  hidden
                  w-[410px]
                  items-center
                  gap-5

                  lg:flex
                "
              >
                {/* PHONE */}

                <div
                  className="
                    group
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <div
                    className="
                      flex
                      h-[34px]
                      w-[34px]
                      shrink-0
                      items-center
                      justify-center

                      rounded-full
                      bg-[#E6F1F6]

                      text-[#123B5D]

                      transition-all
                      duration-300

                      group-hover:bg-[#123B5D]
                      group-hover:text-white
                    "
                  >
                    <Phone
                      size={15}
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        mb-[4px]

                        text-[10px]
                        font-medium
                        leading-none
                        text-[#66737D]
                      "
                    >
                      Need Help?
                    </p>

                    <a
                      href="tel:+917669988825"
                      className="
                        block
                        whitespace-nowrap

                        text-[13px]
                        font-bold
                        leading-none
                        text-[#202830]

                        transition-colors
                        duration-300

                        hover:text-[#2F7180]
                      "
                    >
                      +91 766 998 8825
                    </a>
                  </div>
                </div>

                {/* DIVIDER */}

                <div
                  className="
                    h-[30px]
                    w-px
                    shrink-0
                    bg-[#DCE3E7]
                  "
                />

                {/* EMAIL */}

                <div
                  className="
                    group
                    flex
                    min-w-0
                    items-center
                    gap-2.5
                  "
                >
                  <div
                    className="
                      flex
                      h-[34px]
                      w-[34px]
                      shrink-0
                      items-center
                      justify-center

                      rounded-full
                      bg-[#E6F1F6]

                      text-[#123B5D]

                      transition-all
                      duration-300

                      group-hover:bg-[#123B5D]
                      group-hover:text-white
                    "
                  >
                    <Mail
                      size={15}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        mb-[4px]

                        text-[10px]
                        font-medium
                        leading-none
                        text-[#66737D]
                      "
                    >
                      Email Us
                    </p>

                    <a
                      href="mailto:info@dpacksolutions.com"
                      className="
                        block
                        whitespace-nowrap

                        text-[12px]
                        font-bold
                        leading-none
                        text-[#202830]

                        transition-colors
                        duration-300

                        hover:text-[#2F7180]
                      "
                    >
                      info@dpacksolutions.com
                    </a>
                  </div>
                </div>
              </div>

              {/* =============================================
                  CENTER LOGO
              ============================================= */}

              <Link
                href="/"
                className="
                  absolute
                  left-1/2

                  flex
                  -translate-x-1/2
                  items-center
                  justify-center
                "
              >
                <Image
                  src="/logo (21).webp"
                  alt="DPACK"
                  width={165}
                  height={50}
                  priority
                  className="
                    h-[43px]
                    w-auto
                    object-contain

                    transition-transform
                    duration-300

                    hover:scale-[1.03]
                  "
                />
              </Link>

              {/* =============================================
                  DESKTOP ECOMMERCE ICONS
              ============================================= */}

              <div
                className="
                  ml-auto
                  hidden
                  w-[410px]
                  items-center
                  justify-end
                  gap-1

                  lg:flex
                "
              >
                {/* SEARCH */}

                <HeaderIcon
                  href="/search"
                  label="Search"
                >
                  <Search
                    size={18}
                    strokeWidth={2}
                  />
                </HeaderIcon>

                {/* WISHLIST */}

                <HeaderIcon
                  href="/wishlist"
                  label="Wishlist"
                  badge="0"
                >
                  <Heart
                    size={18}
                    strokeWidth={2}
                  />
                </HeaderIcon>

                {/* ACCOUNT */}

                <HeaderIcon
                  href="/my-account"
                  label="Account"
                >
                  <UserRound
                    size={18}
                    strokeWidth={2}
                  />
                </HeaderIcon>

                {/* CART */}

                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="
                    group
                    relative

                    ml-1

                    flex
                    h-[38px]
                    w-[38px]
                    items-center
                    justify-center

                    rounded-full
                    bg-[#123B5D]

                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-[2px]
                    hover:bg-[#F5A623]
                    hover:text-[#123B5D]
                  "
                >
                  <ShoppingBag
                    size={17}
                    strokeWidth={2}
                  />

                  <span
                    className="
                      absolute
                      -right-[3px]
                      -top-[3px]

                      flex
                      h-[15px]
                      min-w-[15px]
                      items-center
                      justify-center

                      rounded-full
                      bg-[#F5A623]

                      px-1

                      text-[8px]
                      font-black
                      text-[#123B5D]

                      ring-2
                      ring-white
                    "
                  >
                    0
                  </span>
                </Link>
              </div>

              {/* =============================================
                  MOBILE MENU BUTTON
              ============================================= */}

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(true)
                }
                aria-label="Open menu"
                className="
                  ml-auto

                  flex
                  h-[36px]
                  w-[36px]
                  items-center
                  justify-center

                  rounded-full
                  bg-[#E6F1F6]

                  text-[#123B5D]

                  transition-colors
                  duration-300

                  hover:bg-[#123B5D]
                  hover:text-white

                  lg:hidden
                "
              >
                <Menu
                  size={20}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE SEARCH
        =================================================== */}

        <div
          className="
            border-b
            border-[#DCE3E7]

            bg-white

            px-4
            py-2

            lg:hidden
          "
        >
          <form
            action="/search"
            method="GET"
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                relative
                flex-1
              "
            >
              <Search
                size={15}
                className="
                  absolute
                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-[#66737D]
                "
              />

              <input
                type="text"
                name="q"
                placeholder="Search packaging products..."
                className="
                  h-[38px]
                  w-full

                  rounded-full

                  border
                  border-[#DCE3E7]

                  bg-[#F7F8F9]

                  pl-10
                  pr-4

                  text-[12px]
                  text-[#202830]

                  outline-none

                  placeholder:text-[#66737D]

                  transition-colors

                  focus:border-[#123B5D]
                "
              />
            </div>

            <button
              type="submit"
              className="
                flex
                h-[38px]
                items-center
                justify-center

                rounded-full
                bg-[#F5A623]

                px-4

                text-[11px]
                font-bold
                text-[#123B5D]

                transition-colors
                duration-300

                hover:bg-[#123B5D]
                hover:text-white
              "
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* =====================================================
          ONLY BOTTOM NAVBAR IS STICKY
      ===================================================== */}

      <nav
        className="
          sticky
          top-0
          z-[9999]

          hidden
          w-full

          bg-[#123B5D]

          shadow-[0_8px_25px_rgba(18,59,93,0.13)]

          lg:block
        "
      >
        <div
          className="
            mx-auto

            flex
            h-[48px]
            max-w-[1400px]
            items-center
            justify-center

            px-8
          "
        >
          <div
            className="
              flex
              h-full
              items-center
              gap-[38px]
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
                  h-full
                  items-center
                  gap-1.5

                  text-[14px]
                  font-semibold
                  text-white

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                {item.name}

                {item.dropdown && (
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className="
                      text-white/65

                      transition-transform
                      duration-300

                      group-hover:rotate-180
                      group-hover:text-[#F5A623]
                    "
                  />
                )}

                {/* HOVER LINE */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0

                    h-[3px]
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
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[10000]

            lg:hidden
          "
        >
          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0

              bg-[#0B2A42]/70

              backdrop-blur-[3px]
            "
            onClick={() =>
              setMobileOpen(false)
            }
          />

          {/* DRAWER */}

          <div
            className="
              absolute
              right-0
              top-0

              h-full
              w-[88%]
              max-w-[390px]

              overflow-y-auto

              bg-white

              shadow-2xl
            "
          >
            {/* ===============================================
                DRAWER TOP
            =============================================== */}

            <div
              className="
                flex
                h-[32px]
                items-center
                justify-between

                bg-[#123B5D]

                px-5

                text-white
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                "
              >
                DPACK Menu
              </span>

              <span
                className="
                  bg-[#F5A623]

                  px-2
                  py-[3px]

                  text-[8px]
                  font-black
                  text-[#123B5D]
                "
              >
                PACK SMART
              </span>
            </div>

            {/* ===============================================
                DRAWER HEADER
            =============================================== */}

            <div
              className="
                flex
                h-[65px]
                items-center
                justify-between

                border-b
                border-[#DCE3E7]

                px-5
              "
            >
              <Image
                src="/logo (21).webp"
                alt="DPACK"
                width={140}
                height={45}
                className="
                  h-[42px]
                  w-auto
                  object-contain
                "
              />

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                aria-label="Close menu"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-full
                  bg-[#E6F1F6]

                  text-[#123B5D]

                  transition-colors
                  duration-300

                  hover:bg-[#123B5D]
                  hover:text-white
                "
              >
                <X size={19} />
              </button>
            </div>

            {/* ===============================================
                MOBILE NAVIGATION
            =============================================== */}

            <div className="px-5 py-4">
              {navLinks.map(
                (item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="
                      group

                      flex
                      items-center
                      justify-between

                      border-b
                      border-[#DCE3E7]

                      py-3.5

                      text-[15px]
                      font-semibold
                      text-[#202830]

                      transition-colors
                      duration-300

                      hover:text-[#123B5D]
                    "
                  >
                    <span
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-[10px]
                          font-bold
                          text-[#2F7180]
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {item.name}
                    </span>

                    <ArrowRight
                      size={15}
                      className="
                        text-[#F5A623]

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                )
              )}
            </div>

            {/* ===============================================
                MOBILE ECOMMERCE ICONS
            =============================================== */}

            <div
              className="
                mx-5

                grid
                grid-cols-3

                border
                border-[#DCE3E7]
              "
            >
              <Link
                href="/wishlist"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1.5

                  border-r
                  border-[#DCE3E7]

                  py-3

                  text-[#123B5D]
                "
              >
                <Heart size={17} />

                <span
                  className="
                    text-[10px]
                    font-bold
                  "
                >
                  Wishlist
                </span>
              </Link>

              <Link
                href="/my-account"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1.5

                  border-r
                  border-[#DCE3E7]

                  py-3

                  text-[#123B5D]
                "
              >
                <UserRound size={17} />

                <span
                  className="
                    text-[10px]
                    font-bold
                  "
                >
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
                  flex-col
                  items-center
                  justify-center
                  gap-1.5

                  py-3

                  text-[#123B5D]
                "
              >
                <ShoppingBag size={17} />

                <span
                  className="
                    text-[10px]
                    font-bold
                  "
                >
                  Cart
                </span>
              </Link>
            </div>

            {/* ===============================================
                CONTACT
            =============================================== */}

            <div
              className="
                mx-5
                mt-5
                bg-[#E6F1F6]
                p-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center

                    rounded-full
                    bg-[#123B5D]

                    text-white
                  "
                >
                  <Phone size={14} />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[#2F7180]
                    "
                  >
                    Need Help?
                  </p>

                  <a
                    href="tel:+917669988825"
                    className="
                      mt-1
                      block

                      text-[14px]
                      font-bold
                      text-[#123B5D]
                    "
                  >
                    +91 766 998 8825
                  </a>
                </div>
              </div>

              <div
                className="
                  my-3
                  h-px
                  bg-[#123B5D]/10
                "
              />

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center

                    rounded-full
                    bg-[#123B5D]

                    text-white
                  "
                >
                  <Mail size={14} />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[#2F7180]
                    "
                  >
                    Email Us
                  </p>

                  <a
                    href="mailto:info@dpacksolutions.com"
                    className="
                      mt-1
                      block

                      text-[12px]
                      font-semibold
                      text-[#123B5D]
                    "
                  >
                    info@dpacksolutions.com
                  </a>
                </div>
              </div>
            </div>

            {/* ===============================================
                SHOP CTA
            =============================================== */}

            <div className="px-5 py-5">
              <Link
                href="/shop"
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

                  px-5
                  py-3.5

                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.04em]
                  text-[#123B5D]

                  transition-colors
                  duration-300

                  hover:bg-[#123B5D]
                  hover:text-white
                "
              >
                Explore Products

                <ArrowUpRight
                  size={16}
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   DESKTOP HEADER ICON
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
        h-[38px]
        w-[38px]
        items-center
        justify-center

        rounded-full

        text-[#202830]

        transition-all
        duration-300

        hover:bg-[#E6F1F6]
        hover:text-[#123B5D]
      "
    >
      <span
        className="
          transition-transform
          duration-300

          group-hover:scale-110
        "
      >
        {children}
      </span>

      {badge !== undefined && (
        <span
          className="
            absolute
            right-0
            top-0

            flex
            h-[14px]
            min-w-[14px]
            items-center
            justify-center

            rounded-full
            bg-[#F5A623]

            px-[3px]

            text-[8px]
            font-black
            text-[#123B5D]
          "
        >
          {badge}
        </span>
      )}
    </Link>
  );
}