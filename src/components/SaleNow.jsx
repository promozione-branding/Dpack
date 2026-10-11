"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, ArrowRight } from "lucide-react";

export default function SaleNow() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 22,
    minutes: 45,
    seconds: 39,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;

              if (days > 0) {
                days--;
              }
            }
          }
        }

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="
          mx-auto
          w-full
          max-w-[1370px]
          overflow-hidden
          rounded-[15px]
          bg-[#D8BA72]
        "
      >
        <div
          className="
            flex
            min-h-[148px]
            flex-col
            items-center
            justify-between
            gap-8
            px-7
            py-8

            sm:px-8
            lg:flex-row
            lg:gap-6
            lg:px-8
            xl:px-9
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="w-full lg:max-w-[360px]">
            <h2
              className="
                font-outfit
                text-[30px]
                font-semibold
                leading-[1.05]
                tracking-[-0.04em]
                text-[#111111]

                sm:text-[34px]
                lg:text-[36px]
              "
            >
              DPACK Sale is Live!
            </h2>

            <p
              className="
                mt-3
                font-quicksand
                text-[13px]
                font-medium
                tracking-[0.01em]
                text-[#3E3A32]

                sm:text-[14px]
              "
            >
              Save more on protective packaging solutions
            </p>
          </div>

          {/* =====================================================
              COUNTDOWN
          ===================================================== */}

          <div
            className="
              flex
              items-start
              justify-center
              gap-[7px]

              sm:gap-[9px]
            "
          >
            {/* DAYS */}

            <div className="text-center">
              <div
                className="
                  flex
                  h-[40px]
                  min-w-[58px]
                  items-center
                  justify-center
                  rounded-[2px]
                  bg-[#D84A42]
                  px-2
                  text-[25px]
                  font-bold
                  leading-none
                  tracking-[-0.03em]
                  text-white

                  sm:h-[40px]
                  sm:min-w-[62px]
                "
              >
                {formatNumber(timeLeft.days)}
              </div>

              <span
                className="
                  mt-2
                  block
                  text-[10px]
                  font-medium
                  uppercase
                  text-[#514C42]
                "
              >
                Days
              </span>
            </div>

            {/* COLON */}

            <span
              className="
                mt-[5px]
                text-[27px]
                font-bold
                leading-none
                text-[#D84A42]
              "
            >
              :
            </span>

            {/* HOURS */}

            <div className="text-center">
              <div
                className="
                  flex
                  h-[40px]
                  min-w-[58px]
                  items-center
                  justify-center
                  rounded-[2px]
                  bg-[#D84A42]
                  px-2
                  text-[25px]
                  font-bold
                  leading-none
                  tracking-[-0.03em]
                  text-white

                  sm:min-w-[62px]
                "
              >
                {formatNumber(timeLeft.hours)}
              </div>

              <span
                className="
                  mt-2
                  block
                  text-[10px]
                  font-medium
                  uppercase
                  text-[#514C42]
                "
              >
                Hour
              </span>
            </div>

            {/* COLON */}

            <span
              className="
                mt-[5px]
                text-[27px]
                font-bold
                leading-none
                text-[#D84A42]
              "
            >
              :
            </span>

            {/* MINUTES */}

            <div className="text-center">
              <div
                className="
                  flex
                  h-[40px]
                  min-w-[58px]
                  items-center
                  justify-center
                  rounded-[2px]
                  bg-[#D84A42]
                  px-2
                  text-[25px]
                  font-bold
                  leading-none
                  tracking-[-0.03em]
                  text-white

                  sm:min-w-[62px]
                "
              >
                {formatNumber(timeLeft.minutes)}
              </div>

              <span
                className="
                  mt-2
                  block
                  text-[10px]
                  font-medium
                  uppercase
                  text-[#514C42]
                "
              >
                Mins
              </span>
            </div>

            {/* COLON */}

            <span
              className="
                mt-[5px]
                text-[27px]
                font-bold
                leading-none
                text-[#D84A42]
              "
            >
              :
            </span>

            {/* SECONDS */}

            <div className="text-center">
              <div
                className="
                  flex
                  h-[40px]
                  min-w-[58px]
                  items-center
                  justify-center
                  rounded-[2px]
                  bg-[#D84A42]
                  px-2
                  text-[25px]
                  font-bold
                  leading-none
                  tracking-[-0.03em]
                  text-white

                  sm:min-w-[62px]
                "
              >
                {formatNumber(timeLeft.seconds)}
              </div>

              <span
                className="
                  mt-2
                  block
                  text-[10px]
                  font-medium
                  uppercase
                  text-[#514C42]
                "
              >
                Secs
              </span>
            </div>
          </div>

          {/* =====================================================
              RIGHT OFFER + BUTTON
          ===================================================== */}

          <div
            className="
              flex
              w-full
              items-center
              justify-center
              gap-5

              lg:w-auto
              lg:justify-end
              xl:gap-6
            "
          >
            {/* OFFER CODE */}

            <div
              className="
                flex
                items-center
                gap-2
                whitespace-nowrap
                text-[12px]
                font-semibold
                text-[#111111]
              "
            >
              <Copy
                size={17}
                strokeWidth={1.8}
              />

              <span>
                PACK10
              </span>
            </div>

            {/* SHOP BUTTON */}

            <Link
              href="/shop"
              className="
                group
                flex
                h-[51px]
                min-w-[175px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#111111]
                px-7
                text-[12px]
                font-bold
                text-white
                transition-all
                duration-300

                hover:bg-[#D95026]
                hover:shadow-lg
              "
            >
              <span>
                Shop Sale
              </span>

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}