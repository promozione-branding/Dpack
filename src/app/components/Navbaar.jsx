"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  MoveUpRight,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "Products",
      href: "/products",
      dropdown: true,
    },
    {
      name: "Articles",
      href: "/articles",
    },
    {
      name: "Contact Us",
      href: "/contact-us",
    },
  ];


  const makeSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <>
      {/* =========================================================
          STICKY HEADER
      ========================================================= */}

      <header
        className={`
          fixed
          top-0
          left-0
          w-full
          z-[9999]
          transition-all
          duration-300
          ${isScrolled ? "shadow-2xl" : "shadow-lg"}
        `}
      >


        {/* =====================================================
            MAIN WHITE HEADER
        ===================================================== */}

        <div
          className={`
            bg-white
            relative
            transition-all
            duration-300
            ${isScrolled ? "py-2" : "py-[14px]"}
          `}
        >
          {/* ORANGE ACCENT */}

          <div
            className="
              absolute
              top-0
              left-0
              h-[3px]
              w-[28%]
              bg-[#D95026]
            "
          />

          <div
            className="
              absolute
              right-[8%]
              top-0
              w-[7px]
              h-[3px]
              bg-[#D95026]
            "
          />

          <div className="max-w-[1550px] mx-auto px-5 xl:px-10">

            <div className="flex items-center gap-7">

              {/* LOGO */}

              <Link
                href="/"
                className="shrink-0"
              >
                <Image
                  src="/logo (21).webp"
                  alt="Resol Industries"
                  width={230}
                  height={70}
                  priority
                  className={`
                    w-auto
                    object-contain
                    transition-all
                    duration-300
                    ${
                      isScrolled
                        ? "h-[46px]"
                        : "h-[58px]"
                    }
                  `}
                />
              </Link>

              {/* SEARCH */}

              <div className="hidden md:flex flex-1">

                <form
                  action="/search"
                  method="GET"
                  className="relative w-full"
                >
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      bottom-0
                      w-[5px]
                      bg-[#D95026]
                      z-10
                    "
                  />

                  <input
                    type="text"
                    name="q"
                    placeholder="Search products, materials & categories..."
                    className="
                      w-full
                      h-[52px]
                      pl-6
                      pr-[62px]
                      bg-[#F4F5F6]
                      border
                      border-[#E0E2E5]
                      outline-none
                      text-[14px]
                      text-black
                      placeholder:text-gray-400
                      
                      focus:bg-white
                      focus:border-[#D95026]
                      transition-all
                    "
                  />

                  <button
                    type="submit"
                    className="
                      absolute
                      right-0
                      top-0
                      h-[52px]
                      w-[60px]
                      bg-black
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-[#D95026]
                      transition-colors
                    "
                  >
                    <Search
                      size={20}
                      strokeWidth={1.8}
                    />
                  </button>
                </form>
              </div>

              {/* ECOMMERCE ACTIONS */}

              <div className="hidden lg:flex items-center">

                {/* ACCOUNT */}

                <Link
                  href="/account"
                  className="
                    w-[50px]
                    h-[50px]
                    border-y
                    border-l
                    border-[#E1E3E5]
                    flex
                    items-center
                    justify-center
                    text-black
                    hover:text-[#D95026]
                    hover:bg-[#F7F7F7]
                    transition-all
                  "
                >
                  <UserRound
                    size={21}
                    strokeWidth={1.7}
                  />
                </Link>

                {/* WISHLIST */}

                <Link
                  href="/wishlist"
                  className="
                    relative
                    w-[50px]
                    h-[50px]
                    border
                    border-[#E1E3E5]
                    flex
                    items-center
                    justify-center
                    text-black
                    hover:text-[#D95026]
                    hover:bg-[#F7F7F7]
                    transition-all
                  "
                >
                  <Heart
                    size={20}
                    strokeWidth={1.7}
                  />

                  <span
                    className="
                      absolute
                      right-[-5px]
                      top-[-5px]
                      w-[16px]
                      h-[16px]
                      bg-[#D95026]
                      text-white
                      text-[9px]
                      font-bold
                      flex
                      items-center
                      justify-center
                      
                    "
                  >
                    0
                  </span>
                </Link>

                {/* CART */}

                <Link
                  href="/cart"
                  className="
                    ml-2
                    h-[50px]
                    min-w-[155px]
                    bg-black
                    text-white
                    flex
                    items-center
                    px-4
                    gap-3
                    hover:bg-[#D95026]
                    transition-all
                    group
                  "
                >
                  <ShoppingBag
                    size={20}
                    strokeWidth={1.7}
                  />

                  <div className="leading-none">
                    <div
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.1em]
                        text-white/45
                        
                      "
                    >
                      Shopping Cart
                    </div>

                    <div
                      className="
                        text-[13px]
                        font-semibold
                        mt-[4px]
                        
                      "
                    >
                      0 Items
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="
                      ml-auto
                      opacity-50
                      group-hover:opacity-100
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      transition-all
                    "
                  />
                </Link>

              </div>

              {/* MOBILE */}

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="
                  lg:hidden
                  ml-auto
                  w-[46px]
                  h-[46px]
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                "
              >
                <Menu size={23} />
              </button>

            </div>

            {/* MOBILE SEARCH */}

            <div className="md:hidden mt-4">

              <form
                action="/search"
                method="GET"
                className="relative"
              >
                <input
                  type="text"
                  name="q"
                  placeholder="Search products..."
                  className="
                    w-full
                    h-[45px]
                    pl-4
                    pr-12
                    bg-[#F4F5F6]
                    border
                    border-gray-200
                    outline-none
                    text-[13px]
                    
                    focus:border-[#D95026]
                  "
                />

                <button
                  type="submit"
                  className="
                    absolute
                    right-0
                    top-0
                    w-[46px]
                    h-[45px]
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Search size={18} />
                </button>
              </form>

            </div>

          </div>
        </div>

        {/* =====================================================
            BLACK MAIN NAVIGATION
        ===================================================== */}

        <div className="hidden lg:block bg-black">

          <div className="max-w-[1550px] mx-auto px-5 xl:px-10">

            <div className="flex items-center h-[60px]">

              {/* CATEGORIES */}

              <div
                className="
                  relative
                  w-[225px]
                  h-[60px]
                  shrink-0
                  flex
                  items-center
                  gap-3
                  bg-[#0A0A0A]
                  border-r
                  border-white/10
                  overflow-hidden
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    bottom-0
                    w-[5px]
                    bg-[#D95026]
                  "
                />

                <Menu
                  size={22}
                  className="
                    ml-6
                    text-[#D95026]
                  "
                />

                <span
                  className="
                    text-[15px]
                    uppercase
                    font-semibold
                    tracking-[0.04em]
                    text-white
                    
                  "
                >
                  Categories
                </span>

                <span
                  className="
                    ml-auto
                    mr-5
                    w-[6px]
                    h-[6px]
                    bg-[#D95026]
                    rotate-45
                  "
                />
              </div>

              {/* NAV */}

              <nav className="flex items-center h-full ml-3">

                {navItems.map((item) => (

                  <div
                    key={item.name}
                    className="relative h-full"
                    onMouseEnter={() => {
                      if (item.dropdown) {
                        setProductsOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.dropdown) {
                        setProductsOpen(false);
                      }
                    }}
                  >

                    <Link
                      href={item.href}
                      className="
                        relative
                        h-[60px]
                        px-7
                        flex
                        items-center
                        gap-2
                        text-[15px]
                        font-semibold
                        text-white
                        hover:text-[#D95026]
                        transition-colors
                        
                        group
                      "
                    >
                      <span>
                        {item.name}
                      </span>

                      {item.dropdown && (
                        <ChevronDown
                          size={16}
                          strokeWidth={1.8}
                          className="
                            text-white
                            group-hover:text-[#D95026]
                            transition-all
                            duration-300
                            group-hover:rotate-180
                          "
                        />
                      )}

                      <span
                        className="
                          absolute
                          left-7
                          right-7
                          bottom-0
                          h-[3px]
                          bg-[#D95026]
                          scale-x-0
                          group-hover:scale-x-100
                          transition-transform
                          duration-300
                          origin-left
                        "
                      />
                    </Link>

                    {/* PRODUCTS DROPDOWN */}

                    {item.dropdown && (
                      <AnimatePresence>

                        {productsOpen && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: 10,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="
                              absolute
                              top-full
                              left-0
                              w-[370px]
                              bg-white
                              shadow-2xl
                              border
                              border-gray-200
                              py-3
                            "
                          >

                            <div
                              className="
                                px-5
                                pb-4
                                mb-2
                                border-b
                                border-gray-100
                              "
                            >

                              <div className="flex items-center justify-between">

                                <div>
                                  <p
                                    className="
                                      text-[11px]
                                      uppercase
                                      tracking-[0.12em]
                                      text-[#D95026]
                                      font-semibold
                                      
                                    "
                                  >
                                    Product Range
                                  </p>

                                  <p
                                    className="
                                      mt-1
                                      text-[13px]
                                      text-gray-500
                                      
                                    "
                                  >
                                    Industrial raw materials
                                  </p>
                                </div>

                                <div
                                  className="
                                    w-[30px]
                                    h-[30px]
                                    bg-black
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >
                                  <MoveUpRight size={15} />
                                </div>

                              </div>

                            </div>

                          </motion.div>
                        )}

                      </AnimatePresence>
                    )}

                  </div>

                ))}

              </nav>

              {/* RIGHT */}

              <div
                className="
                  ml-auto
                  h-full
                  flex
                  items-center
                  gap-4
                  pl-6
                "
              >

                <div
                  className="
                    hidden
                    xl:flex
                    items-center
                    gap-2
                    text-white/45
                  "
                >
                  <MapPin size={13} />

                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.1em]
                      
                    "
                  >
                    PAN India
                  </span>
                </div>

                <span
                  className="
                    w-[5px]
                    h-[5px]
                    rotate-45
                    bg-[#D95026]
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-semibold
                    text-white
                    hover:text-[#D95026]
                    cursor-pointer
                    transition-colors
                    
                  "
                >
                  IN
                </span>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    text-white
                    hover:text-[#D95026]
                    cursor-pointer
                    transition-colors
                    
                  "
                >
                  IG
                </span>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    text-white
                    hover:text-[#D95026]
                    cursor-pointer
                    transition-colors
                    
                  "
                >
                  X
                </span>

              </div>

            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}

      <AnimatePresence>

        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                bg-black/60
                z-[10000]
              "
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="
                fixed
                top-0
                right-0
                h-screen
                w-full
                sm:w-[430px]
                bg-white
                z-[10001]
                shadow-2xl
                overflow-y-auto
              "
            >

              {/* MOBILE HEADER */}

              <div
                className="
                  h-[82px]
                  px-5
                  flex
                  items-center
                  justify-between
                  border-b
                  border-gray-200
                "
              >

                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/logo (21).webp"
                    alt="Resol Industries"
                    width={190}
                    height={60}
                    className="
                      w-auto
                      h-[48px]
                    "
                  />
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="
                    w-[44px]
                    h-[44px]
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <X size={22} />
                </button>

              </div>

              {/* MOBILE ORANGE BAR */}

              <div
                className="
                  bg-[#D95026]
                  px-5
                  py-3
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.1em]
                    font-semibold
                    text-white
                    
                  "
                >
                  PAN India Supply
                </span>

                <span
                  className="
                    text-[10px]
                    text-white/80
                    
                  "
                >
                  24/7 Inquiry Support
                </span>

              </div>

              {/* MOBILE NAV */}

              <div className="px-5 py-5">

                {navItems.map((item) => (

                  <div
                    key={item.name}
                    className="
                      border-b
                      border-gray-200
                    "
                  >

                    <div className="flex items-center">

                      <Link
                        href={item.href}
                        onClick={() => {
                          if (!item.dropdown) {
                            setMobileOpen(false);
                          }
                        }}
                        className="
                          flex-1
                          py-5
                          text-[16px]
                          font-semibold
                          text-black
                          hover:text-[#D95026]
                          
                          transition-colors
                        "
                      >
                        {item.name}
                      </Link>

                      {item.dropdown && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileProductsOpen(
                              !mobileProductsOpen
                            )
                          }
                          className="
                            w-[48px]
                            h-[48px]
                            flex
                            items-center
                            justify-center
                            text-black
                          "
                        >
                          <ChevronDown
                            size={19}
                            className={`
                              transition-transform
                              ${
                                mobileProductsOpen
                                  ? "rotate-180"
                                  : ""
                              }
                            `}
                          />
                        </button>
                      )}

                    </div>

                    {item.dropdown &&
                      mobileProductsOpen && (

                        <div className="pb-3">

                          {productCategories.map(
                            (category) => (

                              <Link
                                key={category}
                                href={`/products/${makeSlug(
                                  category
                                )}`}
                                onClick={() =>
                                  setMobileOpen(false)
                                }
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  px-4
                                  py-3
                                  text-[14px]
                                  text-gray-600
                                  hover:text-[#D95026]
                                  hover:bg-gray-50
                                  
                                "
                              >
                                <span>
                                  {category}
                                </span>

                                <ChevronRight size={14} />
                              </Link>

                            )
                          )}

                        </div>

                      )}

                  </div>

                ))}

                {/* CTA */}

                <Link
                  href="/contact-us"
                  onClick={() => setMobileOpen(false)}
                  className="
                    mt-7
                    w-full
                    h-[53px]
                    bg-[#D95026]
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-3
                    text-[13px]
                    uppercase
                    tracking-[0.08em]
                    font-semibold
                    
                  "
                >
                  Get A Quote
                  <ArrowUpRight size={17} />
                </Link>

                {/* MOBILE CONTACT */}

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-[40px]
                        h-[40px]
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Phone size={16} />
                    </div>

                    <div>
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.08em]
                          text-gray-400
                          font-semibold
                          
                        "
                      >
                        Call Us
                      </p>

                      <a
                        href="tel:+911141417725"
                        className="
                          text-[14px]
                          font-medium
                          text-black
                          
                        "
                      >
                        +91-11-41417725
                      </a>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-[40px]
                        h-[40px]
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Mail size={16} />
                    </div>

                    <div>
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.08em]
                          text-gray-400
                          font-semibold
                          
                        "
                      >
                        Email
                      </p>

                      <a
                        href="mailto:info@resolvinyls.com"
                        className="
                          text-[14px]
                          font-medium
                          text-black
                          
                        "
                      >
                        info@resolvinyls.com
                      </a>
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>

      {/* HEADER SPACE */}

      <div className="h-[161px] lg:h-[161px]" />
    </>
  );
}