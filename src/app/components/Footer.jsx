"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    ArrowRight,
} from "lucide-react";

/* ============================================================
   PRODUCT LINKS
============================================================ */

const productLinks = [
    { name: "Dunnage Bags", href: "/products/dunnage-bags" },
    { name: "Air Column Bags", href: "/products/air-column-bags" },
    { name: "Air Column Rolls", href: "/products/air-column-rolls" },
    { name: "Packaging Air Bags", href: "/products/packaging-air-bags" },
    { name: "Gap Fillers", href: "/products/gap-fillers" },
];

/* ============================================================
   COMPANY LINKS
============================================================ */

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Industries", href: "/industries" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get a Quote", href: "/contact" },
];

/* ============================================================
   FOOTER
============================================================ */

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0B2942] text-white">

            {/* ==================================================
                MAIN FOOTER
            ================================================== */}

            <div className="relative mx-auto w-full max-w-[1500px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">

                <div
                    className="
                        grid
                        gap-10
                        sm:grid-cols-2
                        lg:grid-cols-[1.45fr_1fr_1fr_1.2fr]
                        lg:gap-12
                    "
                >

                    {/* ==================================================
                        BRAND
                    ================================================== */}

                    <div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >

                            {/* LOGO BOX */}

                           
                            <div>

                             <img src="/logo (21).webp" alt="" />

                            </div>

                        </Link>


                        {/* DESCRIPTION */}

                        <p
                            className="
                                mt-5
                                max-w-[350px]
                                font-[var(--font-lexend)]
                                text-[12px]
                                leading-5
                                text-white/65
                            "
                        >
                            Smart protective packaging solutions designed
                            to keep products safer during storage, handling
                            and transportation.
                        </p>


                        {/* SMALL GOLD LINE */}

                        <div className="mt-5 flex items-center gap-3">

                            <span className="h-[2px] w-8 bg-[#E9B95F]" />

                            <span
                                className="
                                    text-[8px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/45
                                "
                            >
                                Protect • Pack • Deliver
                            </span>

                        </div>

                    </div>


                    {/* ==================================================
                        PRODUCTS
                    ================================================== */}

                    <div>

                        <h3
                            className="
                                mb-5
                                font-[var(--font-outfit)]
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-white
                            "
                        >
                            Products
                        </h3>

                        <ul className="space-y-2.5">

                            {productLinks.map((item) => (
                                <li key={item.name}>

                                    <Link
                                        href={item.href}
                                        className="
                                            group
                                            flex
                                            items-center
                                            justify-between
                                            py-0.5
                                            font-[var(--font-lexend)]
                                            text-[11px]
                                            font-normal
                                            text-white/60
                                            transition-all
                                            duration-300
                                            hover:text-white
                                        "
                                    >

                                        <span>
                                            {item.name}
                                        </span>

                                        <ArrowUpRight
                                            size={13}
                                            strokeWidth={1.5}
                                            className="
                                                text-white/25
                                                transition-all
                                                duration-300
                                                group-hover:translate-x-0.5
                                                group-hover:-translate-y-0.5
                                                group-hover:text-[#E9B95F]
                                            "
                                        />

                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>


                    {/* ==================================================
                        COMPANY
                    ================================================== */}

                    <div>

                        <h3
                            className="
                                mb-5
                                font-[var(--font-outfit)]
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-white
                            "
                        >
                            Company
                        </h3>

                        <ul className="space-y-2.5">

                            {companyLinks.map((item) => (
                                <li key={item.name}>

                                    <Link
                                        href={item.href}
                                        className="
                                            group
                                            flex
                                            items-center
                                            justify-between
                                            py-0.5
                                            font-[var(--font-lexend)]
                                            text-[11px]
                                            text-white/60
                                            transition-all
                                            duration-300
                                            hover:text-white
                                        "
                                    >

                                        <span>
                                            {item.name}
                                        </span>

                                        <ArrowUpRight
                                            size={13}
                                            strokeWidth={1.5}
                                            className="
                                                text-white/25
                                                transition-all
                                                duration-300
                                                group-hover:translate-x-0.5
                                                group-hover:-translate-y-0.5
                                                group-hover:text-[#E9B95F]
                                            "
                                        />

                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>


                    {/* ==================================================
                        CONTACT
                    ================================================== */}

                    <div>

                        <h3
                            className="
                                mb-5
                                font-[var(--font-outfit)]
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-white
                            "
                        >
                            Get In Touch
                        </h3>


                        <div className="space-y-4">

                            {/* PHONE */}

                            <a
                                href="tel:+919999999999"
                                className="group flex items-center gap-3"
                            >

                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        border
                                        border-white/15
                                        text-[#E9B95F]
                                        transition-all
                                        duration-300
                                        group-hover:border-[#E9B95F]
                                        group-hover:bg-[#E9B95F]
                                        group-hover:text-[#0B2942]
                                    "
                                >
                                    <Phone size={13} />
                                </span>

                                <div>

                                    <span
                                        className="
                                            block
                                            text-[8px]
                                            font-medium
                                            uppercase
                                            tracking-[0.15em]
                                            text-white/40
                                        "
                                    >
                                        Call Us
                                    </span>

                                    <span
                                        className="
                                            mt-0.5
                                            block
                                            font-[var(--font-lexend)]
                                            text-[11px]
                                            text-white
                                        "
                                    >
                                        +91 99999 99999
                                    </span>

                                </div>

                            </a>


                            {/* EMAIL */}

                            <a
                                href="mailto:info@dpack.in"
                                className="group flex items-center gap-3"
                            >

                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        border
                                        border-white/15
                                        text-[#E9B95F]
                                        transition-all
                                        duration-300
                                        group-hover:border-[#E9B95F]
                                        group-hover:bg-[#E9B95F]
                                        group-hover:text-[#0B2942]
                                    "
                                >
                                    <Mail size={13} />
                                </span>

                                <div>

                                    <span
                                        className="
                                            block
                                            text-[8px]
                                            font-medium
                                            uppercase
                                            tracking-[0.15em]
                                            text-white/40
                                        "
                                    >
                                        Email
                                    </span>

                                    <span
                                        className="
                                            mt-0.5
                                            block
                                            font-[var(--font-lexend)]
                                            text-[11px]
                                            text-white
                                        "
                                    >
                                        info@dpack.in
                                    </span>

                                </div>

                            </a>


                            {/* LOCATION */}

                            <div className="flex items-center gap-3">

                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        border
                                        border-white/15
                                        text-[#E9B95F]
                                    "
                                >
                                    <MapPin size={13} />
                                </span>

                                <div>

                                    <span
                                        className="
                                            block
                                            text-[8px]
                                            font-medium
                                            uppercase
                                            tracking-[0.15em]
                                            text-white/40
                                        "
                                    >
                                        Location
                                    </span>

                                    <span
                                        className="
                                            mt-0.5
                                            block
                                            font-[var(--font-lexend)]
                                            text-[11px]
                                            text-white
                                        "
                                    >
                                        India
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                CTA STRIP
            ================================================== */}

            <div className="border-y border-white/10 bg-[#09243A]">

                <div
                    className="
                        mx-auto
                        flex
                        max-w-[1500px]
                        flex-col
                        gap-4
                        px-5
                        py-5
                        sm:px-8
                        md:flex-row
                        md:items-center
                        md:justify-between
                        lg:px-12
                    "
                >

                    <div>

                        <p
                            className="
                                font-[var(--font-outfit)]
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-white
                            "
                        >
                            Need Bulk Packaging?
                        </p>

                        <p
                            className="
                                mt-1
                                font-[var(--font-lexend)]
                                text-[10px]
                                text-white/50
                            "
                        >
                            Tell us what you need and our team will help.
                        </p>

                    </div>


                    <Link
                        href="/contact"
                        className="
                            group
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            border
                            border-white/20
                            px-4
                            py-2
                            font-[var(--font-outfit)]
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-white
                            transition-all
                            duration-300
                            hover:border-[#E9B95F]
                            hover:bg-[#E9B95F]
                            hover:text-[#0B2942]
                        "
                    >

                        Talk To Sales

                        <ArrowRight
                            size={12}
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />

                    </Link>

                </div>

            </div>


            {/* ==================================================
                BOTTOM BAR
            ================================================== */}

            <div className="bg-[#071D2E]">

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
                            font-[var(--font-lexend)]
                            text-[9px]
                            text-white/40
                        "
                    >
                        © {new Date().getFullYear()} D Pack. All rights reserved.
                    </p>


                    <div className="flex items-center gap-5">

                        <Link
                            href="/privacy-policy"
                            className="
                                font-[var(--font-lexend)]
                                text-[9px]
                                text-white/40
                                transition
                                hover:text-white
                            "
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="
                                font-[var(--font-lexend)]
                                text-[9px]
                                text-white/40
                                transition
                                hover:text-white
                            "
                        >
                            Terms & Conditions
                        </Link>

                    </div>


                    <p
                        className="
                            hidden
                            font-[var(--font-outfit)]
                            text-[8px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-white/30
                            md:block
                        "
                    >
                        Protective Packaging Solutions
                    </p>

                </div>

            </div>

        </footer>
    );
}