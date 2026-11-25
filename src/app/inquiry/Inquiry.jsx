"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    ChevronRight,
    ChevronDown,
    ArrowUpRight,
    Package,
    Ruler,
    X,
    RotateCcw,
    PackageSearch,
} from "lucide-react";

const gapFillerProducts = [
    {
        id: 1,
        size: "100 × 200mm",
        name: "Shoe Gap Filler for Footwear Packaging – 100 × 200mm, 237 Pcs",
        quantity: 237,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-100mm-x-200mm",
    },
    {
        id: 2,
        size: "100 × 200mm",
        name: "Air Cushion Gap Filler for Shoe Box Packing – 100 × 200mm, 237 Pcs",
        quantity: 237,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-100mm-x-200mm",
    },
    {
        id: 3,
        size: "100 × 200mm",
        name: "Gap Filler for Small Parcel Packaging – 100 × 200mm, 237 Pcs",
        quantity: 237,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-100mm-x-200mm",
    },
    {
        id: 4,
        size: "200 × 200mm",
        name: "Shoe Gap Filler for Sports Shoes Packaging – 200 × 200mm, 118 Pcs",
        quantity: 118,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/65b6450c-4dc2-4e3d-9248-9590f4132bee",
        slug: "/products/gap-filler-200mmx-200mm-118-pcs",
    },
    {
        id: 5,
        size: "200 × 200mm",
        name: "Air Gap Filler for Mobile Accessories Packaging – 200 × 200mm, 118 Pcs",
        quantity: 118,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/65b6450c-4dc2-4e3d-9248-9590f4132bee",
        slug: "/products/gap-filler-200mmx-200mm-118-pcs",
    },
    {
        id: 6,
        size: "200 × 200mm",
        name: "Gap Filler for E-commerce Parcel Packing – 200 × 200mm, 118 Pcs",
        quantity: 118,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/65b6450c-4dc2-4e3d-9248-9590f4132bee",
        slug: "/products/gap-filler-200mmx-200mm-118-pcs",
    },
    {
        id: 7,
        size: "200 × 300mm",
        name: "Shoe Gap Filler for Shoe and Sneaker Packaging – 200 × 300mm, 78 Pcs",
        quantity: 78,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-200mmx-300mm",
    },
    {
        id: 8,
        size: "200 × 300mm",
        name: "Gap Filler for Footwear and Sandal Packaging – 200 × 300mm, 78 Pcs",
        quantity: 78,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-200mmx-300mm",
    },
    {
        id: 9,
        size: "200 × 300mm",
        name: "Air Cushion Filler for Courier Box Packaging – 200 × 300mm, 78 Pcs",
        quantity: 78,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-200mmx-300mm",
    },
    {
        id: 10,
        size: "300 × 400mm",
        name: "Shoe Gap Filler for Large Footwear Boxes – 300 × 400mm, 52 Pcs",
        quantity: 52,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/65b6450c-4dc2-4e3d-9248-9590f4132bee",
        slug: "/products/gap-filler-300mm-x-400mm",
    },
    {
        id: 11,
        size: "300 × 400mm",
        name: "Gap Filler for Handbag and Leather Product Packaging – 300 × 400mm, 52 Pcs",
        quantity: 52,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/65b6450c-4dc2-4e3d-9248-9590f4132bee",
        slug: "/products/gap-filler-300mm-x-400mm",
    },
    {
        id: 12,
        size: "300 × 400mm",
        name: "Air Cushion Filler for Glass Product Packaging – 300 × 400mm, 52 Pcs",
        quantity: 52,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/65b6450c-4dc2-4e3d-9248-9590f4132bee",
        slug: "/products/gap-filler-300mm-x-400mm",
    },
    {
        id: 13,
        size: "400 × 400mm",
        name: "Large Shoe Gap Filler for Bulk Footwear Packaging – 400 × 400mm, 29 Pcs",
        quantity: 29,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-320mm-x-390mm",
    },
    {
        id: 14,
        size: "400 × 400mm",
        name: "Gap Filler for Large Carton Box Packaging – 400 × 400mm, 29 Pcs",
        quantity: 29,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-320mm-x-390mm",
    },
    {
        id: 15,
        size: "400 × 400mm",
        name: "Air Cushion Gap Filler for Furniture Packaging – 400 × 400mm, 29 Pcs",
        quantity: 29,
        image: "https://pub-6773b48348124a078cb55322f384ad44.r2.dev/dpack/products/3d7fb175-342c-4c19-a033-4b6ef15f3155",
        slug: "/products/gap-filler-320mm-x-390mm",
    },
];

