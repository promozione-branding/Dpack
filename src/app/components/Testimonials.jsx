"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#E9B95F";

const testimonials = [
    {
        id: 1,
        text: "We needed customized Packaging Air Bags, and D Pack delivered exactly what we were looking for. Great quality and professional service.",
        company: "Manufacturing Company",
        location: "Mumbai",
        name: "Manufacturing Client",
        initials: "MC",
    },
    {
        id: 2,
        text: "D Pack's Packaging Air Bags have greatly reduced product damage during our shipments. The quality is excellent and the service is always reliable.",
        company: "Logistics Company",
        location: "Delhi",
        name: "Logistics Client",
        initials: "LC",
    },
    {
        id: 3,
        text: "We have been using their Air Column Bags for packaging electronics, and the protection level is outstanding. Highly recommended for fragile items.",
        company: "Electronics Distributor",
        location: "Bangalore",
        name: "Electronics Client",
        initials: "ED",
    },
    {
        id: 4,
        text: "The packaging quality has made our dispatch process much safer. Their team understood our requirements and delivered a reliable solution.",
        company: "E-Commerce Company",
        location: "Pune",
        name: "E-Commerce Client",
        initials: "EC",
    },
    {
        id: 5,
        text: "Their protective packaging solutions have helped us improve product safety during transportation. The overall experience has been excellent.",
        company: "Packaging Company",
        location: "Gurugram",
        name: "Packaging Client",
        initials: "PC",
    },
];

