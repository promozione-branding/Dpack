"use client";

import React, { useState } from "react";
import { ArrowUpRight, Plus, Minus, CheckCircle2 } from "lucide-react";

const faqs = [
    {
        question: "What packaging solutions does D Pack provide?",
        answer:
            "D Pack provides protective packaging solutions including Packaging Air Bags, Air Column Bags and other cushioning solutions designed to protect products during storage and transportation.",
    },
    {
        question: "Can D Pack provide customized packaging solutions?",
        answer:
            "Yes. D Pack can provide packaging solutions based on your product size, protection requirements, packaging process and transportation needs.",
    },
    {
        question: "Are D Pack Air Bags suitable for fragile products?",
        answer:
            "Yes. Air-based protective packaging can be used for fragile products such as electronics, glass items, appliances and other products that require additional protection during transit.",
    },
    {
        question: "Can I order packaging products in bulk?",
        answer:
            "Yes. D Pack works with businesses requiring regular and bulk packaging requirements. You can contact the team with your product and quantity requirements for further details.",
    },
    {
        question: "How can I request a quote from D Pack?",
        answer:
            "Simply fill out the inquiry form with your name, contact details and packaging requirement. The D Pack team can then get in touch with you regarding your requirement.",
    },
];

export default function FAQSection() {
    const [active, setActive] = useState(0);

    return (
        <section className="relative w-full overflow-hidden bg-[#F4F5F6] py-20 md:py-28">

            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border border-[#D4A017]/20" />

            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full border border-black/[0.05]" />

            <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

                {/* HEADER */}
                <div className="mb-14 max-w-[650px]">

                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-px w-12 bg-[#D4A017]" />

                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D4A017]">
                            FAQ & Inquiry
                        </span>
                    </div>

                    <h2 className="text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] text-[#111827] sm:text-[55px] md:text-[68px]">
                        Let’s solve your
                        <span className="block">
                            packaging needs.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-[560px] text-[14px] leading-7 text-[#64748B] md:text-[16px]">
                        Have questions about protective packaging solutions?
                        Send us your requirement and our team will get back to
                        you.
                    </p>
                </div>

                {/* MAIN GRID */}
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

                    {/* =====================================================
                        LEFT — FORM
                    ===================================================== */}

                    <div className="relative">

                        <div className="bg-[#111827] p-7 sm:p-9 md:p-10">

                            {/* FORM HEADER */}

                            <div className="mb-8 flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4A017]">
                                        Quick Inquiry
                                    </p>

                                    <h3 className="mt-2 text-[28px] font-medium tracking-[-0.04em] text-white">
                                        Tell us what you need.
                                    </h3>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center bg-[#D4A017] text-black">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>

                            <form className="space-y-5">

                                {/* NAME */}
                                <div>
                                    <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/50">
                                        Your Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="
                                            h-12
                                            w-full
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                            px-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-white/30
                                            focus:border-[#D4A017]
                                        "
                                    />
                                </div>

                                {/* COMPANY */}
                                <div>
                                    <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/50">
                                        Company Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter company name"
                                        className="
                                            h-12
                                            w-full
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                            px-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-white/30
                                            focus:border-[#D4A017]
                                        "
                                    />
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/50">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        placeholder="+91 Enter mobile number"
                                        className="
                                            h-12
                                            w-full
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                            px-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-white/30
                                            focus:border-[#D4A017]
                                        "
                                    />
                                </div>

                                {/* REQUIREMENT */}
                                <div>
                                    <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/50">
                                        Your Requirement
                                    </label>

                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your packaging requirement..."
                                        className="
                                            w-full
                                            resize-none
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                            p-4
                                            text-sm
                                            text-white
                                            outline-none
                                            placeholder:text-white/30
                                            focus:border-[#D4A017]
                                        "
                                    />
                                </div>

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    className="
                                        group
                                        flex
                                        h-13
                                        w-full
                                        items-center
                                        justify-between
                                        bg-[#D4A017]
                                        px-5
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.18em]
                                        text-black
                                        transition-all
                                        duration-300
                                        hover:bg-white
                                    "
                                >
                                    <span>Send Inquiry</span>

                                    <ArrowUpRight
                                        size={19}
                                        className="transition-transform duration-300 group-hover:rotate-45"
                                    />
                                </button>

                            </form>

                            {/* TRUST */}
                            <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5">
                                <CheckCircle2
                                    size={15}
                                    className="text-[#D4A017]"
                                />

                                <span className="text-[10px] text-white/40">
                                    Our team will contact you regarding your requirement.
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* =====================================================
                        RIGHT — FAQ
                    ===================================================== */}

                    <div>

                        <div className="mb-5 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                                Frequently Asked Questions
                            </span>

                            <span className="text-[10px] text-black/30">
                                05 QUESTIONS
                            </span>
                        </div>

                        <div className="border-t border-black/10">

                            {faqs.map((faq, index) => {
                                const isOpen = active === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className={`
                                            border-b
                                            border-black/10
                                            transition-all
                                            duration-500
                                            ${isOpen ? "bg-white" : "bg-transparent"}
                                        `}
                                    >

                                        {/* QUESTION */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActive(
                                                    isOpen ? -1 : index
                                                )
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                justify-between
                                                gap-6
                                                px-5
                                                py-6
                                                text-left
                                                md:px-7
                                                md:py-7
                                            "
                                        >

                                            <div className="flex items-center gap-5">

                                                <span
                                                    className={`
                                                        text-[10px]
                                                        tracking-[0.15em]
                                                        ${
                                                            isOpen
                                                                ? "text-[#D4A017]"
                                                                : "text-black/25"
                                                        }
                                                    `}
                                                >
                                                    0{index + 1}
                                                </span>

                                                <span
                                                    className={`
                                                        text-[15px]
                                                        font-medium
                                                        tracking-[-0.01em]
                                                        md:text-[17px]
                                                        ${
                                                            isOpen
                                                                ? "text-[#111827]"
                                                                : "text-[#334155]"
                                                        }
                                                    `}
                                                >
                                                    {faq.question}
                                                </span>

                                            </div>

                                            <span
                                                className={`
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    border
                                                    transition-all
                                                    duration-300
                                                    ${
                                                        isOpen
                                                            ? "border-[#D4A017] bg-[#D4A017] text-black"
                                                            : "border-black/10 bg-white text-black/50"
                                                    }
                                                `}
                                            >
                                                {isOpen ? (
                                                    <Minus size={16} />
                                                ) : (
                                                    <Plus size={16} />
                                                )}
                                            </span>

                                        </button>

                                        {/* ANSWER */}
                                        <div
                                            className={`
                                                grid
                                                transition-all
                                                duration-500
                                                ease-in-out
                                                ${
                                                    isOpen
                                                        ? "grid-rows-[1fr]"
                                                        : "grid-rows-[0fr]"
                                                }
                                            `}
                                        >
                                            <div className="overflow-hidden">
                                                <p
                                                    className="
                                                        max-w-[700px]
                                                        px-5
                                                        pb-7
                                                        pl-[65px]
                                                        text-[13px]
                                                        leading-7
                                                        text-[#64748B]
                                                        md:px-7
                                                        md:pl-[72px]
                                                        md:text-[14px]
                                                    "
                                                >
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}