const sizes = [...new Set(gapFillerProducts.map((item) => item.size))];

export default function Inquiry() {
    const [search, setSearch] = useState("");
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [mobileFilter, setMobileFilter] = useState(false);

    // Prevent background scrolling when mobile filter is open
    useEffect(() => {
        if (!mobileFilter) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (e) => {
            if (e.key === "Escape") setMobileFilter(false);
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [mobileFilter]);

    // Toggle size filter
    const handleSizeChange = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((item) => item !== size)
                : [...prev, size]
        );
    };

    // Reset all filters
    const clearFilters = () => {
        setSelectedSizes([]);
        setSearch("");
        setSortBy("default");
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        let products = gapFillerProducts.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchValue) ||
                product.size.toLowerCase().includes(searchValue);

            const matchesSize =
                selectedSizes.length === 0 ||
                selectedSizes.includes(product.size);

            return matchesSearch && matchesSize;
        });

        switch (sortBy) {
            case "name-asc":
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "name-desc":
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;

            case "quantity-asc":
                products.sort((a, b) => a.quantity - b.quantity);
                break;

            case "quantity-desc":
                products.sort((a, b) => b.quantity - a.quantity);
                break;

            default:
                break;
        }

        return products;
    }, [search, selectedSizes, sortBy]);

    const hasFilters =
        selectedSizes.length > 0 ||
        search.trim() !== "" ||
        sortBy !== "default";

    // Reusable filter sidebar
    const renderFilters = () => (
        <div className="space-y-6">

            {/* Filter Heading */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={19} />
                    <h2 className="text-lg font-semibold text-gray-900">
                        Filters
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs font-medium text-[var(--primary,#102A43)] hover:underline"
                >
                    <RotateCcw size={12} />
                    Reset
                </button>
            </div>

            {/* Size Filter */}
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                        Product Size
                    </h3>

                    <ChevronDown size={17} className="text-gray-500" />
                </div>

                <div className="space-y-3">
                    {sizes.map((size) => {
                        const count = gapFillerProducts.filter(
                            (product) => product.size === size
                        ).length;

                        const isSelected = selectedSizes.includes(size);

                        return (
                            <label
                                key={size}
                                className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-3 transition-all ${isSelected
                                    ? "border-[var(--primary,#102A43)] bg-gray-50"
                                    : "border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSizeChange(size)}
                                        className="h-4 w-4 cursor-pointer accent-[var(--primary,#102A43)]"
                                    />

                                    <span className="text-sm text-gray-700">
                                        {size}
                                    </span>
                                </div>

                                <span className="text-xs text-gray-400">
                                    ({count})
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Information */}
            <div className="rounded-xl bg-gray-50 p-4">
                <Package
                    size={25}
                    className="mb-3 text-[var(--primary,#102A43)]"
                />

                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    Need Bulk Packaging?
                </h3>

                <p className="mb-4 text-xs leading-relaxed text-gray-500">
                    Get customized packaging solutions for your business
                    requirements.
                </p>

                <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary,#102A43)]"
                >
                    Contact Us
                    <ArrowUpRight size={15} />
                </Link>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#f8f9fb]">
            {/* Products Section */}
            <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-8 lg:px-12 lg:py-12">

                <div className="grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">

                    {/* Desktop Filter Sidebar */}
                    <aside className="sticky top-5 hidden rounded-2xl border border-gray-200 bg-white p-5 lg:block">
                        {renderFilters()}
                    </aside>

                    {/* Main Products Area */}
                    <div className="min-w-0">

                        {/* Search and Sorting */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">

                            <div className="flex flex-col gap-3 sm:flex-row">

                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <Search
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        aria-label="Search products"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search products..."
                                        className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm outline-none transition-colors focus:border-[var(--primary,#102A43)]"
                                    />

                                    {search && (
                                        <button
                                            type="button"
                                            aria-label="Clear search"
                                            onClick={() => setSearch("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                                        >
                                            <X size={17} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex gap-3">

                                    {/* Mobile Filter Button */}
                                    <button
                                        type="button"
                                        onClick={() => setMobileFilter(true)}
                                        className="flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium lg:hidden"
                                    >
                                        <SlidersHorizontal size={17} />

                                        Filters

                                        {selectedSizes.length > 0 && (
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary,#102A43)] text-xs text-white">
                                                {selectedSizes.length}
                                            </span>
                                        )}
                                    </button>

                                    {/* Sorting */}
                                    <select
                                        aria-label="Sort products"
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                        className="h-12 min-w-0 flex-1 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none sm:flex-none"
                                    >
                                        <option value="default">
                                            Default Sorting
                                        </option>

                                        <option value="name-asc">
                                            Name: A to Z
                                        </option>

                                        <option value="name-desc">
                                            Name: Z to A
                                        </option>

                                        <option value="quantity-asc">
                                            Quantity: Low to High
                                        </option>

                                        <option value="quantity-desc">
                                            Quantity: High to Low
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Product Count */}
                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                <p className="text-sm text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-900">
                                        {filteredProducts.length}
                                    </span>{" "}
                                    of {gapFillerProducts.length} products
                                </p>

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-xs font-medium text-[var(--primary,#102A43)] hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Active Filters */}
                        {selectedSizes.length > 0 && (
                            <div className="mb-5 flex flex-wrap gap-2">
                                {selectedSizes.map((size) => (
                                    <button
                                        type="button"
                                        key={size}
                                        onClick={() => handleSizeChange(size)}
                                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        {size}
                                        <X size={13} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                                {filteredProducts.map((product) => (
                                    <article
                                        key={product.id}
                                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        {/* Product Image */}
                                        <Link
                                            href={`${product.slug}`}
                                            className="relative block aspect-[4/4] overflow-hidden bg-[#f5f6f8]"
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            {/* Size Label */}
                                            <span className="absolute left-3 top-3 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
                                                {product.size}
                                            </span>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col p-4">
                                            <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                                Air Cushion Gap Filler
                                            </span>

                                            <Link
                                                href={`${product.slug}`}
                                                className="mb-4 block"
                                            >
                                                <h2 className="line-clamp-3 text-[15px] font-semibold leading-[22px] text-gray-900 transition-colors hover:text-[var(--primary,#102A43)]">
                                                    {product.name}
                                                </h2>
                                            </Link>

                                            {/* Specifications */}
                                            <div className="mb-2 grid grid-cols-2 divide-x divide-gray-200 rounded-lg border border-gray-200 bg-gray-50">

                                                <div className="p-3">
                                                    <div className="mb-1 flex items-center gap-1.5 text-[11px] text-gray-500">
                                                        <Ruler size={14} />
                                                        Size
                                                    </div>

                                                    <p className="text-xs font-semibold text-gray-800">
                                                        {product.size}
                                                    </p>
                                                </div>

                                                <div className="p-3">
                                                    <div className="mb-1 flex items-center gap-1.5 text-[11px] text-gray-500">
                                                        <Package size={14} />
                                                        Quantity
                                                    </div>

                                                    <p className="text-xs font-semibold text-gray-800">
                                                        {product.quantity} Pcs
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Inquiry Button */}
                                            <Link
                                                href={`${product.slug}`}
                                                className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary,#102A43)] px-4 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                                            >
                                                View Product

                                                <ArrowUpRight
                                                    size={17}
                                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (

                            /* Empty State */
                            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">

                                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                    <PackageSearch
                                        size={35}
                                        className="text-gray-400"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">
                                    No Products Found
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                                    We couldn't find any products matching
                                    your search or selected filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-6 rounded-lg bg-[var(--primary,#102A43)] px-6 py-3 text-sm font-medium text-white"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Mobile Filter Sidebar */}
            {mobileFilter && (
                <div className="fixed inset-0 z-[9999] lg:hidden">

                    {/* Overlay */}
                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() => setMobileFilter(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Product filters"
                        className="absolute bottom-0 left-0 top-0 flex w-[85%] max-w-[350px] flex-col bg-white shadow-2xl"
                    >

                        <div className="flex items-center justify-between border-b border-gray-200 p-5">
                            <h2 className="font-semibold text-gray-900">
                                Filter Products
                            </h2>

                            <button
                                type="button"
                                aria-label="Close filters"
                                onClick={() => setMobileFilter(false)}
                                className="rounded-full bg-gray-100 p-2"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5">
                            {renderFilters()}
                        </div>

                        <div className="border-t border-gray-200 p-5">
                            <button
                                type="button"
                                onClick={() => setMobileFilter(false)}
                                className="w-full rounded-lg bg-[var(--primary,#102A43)] py-3.5 text-sm font-medium text-white"
                            >
                                Show {filteredProducts.length} Products
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </main>
    );
}