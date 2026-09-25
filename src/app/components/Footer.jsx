"use client";

import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Headphones,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { motion } from "framer-motion";

/* =========================================================
   PRODUCT LINKS
========================================================= */

const productLinks = [
  {
    name: "Dunnage Bags",
    href: "/products/dunnage-bags",
  },
  {
    name: "Air Column Bags",
    href: "/products/air-column-bags",
  },
  {
    name: "Air Column Rolls",
    href: "/products/air-column-rolls",
  },
  {
    name: "Packaging Air Bags",
    href: "/products/packaging-air-bags",
  },
  {
    name: "Gap Fillers",
    href: "/products/gap-fillers",
  },
];

/* =========================================================
   SHOP LINKS
========================================================= */

const shopLinks = [
  {
    name: "All Products",
    href: "/products",
  },
  {
    name: "New Arrivals",
    href: "/products",
  },
  {
    name: "Best Sellers",
    href: "/products",
  },
  {
    name: "Shop by Category",
    href: "/products",
  },
];

/* =========================================================
   CUSTOMER LINKS
========================================================= */

const customerLinks = [
  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "Track Order",
    href: "/track-order",
  },
  {
    name: "Shipping & Delivery",
    href: "/shipping",
  },
  {
    name: "Returns & Refunds",
    href: "/returns",
  },
  {
    name: "FAQs",
    href: "/faq",
  },
];

/* =========================================================
   TRUST ITEMS
========================================================= */

