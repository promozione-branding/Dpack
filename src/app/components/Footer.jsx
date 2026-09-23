"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    ArrowRight,
} from "lucide-react";

const productLinks = [
    { name: "Dunnage Bags", href: "/products/dunnage-bags" },
    { name: "Air Column Bags", href: "/products/air-column-bags" },
    { name: "Air Column Rolls", href: "/products/air-column-rolls" },
    { name: "Packaging Air Bags", href: "/products/packaging-air-bags" },
    { name: "Gap Fillers", href: "/products/gap-fillers" },
];

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Industries", href: "/industries" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get a Quote", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#171918] text-white">

            {/* =====================================================
                DECORATIVE BACKGROUND
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[180px]
                    -top-[180px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    border
                    border-[#E9B95F]/10
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-[250px]
                    -left-[200px]
                    h-[550px]
                    w-[550px]
                    rounded-full
                    border
                    border-white/[0.04]
                "
            />

    
            {/* =====================================================
                MAIN FOOTER
            ===================================================== */}

            <div className="relative">

                <div
                    className="
                        mx-auto
                        max-w-[1500px]
                        px-5
                        py-16
                        md:px-10
                        md:py-20
                        lg:px-16
                    "
                >

                    <div
                        className="
                            grid
                            gap-14
                            sm:grid-cols-2
                            lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]
                        "
                    >

                        {/* BRAND */}
                        <div>

                            <Link
                                href="/"
                                className="
                                    inline-flex
                                    items-center
                                    gap-3
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#E9B95F]
                                        text-[18px]
                                        font-bold
                                        text-[#171918]
                                    "
                                >
                                    D
                                </span>

                                <div>
                                    <div
                                        className="
                                            text-[22px]
                                            font-semibold
                                            tracking-[-0.04em]
                                            text-[#F7F2EB]
                                        "
                                    >
                                        D PACK
                                    </div>

                                    <div
                                        className="
                                            text-[8px]
                                            uppercase
                                            tracking-[0.25em]
                                            text-white/30
                                        "
                                    >
                                        Protective Packaging
                                    </div>
                                </div>
                            </Link>

                            <p
                                className="
                                    mt-7
                                    max-w-[320px]
                                    text-[13px]
                                    leading-6
                                    text-white/40
                                "
                            >
                                Smart protective packaging solutions designed
                                to keep products safer throughout storage,
                                handling and transportation.
                            </p>

                            {/* GOLD LINE */}
                            <div className="mt-8 flex items-center gap-3">
                                <span className="h-px w-10 bg-[#E9B95F]" />
                                <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                                    Protect • Pack • Deliver
                                </span>
                            </div>
                        </div>

                        {/* PRODUCTS */}
                        <div>
                            <h3
                                className="
                                    mb-6
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.28em]
                                    text-[#E9B95F]
                                "
                            >
                                Products
                            </h3>

                            <ul className="space-y-4">
                                {productLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="
                                                group
                                                flex
                                                items-center
                                                justify-between
                                                border-b
                                                border-white/[0.06]
                                                pb-3
                                                text-[13px]
                                                text-white/55
                                                transition-colors
                                                duration-300
                                                hover:text-[#F7F2EB]
                                            "
                                        >
                                            {item.name}

                                            <ArrowUpRight
                                                size={14}
                                                className="
                                                    text-white/20
                                                    transition-all
                                                    duration-300
                                                    group-hover:-translate-y-0.5
                                                    group-hover:translate-x-0.5
                                                    group-hover:text-[#E9B95F]
                                                "
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* COMPANY */}
                        <div>
                            <h3
                                className="
                                    mb-6
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.28em]
                                    text-[#E9B95F]
                                "
                            >
                                Company
                            </h3>

                            <ul className="space-y-4">
                                {companyLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="
                                                group
                                                flex
                                                items-center
                                                justify-between
                                                border-b
                                                border-white/[0.06]
                                                pb-3
                                                text-[13px]
                                                text-white/55
                                                transition-colors
                                                duration-300
                                                hover:text-[#F7F2EB]
                                            "
                                        >
                                            {item.name}

                                            <ArrowUpRight
                                                size={14}
                                                className="
                                                    text-white/20
                                                    transition-all
                                                    duration-300
                                                    group-hover:-translate-y-0.5
                                                    group-hover:translate-x-0.5
                                                    group-hover:text-[#E9B95F]
                                                "
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h3
                                className="
                                    mb-6
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.28em]
                                    text-[#E9B95F]
                                "
                            >
                                Get In Touch
                            </h3>

                            <div className="space-y-6">

                                {/* PHONE */}
                                <a
                                    href="tel:+919999999999"
                                    className="group flex gap-4"
                                >
                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-white/10
                                            text-[#E9B95F]
                                            transition
                                            group-hover:border-[#E9B95F]
                                        "
                                    >
                                        <Phone size={15} />
                                    </span>

                                    <div>
                                        <span className="block text-[9px] uppercase tracking-[0.2em] text-white/25">
                                            Call Us
                                        </span>

                                        <span className="mt-1 block text-[13px] text-white/65">
                                            +91 99999 99999
                                        </span>
                                    </div>
                                </a>

                                {/* EMAIL */}
                                <a
                                    href="mailto:info@dpack.in"
                                    className="group flex gap-4"
                                >
                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-white/10
                                            text-[#E9B95F]
                                            transition
                                            group-hover:border-[#E9B95F]
                                        "
                                    >
                                        <Mail size={15} />
                                    </span>

                                    <div>
                                        <span className="block text-[9px] uppercase tracking-[0.2em] text-white/25">
                                            Email
                                        </span>

                                        <span className="mt-1 block text-[13px] text-white/65">
                                            info@dpack.in
                                        </span>
                                    </div>
                                </a>

                                {/* LOCATION */}
                                <div className="flex gap-4">
                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-white/10
                                            text-[#E9B95F]
                                        "
                                    >
                                        <MapPin size={15} />
                                    </span>

                                    <div>
                                        <span className="block text-[9px] uppercase tracking-[0.2em] text-white/25">
                                            Location
                                        </span>

                                        <span className="mt-1 block text-[13px] leading-5 text-white/65">
                                            India
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* =====================================================
                NEWSLETTER / QUICK ENQUIRY STRIP
            ===================================================== */}

            <div className="relative border-y border-white/[0.08]">

                <div
                    className="
                        mx-auto
                        flex
                        max-w-[1500px]
                        flex-col
                        gap-6
                        px-5
                        py-7
                        md:flex-row
                        md:items-center
                        md:justify-between
                        md:px-10
                        lg:px-16
                    "
                >

                    <div>
                        <p
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-[#E9B95F]
                            "
                        >
                            Need Bulk Packaging?
                        </p>

                        <p className="mt-2 text-[13px] text-white/40">
                            Tell us what you need and our team will help you
                            find the right solution.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="
                            group
                            inline-flex
                            w-fit
                            items-center
                            gap-3
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-white/70
                            transition
                            hover:text-[#E9B95F]
                        "
                    >
                        Talk To Sales

                        <span
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/15
                                transition
                                group-hover:border-[#E9B95F]
                                group-hover:bg-[#E9B95F]
                                group-hover:text-[#171918]
                            "
                        >
                            <ArrowRight size={14} />
                        </span>
                    </Link>

                </div>
            </div>

            {/* =====================================================
                BOTTOM BAR
            ===================================================== */}

            <div className="relative">

                <div
                    className="
                        mx-auto
                        flex
                        max-w-[1500px]
                        flex-col
                        gap-4
                        px-5
                        py-6
                        md:flex-row
                        md:items-center
                        md:justify-between
                        md:px-10
                        lg:px-16
                    "
                >

                    <p className="text-[10px] tracking-wide text-white/25">
                        © {new Date().getFullYear()} D Pack. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy-policy"
                            className="
                                text-[10px]
                                text-white/25
                                transition
                                hover:text-[#E9B95F]
                            "
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="
                                text-[10px]
                                text-white/25
                                transition
                                hover:text-[#E9B95F]
                            "
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                    <p
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.25em]
                            text-white/20
                        "
                    >
                        Protective Packaging Solutions
                    </p>

                </div>
            </div>

        </footer>
    );
}