function TestimonialCard({ testimonial, position, cardRef }) {
    return (
        <article
            ref={cardRef}
            className="
                testimonial-card
                absolute
                left-1/2
                top-0
                w-[calc(100%-28px)]
                max-w-[500px]
                min-h-[400px]
                -translate-x-1/2
                overflow-hidden
                rounded-[2px]
                border
                border-black/10
                bg-[#F7F2EB]
                shadow-[0_35px_100px_rgba(0,0,0,0.35)]
                md:w-[500px]
            "
            style={{
                zIndex:
                    position === "center"
                        ? 30
                        : position === "right"
                            ? 10
                            : 8,
            }}
        >
            {/* GOLD SIDE ACCENT */}
            <div
                className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[5px]
                    bg-[#E9B95F]
                    transition-opacity
                    duration-500
                    ${position === "center"
                        ? "opacity-100"
                        : "opacity-30"
                    }
                `}
            />

            {/* LARGE QUOTE */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-6
                    top-2
                    font-serif
                    text-[150px]
                    leading-none
                    text-[#E9B95F]/20
                "
            >
                “
            </div>

            {/* TOP */}
            <div className="relative z-10 flex items-center justify-between px-8 pt-8">
                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#171918]
                        text-[#E9B95F]
                    "
                >
                    <Quote size={20} strokeWidth={1.5} />
                </div>

                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-black/15" />

                    <span
                        className="
                            text-[10px]
                            font-medium
                            tracking-[0.25em]
                            text-black/35
                        "
                    >
                        0{testimonial.id}
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 px-8 pt-9">
                <p
                    className="
                        max-w-[420px]
                        font-serif
                        text-[22px]
                        leading-[1.45]
                        tracking-[-0.02em]
                        text-[#171918]
                        md:text-[24px]
                    "
                >
                    “{testimonial.text}”
                </p>
            </div>

            {/* DIVIDER */}
            <div className="mx-8 mt-9 h-px bg-black/10" />

            {/* CLIENT */}
            <div className="flex items-center justify-between px-8 py-7">
                <div className="flex items-center gap-4">
                    {/* AVATAR */}
                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#171918]
                            text-[11px]
                            font-semibold
                            tracking-wider
                            text-[#E9B95F]
                        "
                    >
                        {testimonial.initials}
                    </div>

                    <div>
                        <h3
                            className="
                                text-[13px]
                                font-semibold
                                tracking-[-0.01em]
                                text-[#171918]
                            "
                        >
                            {testimonial.company}
                        </h3>

                        <p className="mt-1 text-[11px] text-black/40">
                            {testimonial.location}
                        </p>
                    </div>
                </div>

                {/* STARS */}
                <div className="flex gap-[3px] text-[#E9B95F]">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-[14px]">
                            ★
                        </span>
                    ))}
                </div>
            </div>

            {/* BOTTOM GOLD LINE */}
            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    h-[3px]
                    bg-[#E9B95F]
                "
                style={{
                    width: position === "center" ? "100%" : "35%",
                }}
            />
        </article>
    );
}

export default function Testimonials() {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const cardRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current;

            if (!cards.length) return;

            /*
            -----------------------------------------
            INITIAL POSITIONS
            -----------------------------------------
            */

            gsap.set(cards, {
                xPercent: -50,
                transformOrigin: "center center",
            });

            // LEFT CARD
            gsap.set(cards[0], {
                x: -360,
                y: 70,
                scale: 0.78,
                rotation: -4,
                opacity: 0.35,
            });

            // CENTER CARD
            gsap.set(cards[1], {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
            });

            // RIGHT CARD
            gsap.set(cards[2], {
                x: 360,
                y: 70,
                scale: 0.78,
                rotation: 4,
                opacity: 0.35,
            });

            // HIDDEN
            cards.slice(3).forEach((card) => {
                gsap.set(card, {
                    x: 560,
                    y: 120,
                    scale: 0.62,
                    rotation: 7,
                    opacity: 0,
                });
            });

            /*
            -----------------------------------------
            HEADING ENTRY
            -----------------------------------------
            */

            gsap.from(".testimonial-heading", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            /*
            -----------------------------------------
            STAGE ENTRY
            -----------------------------------------
            */

            gsap.from(".testimonial-stage", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                delay: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            /*
            -----------------------------------------
            SCROLL TIMELINE
            -----------------------------------------
            */

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1900",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            /*
            -----------------------------------------
            STEP 01
            CARD 1 -> CENTER
            CARD 2 -> LEFT
            CARD 3 -> CENTER
            CARD 4 -> RIGHT
            -----------------------------------------
            */

            tl.to(
                cards[0],
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                },
                0
            );

            tl.to(
                cards[1],
                {
                    x: -360,
                    y: 70,
                    scale: 0.78,
                    rotation: -4,
                    opacity: 0.35,
                    duration: 1,
                    ease: "power3.inOut",
                },
                0
            );

            tl.to(
                cards[2],
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                },
                0
            );

            tl.to(
                cards[3],
                {
                    x: 360,
                    y: 70,
                    scale: 0.78,
                    rotation: 4,
                    opacity: 0.35,
                    duration: 1,
                    ease: "power3.inOut",
                },
                0
            );

            /*
            -----------------------------------------
            STEP 02
            -----------------------------------------
            */

            tl.to(
                cards[1],
                {
                    x: -560,
                    y: 120,
                    scale: 0.62,
                    opacity: 0,
                    duration: 0.8,
                },
                1
            );

            tl.to(
                cards[0],
                {
                    x: -360,
                    y: 70,
                    scale: 0.78,
                    rotation: -4,
                    opacity: 0.35,
                    duration: 1,
                    ease: "power3.inOut",
                },
                1
            );

            tl.to(
                cards[2],
                {
                    x: -360,
                    y: 70,
                    scale: 0.78,
                    rotation: -4,
                    opacity: 0.35,
                    duration: 1,
                    ease: "power3.inOut",
                },
                1
            );

            tl.to(
                cards[3],
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                },
                1
            );

            tl.to(
                cards[4],
                {
                    x: 360,
                    y: 70,
                    scale: 0.78,
                    rotation: 4,
                    opacity: 0.35,
                    duration: 1,
                    ease: "power3.inOut",
                },
                1
            );

            /*
            -----------------------------------------
            STEP 03
            -----------------------------------------
            */

            tl.to(
                cards[2],
                {
                    x: -560,
                    y: 120,
                    scale: 0.62,
                    opacity: 0,
                    duration: 0.8,
                },
                2
            );

            tl.to(
                cards[0],
                {
                    x: -560,
                    y: 120,
                    scale: 0.62,
                    opacity: 0,
                    duration: 0.8,
                },
                2
            );

            tl.to(
                cards[3],
                {
                    x: -360,
                    y: 70,
                    scale: 0.78,
                    rotation: -4,
                    opacity: 0.35,
                    duration: 1,
                    ease: "power3.inOut",
                },
                2
            );

            tl.to(
                cards[4],
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                },
                2
            );

            /*
            -----------------------------------------
            DECORATIVE MOTION
            -----------------------------------------
            */

            gsap.to(".testimonial-orbit", {
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: "none",
            });

            gsap.to(".testimonial-dot", {
                y: -12,
                opacity: 0.5,
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="
                relative
                min-h-screen
                w-full
                overflow-hidden
                bg-[#171918]
                text-white
            "
        >
            {/* =========================================
                BACKGROUND
            ========================================= */}

            {/* BIG ORBIT */}
            <div
                className="
                    testimonial-orbit
                    pointer-events-none
                    absolute
                    -right-[250px]
                    -top-[220px]
                    h-[650px]
                    w-[650px]
                    rounded-full
                    border
                    border-[#E9B95F]/10
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[180px]
                    -top-[150px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    border
                    border-[#E9B95F]/[0.06]
                "
            />

            {/* LEFT CIRCLE */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-[250px]
                    -left-[220px]
                    h-[520px]
                    w-[520px]
                    rounded-full
                    border
                    border-white/[0.05]
                "
            />

            {/* DOT */}
            <div
                className="
                    testimonial-dot
                    pointer-events-none
                    absolute
                    left-[8%]
                    top-[28%]
                    h-2
                    w-2
                    rounded-full
                    bg-[#E9B95F]
                "
            />

            {/* DOT GRID */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[8%]
                    bottom-[15%]
                    grid
                    grid-cols-5
                    gap-3
                    opacity-20
                "
            >
                {Array.from({ length: 25 }).map((_, i) => (
                    <span
                        key={i}
                        className="
                            h-1
                            w-1
                            rounded-full
                            bg-[#E9B95F]
                        "
                    />
                ))}
            </div>

            {/* =========================================
                MAIN
            ========================================= */}

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-screen
                    max-w-[1500px]
                    flex-col
                    px-5
                    pt-20
                    md:px-10
                    lg:px-16
                "
            >
                {/* =====================================
                    HEADING
                ===================================== */}

                <div
                    className="
                        testimonial-heading
                        relative
                        z-30
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
                >
                    <div>
                        {/* EYEBROW */}
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-12 bg-[#E9B95F]" />

                            <span
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.3em]
                                    text-[#E9B95F]
                                "
                            >
                                Client Stories
                            </span>
                        </div>

                        {/* TITLE */}
                        <h2
                            className="
                                max-w-[650px]
                                text-[46px]
                                font-medium
                                leading-[0.92]
                                tracking-[-0.055em]
                                text-[#F7F2EB]
                                sm:text-[58px]
                                md:text-[72px]
                                lg:text-[82px]
                            "
                        >
                            What Our Clients
                            <span className="block text-[#E9B95F]">
                                Say About Us
                            </span>
                        </h2>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-7 max-w-[350px] md:mb-2 md:mt-0">
                        <p
                            className="
                                text-[13px]
                                leading-6
                                text-white/45
                                md:text-[14px]
                            "
                        >
                            Trusted by logistics companies, manufacturers,
                            and e-commerce businesses across India.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#E9B95F]" />

                            <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                                Real Experiences
                            </span>
                        </div>
                    </div>
                </div>

                {/* =====================================
                    CARD STAGE
                ===================================== */}

                <div
                    ref={stageRef}
                    className="
                        testimonial-stage
                        relative
                        mt-12
                        h-[420px]
                        w-full
                        md:mt-16
                        md:h-[440px]
                    "
                >
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            position={
                                index === 1
                                    ? "center"
                                    : index === 2
                                        ? "right"
                                        : "left"
                            }
                            cardRef={(el) => {
                                cardRefs.current[index] = el;
                            }}
                        />
                    ))}

                    {/* LEFT ARROW */}
                    <button
                        type="button"
                        aria-label="Previous testimonial"
                        className="
                            absolute
                            left-0
                            top-1/2
                            z-50
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            text-white/70
                            backdrop-blur-md
                            transition
                            duration-300
                            hover:border-[#E9B95F]
                            hover:bg-[#E9B95F]
                            hover:text-[#171918]
                            md:flex
                        "
                    >
                        <ArrowLeft size={17} strokeWidth={1.5} />
                    </button>

                    {/* RIGHT ARROW */}
                    <button
                        type="button"
                        aria-label="Next testimonial"
                        className="
                            absolute
                            right-0
                            top-1/2
                            z-50
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            text-white/70
                            backdrop-blur-md
                            transition
                            duration-300
                            hover:border-[#E9B95F]
                            hover:bg-[#E9B95F]
                            hover:text-[#171918]
                            md:flex
                        "
                    >
                        <ArrowRight size={17} strokeWidth={1.5} />
                    </button>
                </div>

                {/* =====================================
                    BOTTOM
                ===================================== */}

                <div
                    className="
                        relative
                        z-50
                        mt-5
                        flex
                        items-center
                        justify-between
                    "
                >
                    {/* PROGRESS */}
                    <div className="flex items-center gap-2">
                        <span className="h-[3px] w-12 bg-[#E9B95F]" />

                        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    </div>

                    {/* SCROLL LABEL */}
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                            Scroll to explore
                        </span>

                        <span className="h-px w-8 bg-[#E9B95F]/40" />
                    </div>
                </div>
            </div>
        </section>
    );
}