const trustItems = [
  {
    icon: PackageCheck,
    title: "Quality Packaging",
    text: "Built for protection",
  },
  {
    icon: Truck,
    title: "Reliable Shipping",
    text: "Delivered with care",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    text: "Shop with confidence",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    text: "We're here to help",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#0B2942]
        text-white
      "
    >
      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.035]

          [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-[250px]
          -left-[150px]

          h-[500px]
          w-[500px]

          rounded-full
          bg-[#2F7180]/20

          blur-[130px]
        "
      />

      {/* ===================================================
          LARGE TEXT
      =================================================== */}

      <motion.div
        animate={{
          x: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[120px]
          left-[20%]

          hidden

          whitespace-nowrap

          text-[160px]
          font-black
          leading-none
          tracking-[-0.08em]

          text-white/[0.018]

          xl:block
        "
      >
        PROTECT • PACK • SHIP
      </motion.div>

      {/* ===================================================
          ECOMMERCE TRUST STRIP
      =================================================== */}

      <div
        className="
          relative
          z-10

          border-b
          border-white/10

          bg-[#123B5D]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]

            grid-cols-2

            lg:grid-cols-4
          "
        >
          {trustItems.map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}

                  className="
                    group

                    flex
                    items-center
                    gap-3

                    border-b
                    border-white/10

                    px-5
                    py-5

                    transition-colors
                    duration-300

                    hover:bg-white/[0.035]

                    lg:border-b-0
                    lg:border-r
                    lg:px-7

                    last:border-r-0
                  "
                >
                  {/* ICON */}

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center

                      bg-[#F5A623]

                      text-[#123B5D]
                    "
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  <div>
                    <h3
                      className="
                        text-[12px]
                        font-black
                        uppercase
                        tracking-[0.04em]
                        text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-white/45
                      "
                    >
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>

      {/* ===================================================
          NEWSLETTER / SHOP CTA
      =================================================== */}

      <div
        className="
          relative
          z-10

          border-b
          border-white/10
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]

            gap-8

            px-5
            py-9

            sm:px-8

            lg:grid-cols-[1fr_1fr]
            lg:items-center
            lg:px-12
          "
        >
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
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
                  h-[3px]
                  w-8
                  bg-[#F5A623]
                "
              />

              <span
                className="
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-[#F5A623]
                "
              >
                Stay Connected
              </span>
            </div>

            <h2
              className="
                mt-3

                text-[27px]
                font-black
                leading-[1]
                tracking-[-0.035em]
                text-white

                sm:text-[32px]
              "
            >
              Better packaging.
              <span className="text-white/45">
                {" "}Safer deliveries.
              </span>
            </h2>
          </motion.div>

          {/* NEWSLETTER */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              flex
              w-full

              border
              border-white/15

              bg-white/[0.04]

              p-1.5

              transition-colors
              duration-300

              focus-within:border-[#F5A623]/70
            "
          >
            <div
              className="
                flex
                flex-1
                items-center
                gap-3

                px-3
              "
            >
              <Mail
                size={15}
                className="
                  shrink-0
                  text-[#F5A623]
                "
              />

              <input
                type="email"
                placeholder="Enter your email address"

                className="
                  w-full

                  bg-transparent

                  py-3

                  text-[12px]
                  text-white

                  outline-none

                  placeholder:text-white/35
                "
              />
            </div>

            <button
              type="button"

              className="
                group/news

                flex
                shrink-0
                items-center
                gap-2

                bg-[#F5A623]

                px-5

                text-[12px]
                font-black
                uppercase
                tracking-[0.05em]
                text-[#123B5D]

                transition-colors
                duration-300

                hover:bg-white
              "
            >
              Subscribe

              <ArrowRight
                size={14}

                className="
                  transition-transform
                  duration-300

                  group-hover/news:translate-x-1
                "
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ===================================================
          MAIN FOOTER
      =================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1500px]

          px-5
          py-12

          sm:px-8

          lg:px-12
          lg:py-14
        "
      >
        <div
          className="
            grid
            gap-10

            sm:grid-cols-2

            lg:grid-cols-[1.35fr_0.9fr_0.8fr_0.9fr_1.15fr]
            lg:gap-10
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <Link
              href="/"
              className="
                inline-flex
                items-center
              "
            >
              <img
                src="/logo (21).webp"
                alt="D Pack"
                className="
                  h-auto
                  max-h-[58px]
                  w-auto
                  max-w-[180px]
                  object-contain
                "
              />
            </Link>

            <p
              className="
                mt-5
                max-w-[310px]

                text-[12px]
                leading-6
                text-white/55
              "
            >
              Smart protective packaging
              solutions designed to keep
              products safer during storage,
              handling and delivery.
            </p>

            {/* SHOP BUTTON */}

            <Link
              href="/products"

              className="
                group/shop

                mt-6

                inline-flex
                items-center
                gap-3

                bg-[#F5A623]

                px-5
                py-3

                text-[12px]
                font-black
                uppercase
                tracking-[0.05em]
                text-[#123B5D]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-white
              "
            >
              <ShoppingBag size={14} />

              Shop Products

              <ArrowRight
                size={14}

                className="
                  transition-transform
                  duration-300

                  group-hover/shop:translate-x-1
                "
              />
            </Link>
          </motion.div>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <FooterLinks
            title="Products"
            links={productLinks}
            delay={0.05}
          />

          {/* =================================================
              SHOP
          ================================================= */}

          <FooterLinks
            title="Shop"
            links={shopLinks}
            delay={0.1}
          />

          {/* =================================================
              SUPPORT
          ================================================= */}

          <FooterLinks
            title="Support"
            links={customerLinks}
            delay={0.15}
          />

          {/* =================================================
              CONTACT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <FooterTitle>
              Get In Touch
            </FooterTitle>

            <div className="space-y-4">

              {/* PHONE */}

              <ContactItem
                icon={Phone}
                label="Call Us"
                value="+91 99999 99999"
                href="tel:+919999999999"
              />

              {/* EMAIL */}

              <ContactItem
                icon={Mail}
                label="Email"
                value="info@dpack.in"
                href="mailto:info@dpack.in"
              />

              {/* LOCATION */}

              <ContactItem
                icon={MapPin}
                label="Location"
                value="India"
              />

            </div>
          </motion.div>
        </div>
      </div>

      {/* ===================================================
          SHOPPING INFORMATION STRIP
      =================================================== */}

      <div
        className="
          relative
          z-10

          border-y
          border-white/10

          bg-[#09243A]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]

            flex-col
            gap-5

            px-5
            py-5

            sm:px-8

            md:flex-row
            md:items-center
            md:justify-between

            lg:px-12
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-7
              gap-y-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Truck
                size={15}
                className="
                  text-[#F5A623]
                "
              />

              <span
                className="
                  text-[12px]
                  font-bold
                  text-white/65
                "
              >
                Reliable Delivery
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <RotateCcw
                size={15}
                className="
                  text-[#F5A623]
                "
              />

              <span
                className="
                  text-[12px]
                  font-bold
                  text-white/65
                "
              >
                Easy Support
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Box
                size={15}
                className="
                  text-[#F5A623]
                "
              />

              <span
                className="
                  text-[12px]
                  font-bold
                  text-white/65
                "
              >
                Protective Packaging
              </span>
            </div>
          </div>

          {/* SHOP CTA */}

          <Link
            href="/products"

            className="
              group/all

              flex
              w-fit
              items-center
              gap-3

              text-[12px]
              font-black
              uppercase
              tracking-[0.06em]
              text-white
            "
          >
            Explore All Products

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center

                bg-[#F5A623]

                text-[#123B5D]

                transition-transform
                duration-300

                group-hover/all:rotate-45
              "
            >
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* ===================================================
          BOTTOM BAR
      =================================================== */}

      <div
        className="
          relative
          z-10

          bg-[#071D2E]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]

            flex-col
            gap-3

            px-5
            py-4

            sm:px-8

            md:flex-row
            md:items-center
            md:justify-between

            lg:px-12
          "
        >
          <p
            className="
              text-[10px]
              text-white/35
            "
          >
            © {new Date().getFullYear()} D Pack.
            All rights reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-5
            "
          >
            <Link
              href="/privacy-policy"
              className="
                text-[10px]
                text-white/40

                transition-colors

                hover:text-[#F5A623]
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                text-[10px]
                text-white/40

                transition-colors

                hover:text-[#F5A623]
              "
            >
              Terms & Conditions
            </Link>

            <Link
              href="/shipping"
              className="
                text-[10px]
                text-white/40

                transition-colors

                hover:text-[#F5A623]
              "
            >
              Shipping Policy
            </Link>
          </div>

          <span
            className="
              hidden

              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/25

              lg:block
            "
          >
            Protect • Pack • Deliver
          </span>
        </div>
      </div>

      {/* ORANGE FINAL LINE */}

      <div
        className="
          relative
          z-20

          h-[4px]
          w-full

          bg-[#F5A623]
        "
      />
    </footer>
  );
}

/* =========================================================
   FOOTER LINKS
========================================================= */

function FooterLinks({
  title,
  links,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay,
      }}
    >
      <FooterTitle>
        {title}
      </FooterTitle>

      <ul className="space-y-2.5">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}

              className="
                group/link

                flex
                w-fit
                items-center
                gap-2

                py-0.5

                text-[12px]
                text-white/55

                transition-all
                duration-300

                hover:translate-x-1
                hover:text-white
              "
            >
              {/* DOT */}

              <span
                className="
                  h-[4px]
                  w-[4px]

                  bg-white/20

                  transition-all
                  duration-300

                  group-hover/link:w-3
                  group-hover/link:bg-[#F5A623]
                "
              />

              {item.name}

              <ArrowUpRight
                size={11}

                className="
                  -translate-x-1
                  opacity-0

                  text-[#F5A623]

                  transition-all
                  duration-300

                  group-hover/link:translate-x-0
                  group-hover/link:opacity-100
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* =========================================================
   TITLE
========================================================= */

function FooterTitle({ children }) {
  return (
    <div className="mb-5">
      <h3
        className="
          text-[12px]
          font-black
          uppercase
          tracking-[0.1em]
          text-white
        "
      >
        {children}
      </h3>

      <span
        className="
          mt-2
          block

          h-[2px]
          w-6

          bg-[#F5A623]
        "
      />
    </div>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}) {
  const content = (
    <>
      <motion.span
        whileHover={{
          rotate: 7,
          scale: 1.05,
        }}
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          border
          border-white/15

          text-[#F5A623]

          transition-colors
          duration-300

          group-hover:border-[#F5A623]
          group-hover:bg-[#F5A623]
          group-hover:text-[#123B5D]
        "
      >
        <Icon size={14} />
      </motion.span>

      <div>
        <span
          className="
            block

            text-[10px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-white/35
          "
        >
          {label}
        </span>

        <span
          className="
            mt-1
            block

            text-[12px]
            font-medium
            text-white
          "
        >
          {value}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="
          group

          flex
          items-center
          gap-3
        "
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
      "
    >
      {content}
    </div>
  );
}