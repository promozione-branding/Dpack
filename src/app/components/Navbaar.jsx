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
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     BODY LOCK WHEN MOBILE MENU OPEN
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header
        className={`
          fixed
          top-0
          left-0
          w-full
          z-[9999]
          bg-white
          transition-all
          duration-300
          ${isScrolled ? "shadow-md" : ""}
        `}
      >
        {/* =================================================
            TOP OFFER BAR
        ================================================= */}

        <div className="w-full bg-[#171717] text-white">
          <div
            className="
              h-[40px]
              flex
              items-center
              justify-center
              px-4
            "
          >
            <p
              className="
                text-[13px]
                md:text-[14px]
                font-medium
                tracking-[0.01em]
                text-center
                text-white
              "
            >
              Exclusive Packaging Sale Up To 50% Off
            </p>
          </div>
        </div>

        {/* =================================================
            MAIN WHITE HEADER
        ================================================= */}

        <div
          className={`
            bg-[#FFFFFF]
            transition-all
            duration-300
            ${isScrolled ? "h-[82px]" : "h-[90px]"}
          `}
        >
          <div
            className="
              max-w-[1320px]
              mx-auto
              h-full
              px-5
              lg:px-8
            "
          >
            <div
              className="
                h-full
                flex
                items-center
                justify-between
              "
            >
              {/* =================================================
                  LEFT CONTACT
              ================================================= */}

              <div
                className="
                  hidden
                  lg:flex
                  items-center
                  gap-8
                  w-[420px]
                "
              >
                {/* =================================================
                    PHONE
                ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    shrink-0
                  "
                >
                  <div
                    className="
                      w-[58px]
                      h-[48px]
                      rounded-full
                      bg-[#E6F1F6]
                      border
                      border-[#DCE3E7]
                      flex
                      items-center
                      justify-center
                      text-[#202830]
                      shrink-0
                    "
                  >
                    <Phone
                      size={22}
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[13px]
                        font-medium
                        text-[#66737D]
                        leading-none
                        mb-[7px]
                      "
                    >
                      Need Help ?
                    </p>

                    <a
                      href="tel:+917669988825"
                      className="
                        block
                        whitespace-nowrap
                        text-[16px]
                        font-semibold
                        text-[#202830]
                        leading-none
                        tracking-[-0.01em]
                        hover:text-[#123B5D]
                        transition-colors
                      "
                    >
                      +91 766 998 8825
                    </a>
                  </div>
                </div>

                {/* =================================================
                    SEPARATOR
                ================================================= */}

                <div
                  className="
                    w-px
                    h-[44px]
                    bg-[#DCE3E7]
                    shrink-0
                  "
                />

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                  "
                >
                  <div
                    className="
                      w-[48px]
                      h-[48px]
                      rounded-full
                      bg-[#E6F1F6]
                      border
                      border-[#DCE3E7]
                      flex
                      items-center
                      justify-center
                      text-[#202830]
                      shrink-0
                    "
                  >
                    <Mail
                      size={21}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[13px]
                        font-medium
                        text-[#66737D]
                        leading-none
                        mb-[7px]
                      "
                    >
                      Email Us
                    </p>

                    <a
                      href="mailto:info@dpacksolutions.com"
                      className="
                        block
                        whitespace-nowrap
                        text-[14px]
                        font-semibold
                        text-[#202830]
                        leading-none
                        hover:text-[#123B5D]
                        transition-colors
                      "
                    >
                      info@dpacksolutions.com
                    </a>
                  </div>
                </div>
              </div>

              {/* =================================================
                  CENTER LOGO
              ================================================= */}

              <Link
                href="/"
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <Image
                  src="/logo (21).webp"
                  alt="DPACK"
                  width={190}
                  height={70}
                  priority
                  className="
                    w-auto
                    h-[62px]
                    object-contain
                  "
                />
              </Link>

              {/* =================================================
                  RIGHT ICONS
              ================================================= */}

              <div
                className="
                  hidden
                  lg:flex
                  items-center
                  justify-end
                  gap-7
                  ml-auto
                  w-[420px]
                "
              >
                {/* =================================================
                    SEARCH
                ================================================= */}

                <Link
                  href="/search"
                  aria-label="Search"
                  className="
                    text-[#202830]
                    hover:text-[#123B5D]
                    transition-colors
                  "
                >
                  <Search
                    size={23}
                    strokeWidth={2}
                  />
                </Link>

                {/* =================================================
                    WISHLIST
                ================================================= */}

                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="
                    text-[#202830]
                    hover:text-[#123B5D]
                    transition-colors
                  "
                >
                  <Heart
                    size={24}
                    strokeWidth={2}
                  />
                </Link>

                {/* =================================================
                    ACCOUNT
                ================================================= */}

                <Link
                  href="/my-account"
                  aria-label="Account"
                  className="
                    text-[#202830]
                    hover:text-[#123B5D]
                    transition-colors
                  "
                >
                  <UserRound
                    size={23}
                    strokeWidth={2}
                  />
                </Link>

                {/* =================================================
                    CART
                ================================================= */}

                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="
                    text-[#202830]
                    hover:text-[#123B5D]
                    transition-colors
                  "
                >
                  <ShoppingBag
                    size={23}
                    strokeWidth={2}
                  />
                </Link>
              </div>

              {/* =================================================
                  MOBILE MENU BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="
                  lg:hidden
                  ml-auto
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                <Menu
                  size={25}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            NAVIGATION BAR
        ================================================= */}

        <nav
          className="
            hidden
            lg:block
            w-full
            bg-[#2F7180]
            border-t
            border-[#DCE3E7]
            border-b
            border-[#DCE3E7]
          "
        >
          <div
            className="
              h-[56px]
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                flex
                items-center
                gap-[42px]
              "
            >
              {/* HOME */}

              <Link
                href="/"
                className="
                  text-[16px]
                  fwhiteold
                  twhite
                  hover:text-white
                  transition-colors
                "
              >
                Home
              </Link>

              {/* SHOP */}

              <Link
                href="/shop"
                className="
                  flex
                  items-center
                  gap-2
                  text-[16px]
                  font-semibold
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Shop

                <ChevronDown
                  size={16}
                  strokeWidth={2}
                />
              </Link>

              {/* COLLECTION */}

              <Link
                href="/collection"
                className="
                  flex
                  items-center
                  gap-2
                  text-[16px]
                  font-semibold
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Collection

                <ChevronDown
                  size={16}
                  strokeWidth={2}
                />
              </Link>

              {/* MY ACCOUNT */}

              <Link
                href="/my-account"
                className="
                  text-[16px]
                  font-semibold
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                My Account
              </Link>

              {/* PAGES */}

              <Link
                href="/pages"
                className="
                  flex
                  items-center
                  gap-2
                  text-[16px]
                  font-semibold
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Pages

                <ChevronDown
                  size={16}
                  strokeWidth={2}
                />
              </Link>

              {/* BLOG */}

              <Link
                href="/blog"
                className="
                  text-[16px]
                  font-semibold
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Blog
              </Link>

              {/* CONTACT */}

              <Link
                href="/contact-us"
                className="
                  text-[16px]
                  font-semibold
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>

        {/* =================================================
            MOBILE HEADER SEARCH
        ================================================= */}

        <div
          className="
            lg:hidden
            px-4
            py-3
            border-t
            border-[#DCE3E7]
            bg-[#FFFFFF]
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
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              className="
                flex-1
                h-[42px]
                px-4
                bg-[#F7F8F9]
                border
                border-[#DCE3E7]
                outline-none
                text-[13px]
                text-[#202830]
                placeholder:text-[#66737D]
                focus:border-[#123B5D]
              "
            />

            <button
              type="submit"
              className="
                h-[42px]
                px-5
                bg-[#123B5D]
                text-white
                text-[12px]
                font-semibold
                hover:bg-[#2F7180]
                transition-colors
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
        <div className="fixed inset-0 z-[10000] lg:hidden">
          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-black/50
            "
            onClick={() => setMobileOpen(false)}
          />

          {/* DRAWER */}

          <div
            className="
              absolute
              top-0
              right-0
              h-full
              w-[88%]
              max-w-[400px]
              bg-white
              shadow-2xl
              overflow-y-auto
            "
          >
            {/* DRAWER HEADER */}

            <div
              className="
                h-[75px]
                px-5
                border-b
                border-[#DCE3E7]
                flex
                items-center
                justify-between
              "
            >
              <Image
                src="/logo.png"
                alt="DPACK"
                width={150}
                height={55}
                className="
                  w-auto
                  h-[48px]
                  object-contain
                "
              />

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                <X
                  size={25}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* MOBILE NAV */}

            <div className="px-5 py-5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#123B5D]
                "
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                Shop
              </Link>

              <Link
                href="/collection"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                Collection
              </Link>

              <Link
                href="/my-account"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                My Account
              </Link>

              <Link
                href="/pages"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                Pages
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                Blog
              </Link>

              <Link
                href="/contact-us"
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  py-4
                  border-b
                  border-[#DCE3E7]
                  text-[15px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                Contact Us
              </Link>
            </div>

            {/* MOBILE CONTACT */}

            <div
              className="
                mx-3
                mt-5
                p-5
                bg-[#F7F8F9]
                border
                border-[#DCE3E7]
              "
            >
              <p
                className="
                  text-[12px]
                  font-medium
                  text-[#66737D]
                  mb-2
                "
              >
                Need Help ?
              </p>

              <a
                href="tel:+917669988825"
                className="
                  block
                  whitespace-nowrap
                  text-[16px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                +91 766 998 8825
              </a>

              <p
                className="
                  text-[12px]
                  font-medium
                  text-[#66737D]
                  mt-5
                  mb-2
                "
              >
                Email Us
              </p>

              <a
                href="mailto:info@dpacksolutions.com"
                className="
                  block
                  whitespace-nowrap
                  text-[14px]
                  font-semibold
                  text-[#202830]
                  hover:text-[#123B5D]
                  transition-colors
                "
              >
                info@dpacksolutions.com
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          HEADER SPACE
      ===================================================== */}

      <div
        className="
          h-[186px]
          lg:h-[186px]
        "
      />
    </>
  );
}