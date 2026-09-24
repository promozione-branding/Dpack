"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";

/* ============================================================
   PRODUCTS
============================================================ */

const products = [
  {
    id: 1,
    name: "Dunnage Air Bags",
    category: "DUNNAGE BAGS",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    name: "PP Dunnage Bag",
    category: "DUNNAGE BAGS",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Square Dunnage Air Bags",
    category: "DUNNAGE BAGS",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    tag: "NEW",
  },
  {
    id: 4,
    name: "Air Column Bag for Laptop",
    category: "AIR COLUMN BAGS",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    tag: "FRAGILE",
  },
  {
    id: 5,
    name: "Air Column Bags for Electronics",
    category: "AIR COLUMN BAGS",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    tag: "POPULAR",
  },
  {
    id: 6,
    name: "Air Column Packaging Bag",
    category: "AIR COLUMN BAGS",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    tag: "NEW",
  },
];

/* ============================================================
   MAIN SECTION
============================================================ */

export default function ProductsRevealSection() {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);

  /* ==========================================================
     SCROLL PROGRESS
  ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();

        const sectionHeight = section.offsetHeight;

        const viewportHeight = window.innerHeight;

        const total = sectionHeight - viewportHeight;

        const current = Math.min(
          Math.max(-rect.top, 0),
          total
        );

        const value =
          total > 0 ? current / total : 0;

        setProgress(value);

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ==========================================================
     REVEAL
  ========================================================== */

  const reveal = Math.min(
    progress / 0.60,
    1
  );

  /* ==========================================================
     SMOOTH EASING
  ========================================================== */

  const eased =
    1 -
    Math.pow(
      1 - reveal,
      3
    );

  /* ==========================================================
     CARD ANIMATION POSITIONS

     Start:
     Cards are clustered together.

     End:
     Screenshot-style 2-column grid.
  ========================================================== */

  const gridPositions = [
    {
      x: -1,
      y: -1,
      rotate: 0,
    },
    {
      x: 1,
      y: -1,
      rotate: 0,
    },
    {
      x: -1,
      y: 0,
      rotate: 0,
    },
    {
      x: 1,
      y: 0,
      rotate: 0,
    },
    {
      x: -1,
      y: 1,
      rotate: 0,
    },
    {
      x: 1,
      y: 1,
      rotate: 0,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[110vh]
        bg-[#DCE3E7]
      "
    >

      {/* ======================================================
          STICKY VIEWPORT
      ====================================================== */}

      <div
        className="
          sticky
          top-60
          flex
          min-h-[80vh]
          w-full
          items-center
          overflow-hidden
        "
      >

        {/* ====================================================
            BACKGROUND
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
          "
        >

          {/* Center glow */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#AAB596]/20
              blur-[130px]
            "
          />

          {/* Top glow */}

          <div
            className="
              absolute
              right-[8%]
              top-[8%]
              h-[250px]
              w-[250px]
              rounded-full
              bg-[#EAE2D6]/60
              blur-[110px]
            "
          />

        </div>


        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-6
            z-40
            px-5
            sm:px-7
            lg:px-10
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-[1380px]
              items-end
              justify-between
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    h-[2px]
                    w-8
                    bg-[#8B9A6E]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#8B9A6E]
                  "
                >
                  DPACK COLLECTION
                </span>

              </div>

              <h2
                className="
                  font-[var(--font-outfit)]
                  text-[28px]
                  font-black
                  leading-none
                  tracking-[-0.045em]
                  text-[#17191d]
                  sm:text-[34px]
                  lg:text-[42px]
                "
              >
                Explore Our Products
              </h2>

            </div>


            {/* RIGHT */}

            <span
              className="
                hidden
                pb-1
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#858980]
                sm:block
              "
            >
              Scroll to explore
            </span>

          </div>

        </div>


        {/* ====================================================
            MAIN PRODUCT AREA
        ==================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[95px]
            bottom-[12px]
            w-full
            max-w-[1380px]
            -translate-x-1/2
            px-3
            sm:top-[105px]
            sm:px-5
            lg:top-[110px]
            lg:px-6
          "
        >

          {/* =================================================
              COMPLETE LAYOUT

              LEFT = BEST SELLERS
              RIGHT = NEW ARRIVAL
          ================================================= */}

          <div
            className="
              grid
              h-full
              grid-cols-1
              gap-4
              lg:grid-cols-[2fr_1fr]
              lg:gap-6
            "
          >

            {/* =================================================
                BEST SELLING PRODUCTS
            ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-white
                p-4
                pt-7
                shadow-[0_15px_50px_rgba(23,25,24,0.05)]
                sm:p-5
                sm:pt-8
              "
            >

              {/* TOP LABEL */}

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  z-30
                  -translate-x-1/2
                "
              >

                <div
                  className="
                    relative
                    min-w-[220px]
                    rounded-b-[17px]
                    bg-[#2F7180]
                    px-8
                    py-3
                    text-center
                    text-[14px]
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(247,53,114,0.15)]
                  "
                >
                  Best Selling Products

                  {/* LEFT NOTCH */}

                  <span
                    className="
                      absolute
                      left-[-10px]
                      top-0
                      h-0
                      w-0
                      border-b-[10px]
                      border-l-[10px]
                      border-b-[#A91D4B]
                      border-l-transparent
                    "
                  />

                  {/* RIGHT NOTCH */}

                  <span
                    className="
                      absolute
                      right-[-10px]
                      top-0
                      h-0
                      w-0
                      border-b-[10px]
                      border-r-[10px]
                      border-b-[#A91D4B]
                      border-r-transparent
                    "
                  />

                </div>

              </div>


              {/* PRODUCT GRID */}

              <div
                className="
                  grid
                  h-full
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  sm:grid-rows-3
                "
              >

                {products.map(
                  (product, index) => {

                    const position =
                      gridPositions[index];

                    /*
                      ORIGINAL CLUSTERED POSITION
                      keeps your existing reveal animation
                    */

                    const startX =
                      (index - 2.5) * 25;

                    const startY =
                      (index % 2 === 0 ? -12 : 12);

                    /*
                      FINAL GRID POSITION
                    */

                    const finalX =
                      position.x * 8;

                    const finalY =
                      position.y * 5;

                    /*
                      CURRENT POSITION
                    */

                    const x =
                      startX +
                      (finalX - startX) *
                        eased;

                    const y =
                      startY +
                      (finalY - startY) *
                        eased;

                    /*
                      SCALE
                    */

                    const scale =
                      0.45 +
                      eased * 0.55;

                    /*
                      ROTATION
                    */

                    const rotate =
                      (index % 2 === 0 ? -2 : 2) *
                      (1 - eased);

                    /*
                      OPACITY
                    */

                    const opacity =
                      0.65 +
                      eased * 0.35;

                    return (
                      <div
                        key={product.id}
                        className="
                          relative
                          min-h-[145px]
                          overflow-hidden
                          rounded-[16px]
                          border
                          border-[#E5E3DF]
                          bg-white
                        "
                        style={{
                          transform: `
                            translateX(${x}px)
                            translateY(${y}px)
                            rotate(${rotate}deg)
                            scale(${scale})
                          `,
                          opacity,
                          transition:
                            "box-shadow 300ms ease",
                          zIndex:
                            10 + index,
                        }}
                      >

                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            group
                            flex
                            h-full
                            items-center
                            gap-3
                            p-3
                          "
                        >

                          {/* PRODUCT IMAGE */}

                          <div
                            className="
                              relative
                              h-[115px]
                              w-[45%]
                              shrink-0
                              overflow-hidden
                              rounded-xl
                              bg-[#F5F4F1]
                            "
                          >

                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              unoptimized
                              sizes="220px"
                              className="
                                object-contain
                                p-2
                                transition-transform
                                duration-700
                                group-hover:scale-110
                              "
                            />

                          </div>


                          {/* PRODUCT CONTENT */}

                          <div
                            className="
                              flex
                              min-w-0
                              flex-1
                              flex-col
                              justify-center
                            "
                          >

                            <span
                              className="
                                mb-2
                                text-[8px]
                                font-medium
                                uppercase
                                tracking-[0.12em]
                                text-[#888A87]
                              "
                            >
                              {product.category}
                            </span>


                            <h3
                              className="
                                line-clamp-2
                                font-[var(--font-outfit)]
                                text-[16px]
                                font-bold
                                leading-[1.35]
                                text-[#17191d]
                                sm:text-[15px]
                              "
                            >
                              {product.name}
                            </h3>


                            {/* RATING */}

                            <div
                              className="
                                mt-2
                                flex
                                items-center
                                gap-[2px]
                              "
                            >

                              {[1, 2, 3, 4, 5].map(
                                (star) => (
                                  <span
                                    key={star}
                                    className="
                                      text-[11px]
                                      text-[#C8C8C5]
                                    "
                                  >
                                    ★
                                  </span>
                                )
                              )}

                              <span
                                className="
                                  ml-1
                                  text-[8px]
                                  text-[#999]
                                "
                              >
                                (0)
                              </span>

                            </div>


                            {/* SHOP NOW */}

                            <div
                              className="
                                mt-3
                                inline-flex
                                w-fit
                                items-center
                                gap-1.5
                                rounded-full
                                bg-[#17191d]
                                px-3
                                py-1.5
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.08em]
                                text-white
                                transition-all
                                duration-300
                                group-hover:bg-[#2F7180]
                              "
                            >

                              Shop Now

                              <ArrowRight
                                size={10}
                              />

                            </div>

                          </div>

                        </a>

                      </div>
                    );
                  }
                )}

              </div>

            </div>


            {/* =================================================
                NEW ARRIVAL
            ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-white
                shadow-[0_15px_50px_rgba(23,25,24,0.05)]
              "
            >

              {/* NEW ARRIVAL BADGE */}

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  z-30
                  -translate-x-1/2
                "
              >

                <div
                  className="
                    relative
                    min-w-[170px]
                    rounded-b-[17px]
                    bg-[#2F7180]
                    px-8
                    py-3
                    text-center
                    text-[14px]
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(247,53,114,0.15)]
                  "
                >

                  New Arrivals

                  <span
                    className="
                      absolute
                      left-[-10px]
                      top-0
                      h-0
                      w-0
                      border-b-[10px]
                      border-l-[10px]
                      border-b-[#A91D4B]
                      border-l-transparent
                    "
                  />

                  <span
                    className="
                      absolute
                      right-[-10px]
                      top-0
                      h-0
                      w-0
                      border-b-[10px]
                      border-r-[10px]
                      border-b-[#A91D4B]
                      border-r-transparent
                    "
                  />

                </div>

              </div>


              {/* FEATURED PRODUCT */}

              <div
                className="
                  flex
                  h-full
                  flex-col
                  items-center
                  justify-between
                  px-6
                  pb-8
                  pt-20
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    mt-3
                    h-[260px]
                    w-full
                    max-w-[330px]
                    sm:h-[300px]
                    lg:h-[310px]
                  "
                  style={{
                    transform: `
                      translateY(${30 -
                        eased * 30}px)
                      scale(${0.82 +
                        eased * 0.18})
                    `,
                    opacity:
                      0.55 +
                      eased * 0.45,
                  }}
                >

                  <Image
                    src={products[0].image}
                    alt={products[0].name}
                    fill
                    unoptimized
                    sizes="350px"
                    className="
                      object-contain
                      p-4
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                  />

                </div>


                {/* FEATURE CONTENT */}

                <div
                  className="
                    w-full
                    text-center
                  "
                >

                  <p
                    className="
                      mb-3
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-[#888A87]
                    "
                  >
                    DPACK COLLECTION
                  </p>


                  <h3
                    className="
                      mx-auto
                      max-w-[330px]
                      font-[var(--font-outfit)]
                      text-[22px]
                      font-bold
                      leading-tight
                      text-[#17191d]
                      sm:text-[25px]
                    "
                  >
                    Premium Dunnage
                    <br />
                    Air Bags
                  </h3>


                  {/* RATING */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-center
                      gap-[2px]
                    "
                  >

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <span
                          key={star}
                          className="
                            text-[15px]
                            text-[#C8C8C5]
                          "
                        >
                          ★
                        </span>
                      )
                    )}

                    <span
                      className="
                        ml-1
                        text-[9px]
                        text-[#999]
                      "
                    >
                      (0)
                    </span>

                  </div>


                  {/* SHOP NOW BUTTON */}

                  <a
                    href={products[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mx-auto
                      mt-5
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      bg-[#17191d]
                      px-7
                      py-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      transition-all
                      duration-300
                      hover:bg-[#2F7180]
                      hover:shadow-[0_10px_25px_rgba(247,53,114,0.25)]
                    "
                  >

                    <ShoppingBag
                      size={13}
                    />

                    Shop Now

                    <ArrowRight
                      size={12}
                    />

                  </a>

                </div>


                {/* SLIDER DOTS */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    pt-4
                  "
                >

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[#17191d]
                    "
                  />

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[#D1D1CD]
                    "
                  />

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[#D1D1CD]
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            BOTTOM PROGRESS
        ==================================================== */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-40
            flex
            -translate-x-1/2
            items-center
            gap-3
          "
        >

          <span
            className="
              h-1
              w-1
              rounded-full
              bg-[#8B9A6E]
            "
          />

          <span
            className="
              h-px
              w-8
              bg-[#D5D1C8]
            "
          />

          <span
            className="
              h-1
              w-1
              rounded-full
              bg-[#D5D1C8]
            "
          />

        </div>

      </div>

    </section>
  );
}