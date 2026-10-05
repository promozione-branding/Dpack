"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  ShoppingCart,
  Heart,
  GitCompare,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Star,
  ZoomIn,
  Check,
  MapPin,
} from "lucide-react";

import products, {
  getProductBySlug,
  getRelatedProducts,
} from "@/app/Data/products";

/* =========================================================
   PRODUCT SPECIFICATIONS
   Fallback specifications for products which don't have
   custom specs inside products.js
========================================================= */

const defaultSpecs = [
  ["Product Type", "Protective Packaging Solution"],
  ["Application", "Product Protection & Packaging"],
  ["Suitable For", "Fragile & Sensitive Products"],
  ["Protection Type", "Cushioning & Impact Protection"],
  ["Material", "High-Strength Packaging Material"],
  ["Structure", "Protective Packaging Structure"],
  ["Usage", "Shipping, Storage & Transportation"],
  ["Packaging Benefit", "Lightweight & Space Efficient"],
  ["Customization", "Available as per Requirement"],
  ["Dispatch", "Fast & Secure Dispatch"],
];

/* =========================================================
   PRODUCT-SPECIFIC CONTENT
========================================================= */

const productContent = {
  "air-column-bag": {
    category: "Packaging & Protection",

    description:
      "High-quality air column packaging solution designed to protect fragile products during shipping, storage and transportation.",

    keyFeatures: [
      "Lightweight & durable",
      "Excellent impact protection",
      "Space efficient storage",
      "Ideal for fragile products",
      "Easy air inflation",
      "Custom sizes available",
    ],

    overviewTitle: "Protection that travels",
    overviewTitleSecond: "with your product.",

    overviewParagraphs: [
      "The Air Column Bag is designed to provide effective cushioning and protection for fragile products during transportation, handling and storage.",
      "Its air-filled column structure absorbs external impact while keeping the packaging lightweight, space efficient and easy to handle.",
    ],

    advantages: [
      "Excellent cushioning against impact",
      "Lightweight compared with traditional packaging",
      "Efficient use of warehouse space",
      "Suitable for fragile and sensitive products",
      "Simple inflation and application",
      "Customization available",
    ],

    specs: [
      ["Product Type", "Air Column Bag"],
      ["Application", "Protective Product Packaging"],
      ["Suitable For", "Electronics & Fragile Products"],
      ["Protection Type", "Air Cushion Protection"],
      ["Material", "High-Strength Packaging Film"],
      ["Structure", "Air Column / Air Chamber"],
      ["Usage", "Shipping, Storage & Transportation"],
      ["Inflation", "Air Inflation"],
      ["Packaging Benefit", "Lightweight & Space Efficient"],
      ["Customization", "Available as per Requirement"],
    ],
  },

  "dunnage-air-bag": {
    category: "Dunnage Packaging",

    description:
      "Reliable dunnage air bag solution designed to secure cargo, reduce movement and provide effective protection during transportation and handling.",

    keyFeatures: [
      "Strong cargo stabilization",
      "Reduces product movement",
      "Lightweight construction",
      "Easy to install",
      "Suitable for transportation",
      "Multiple sizes available",
    ],

    overviewTitle: "Cargo protection that",
    overviewTitleSecond: "moves with your shipment.",

    overviewParagraphs: [
      "Dunnage Air Bags are designed to stabilize cargo and reduce unwanted movement inside transport containers, trucks and shipping loads.",
      "The air-filled structure creates cushioning between cargo units and helps minimize shifting, impact and damage during transportation.",
    ],

    advantages: [
      "Helps prevent cargo movement",
      "Provides effective cushioning",
      "Lightweight and easy to handle",
      "Quick installation and inflation",
      "Suitable for multiple transportation applications",
      "Available in different sizes",
    ],

    specs: [
      ["Product Type", "Dunnage Air Bag"],
      ["Application", "Cargo Stabilization"],
      ["Suitable For", "Industrial & Transport Cargo"],
      ["Protection Type", "Air Cushion Protection"],
      ["Material", "High-Strength Packaging Film"],
      ["Structure", "Inflatable Air Chamber"],
      ["Usage", "Shipping & Transportation"],
      ["Inflation", "Air Inflation"],
      ["Packaging Benefit", "Lightweight & Reusable"],
      ["Customization", "Available as per Requirement"],
    ],
  },

  "air-column-roll": {
    category: "Air Column Packaging",

    description:
      "Flexible air column roll packaging solution designed to provide cushioning and protection for fragile products during storage, handling and transportation.",

    keyFeatures: [
      "Flexible protective packaging",
      "Excellent shock absorption",
      "Lightweight design",
      "Easy to cut and use",
      "Suitable for fragile products",
      "Space saving solution",
    ],

    overviewTitle: "Flexible protection for",
    overviewTitleSecond: "every packaging requirement.",

    overviewParagraphs: [
      "Air Column Roll provides a flexible cushioning solution for businesses that need protective packaging for products of different sizes and shapes.",
      "The air-filled structure helps absorb external impact while offering lightweight handling, easy storage and efficient packaging.",
    ],

    advantages: [
      "Effective impact and shock protection",
      "Flexible for different product sizes",
      "Lightweight packaging solution",
      "Efficient storage before inflation",
      "Easy to cut and apply",
      "Suitable for fragile products",
    ],

    specs: [
      ["Product Type", "Air Column Roll"],
      ["Application", "Protective Product Packaging"],
      ["Suitable For", "Fragile & Sensitive Products"],
      ["Protection Type", "Air Cushion Protection"],
      ["Material", "High-Strength Packaging Film"],
      ["Structure", "Air Column Roll"],
      ["Usage", "Shipping, Storage & Transportation"],
      ["Inflation", "Air Inflation"],
      ["Packaging Benefit", "Flexible & Space Efficient"],
      ["Customization", "Available as per Requirement"],
    ],
  },

  "packaging-air-bag": {
    category: "Packaging Air Bags",

    description:
      "Protective packaging air bag designed to fill empty spaces, cushion products and reduce the risk of damage during transportation and storage.",

    keyFeatures: [
      "Effective void protection",
      "Lightweight packaging",
      "Shock absorbing structure",
      "Easy to use",
      "Space efficient storage",
      "Suitable for multiple products",
    ],

    overviewTitle: "Smarter cushioning for",
    overviewTitleSecond: "safer product delivery.",

    overviewParagraphs: [
      "Packaging Air Bags provide lightweight cushioning and protection for products during transportation, handling and storage.",
      "Their air-filled construction helps absorb external impact and fill packaging spaces while reducing unnecessary packaging weight.",
    ],

    advantages: [
      "Helps reduce product damage",
      "Lightweight alternative to bulky packaging",
      "Efficient void filling",
      "Easy handling and application",
      "Space efficient before inflation",
      "Suitable for multiple packaging applications",
    ],

    specs: defaultSpecs,
  },

  "gap-filler": {
    category: "Gap Fillers",

    description:
      "Efficient gap filling packaging solution designed to reduce product movement and provide additional protection during shipping and transportation.",

    keyFeatures: [
      "Effective void filling",
      "Reduces product movement",
      "Lightweight packaging",
      "Easy application",
      "Shock absorption",
      "Space efficient",
    ],

    overviewTitle: "Fill the gap.",
    overviewTitleSecond: "Protect every shipment.",

    overviewParagraphs: [
      "Gap Fillers are designed to secure products inside cartons and shipping containers by reducing empty spaces around the packed items.",
      "They help minimize product movement and provide additional cushioning during transportation and handling.",
    ],

    advantages: [
      "Reduces movement inside packaging",
      "Provides additional cushioning",
      "Lightweight and easy to handle",
      "Efficient use of packaging space",
      "Quick and simple application",
      "Suitable for shipping applications",
    ],

    specs: defaultSpecs,
  },

  "air-pillow-packaging": {
    category: "Packaging Air Bags",

    description:
      "Lightweight air pillow packaging solution designed to cushion products, fill empty spaces and provide reliable protection during shipping and storage.",

    keyFeatures: [
      "Lightweight cushioning",
      "Excellent void filling",
      "Easy handling",
      "Space saving design",
      "Impact protection",
      "Suitable for fragile products",
    ],

    overviewTitle: "Lightweight protection.",
    overviewTitleSecond: "Maximum packaging efficiency.",

    overviewParagraphs: [
      "Air Pillow Packaging provides lightweight cushioning and void filling for products that require additional protection during transportation.",
      "The air-based structure helps reduce product movement while minimizing packaging weight and storage requirements.",
    ],

    advantages: [
      "Excellent void filling",
      "Lightweight construction",
      "Easy to store before inflation",
      "Helps reduce product movement",
      "Simple application",
      "Suitable for multiple packaging applications",
    ],

    specs: defaultSpecs,
  },

  "air-bubble-roll": {
    category: "Protective Packaging",

    description:
      "Protective air bubble roll designed to cushion and protect products from scratches, impacts and handling damage during storage and transportation.",

    keyFeatures: [
      "Impact cushioning",
      "Scratch protection",
      "Lightweight design",
      "Flexible packaging",
      "Easy to cut and use",
      "Suitable for fragile products",
    ],

    overviewTitle: "Every layer of protection",
    overviewTitleSecond: "for every shipment.",

    overviewParagraphs: [
      "Air Bubble Roll provides an effective protective layer around products during handling, storage and transportation.",
      "Its flexible bubble structure helps absorb minor impacts and reduce the risk of scratches and surface damage.",
    ],

    advantages: [
      "Helps absorb minor impacts",
      "Protects surfaces from scratches",
      "Lightweight and flexible",
      "Easy to cut and apply",
      "Suitable for different product sizes",
      "Convenient storage and handling",
    ],

    specs: defaultSpecs,
  },

  "epe-foam-roll": {
    category: "Protective Packaging",

    description:
      "EPE Foam Roll provides lightweight cushioning and surface protection for products during packing, transportation and storage.",

    keyFeatures: [
      "Lightweight cushioning",
      "Surface protection",
      "Flexible material",
      "Easy handling",
      "Shock absorption",
      "Multiple applications",
    ],

    overviewTitle: "Soft cushioning.",
    overviewTitleSecond: "Reliable product protection.",

    overviewParagraphs: [
      "EPE Foam Roll provides a lightweight protective layer for products that require cushioning and surface protection during transportation.",
      "Its flexible foam structure makes it suitable for wrapping, separating and protecting a wide range of products.",
    ],

    advantages: [
      "Provides cushioning against impact",
      "Protects product surfaces",
      "Lightweight and flexible",
      "Easy to cut and handle",
      "Suitable for multiple applications",
      "Efficient packaging solution",
    ],

    specs: defaultSpecs,
  },

  "protective-packaging-film": {
    category: "Protective Packaging",

    description:
      "Protective packaging film designed to provide an additional layer of protection against scratches, dust and handling damage during transportation and storage.",

    keyFeatures: [
      "Surface protection",
      "Helps prevent scratches",
      "Lightweight material",
      "Easy application",
      "Flexible packaging",
      "Suitable for multiple products",
    ],

    overviewTitle: "A protective layer",
    overviewTitleSecond: "between your product and damage.",

    overviewParagraphs: [
      "Protective Packaging Film is designed to provide an additional layer of protection for products during handling, storage and transportation.",
      "The flexible film helps reduce the risk of scratches, dust and surface-level handling damage.",
    ],

    advantages: [
      "Helps protect product surfaces",
      "Reduces scratches and dust exposure",
      "Lightweight packaging solution",
      "Easy application",
      "Flexible for different products",
      "Suitable for shipping and storage",
    ],

    specs: defaultSpecs,
  },

  "protective-air-packaging": {
    category: "Air Column Packaging",

    description:
      "Advanced protective air packaging solution designed to cushion fragile products and provide reliable protection throughout shipping, handling and storage.",

    keyFeatures: [
      "Advanced impact protection",
      "Lightweight construction",
      "Excellent cushioning",
      "Space efficient",
      "Easy handling",
      "Suitable for fragile products",
    ],

    overviewTitle: "Advanced protection.",
    overviewTitleSecond: "Built for safer shipping.",

    overviewParagraphs: [
      "Protective Air Packaging is designed to provide reliable cushioning for products that require additional protection throughout the shipping and handling process.",
      "Its air-based construction provides effective impact absorption while maintaining a lightweight and space-efficient packaging format.",
    ],

    advantages: [
      "Reliable impact protection",
      "Lightweight alternative to bulky packaging",
      "Excellent cushioning performance",
      "Efficient storage",
      "Easy application",
      "Suitable for fragile products",
    ],

    specs: defaultSpecs,
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getContent(slug, product) {
  const customContent = productContent[slug];

  if (customContent) {
    return customContent;
  }

  return {
    category: product.category || "Packaging & Protection",

    description:
      product.description ||
      "High-quality protective packaging solution designed to protect products during shipping, storage and transportation.",

    keyFeatures: [
      "Lightweight & durable",
      "Excellent impact protection",
      "Space efficient storage",
      "Easy to use",
      "Suitable for multiple products",
      "Custom solutions available",
    ],

    overviewTitle: "Reliable protection",
    overviewTitleSecond: "for every shipment.",

    overviewParagraphs: [
      "This packaging solution is designed to provide reliable product protection during transportation, handling and storage.",
      "Its lightweight construction helps improve packaging efficiency while providing effective protection against common handling risks.",
    ],

    advantages: [
      "Reliable product protection",
      "Lightweight packaging solution",
      "Easy handling and application",
      "Efficient use of storage space",
      "Suitable for multiple applications",
      "Customization available",
    ],

    specs: defaultSpecs,
  };
}

function toSpecificationPairs(specifications) {
  return specifications.map((specification, index) => {
    const separator = specification.indexOf(":");
    if (separator > 0) {
      return [
        specification.slice(0, separator).trim(),
        specification.slice(separator + 1).trim(),
      ];
    }
    return [`Specification ${index + 1}`, specification];
  });
}

/* =========================================================
   PAGE
========================================================= */

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [zoom, setZoom] = useState(false);
  const { isWishlisted, toggleWishlist } = useAuth();
  const [databaseProduct, setDatabaseProduct] = useState(null);
  const [databaseRelated, setDatabaseRelated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setLoadError("");
      setDatabaseProduct(null);
      setDatabaseRelated(null);
      setSelectedImage(0);

      try {
        const response = await fetch(`/api/products/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          if (response.status !== 404) {
            throw new Error(data.error || "Failed to load product.");
          }
          return;
        }

        if (!cancelled) {
          setDatabaseProduct(data.product);
          setDatabaseRelated(Array.isArray(data.related) ? data.related : []);
        }
      } catch (error) {
        console.error("Product detail fetch error:", error);
        if (!cancelled) setLoadError(error.message || "Failed to load product.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const currentProduct = databaseProduct || getProductBySlug(slug);
  const baseContent = currentProduct
    ? getContent(currentProduct.slug || slug, currentProduct)
    : null;
  const content = databaseProduct
    ? {
        ...baseContent,
        category: databaseProduct.category || baseContent.category,
        description: databaseProduct.description || baseContent.description,
        keyFeatures: databaseProduct.keyFeatures?.length
          ? databaseProduct.keyFeatures
          : baseContent.keyFeatures,
        overviewParagraphs: databaseProduct.overview?.length
          ? databaseProduct.overview
          : baseContent.overviewParagraphs,
        advantages: databaseProduct.applications?.length
          ? databaseProduct.applications
          : baseContent.advantages,
        specs: databaseProduct.specs?.length
          ? toSpecificationPairs(databaseProduct.specs)
          : baseContent.specs,
      }
    : baseContent;

  const relatedProducts =
    databaseRelated ||
    (currentProduct
      ? getRelatedProducts(currentProduct.slug, 4)
      : []);

  const images =
    (currentProduct?.images?.length > 0
      ? currentProduct.images
      : [currentProduct?.image, ...(currentProduct?.extraImages || [])]
    ).filter(Boolean);

  const price = Number(currentProduct?.price || 0);
  const oldPrice = Number(
    currentProduct?.oldPrice || currentProduct?.compareAtPrice || 0
  );
  const inStock =
    !currentProduct?.trackInventory || Number(currentProduct?.stock || 0) > 0;
  const saved = currentProduct ? isWishlisted(currentProduct._id || currentProduct.id) : false;

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f8faef] text-[#081A33]">
        <p className="text-sm font-medium text-gray-500">Loading product…</p>
      </main>
    );
  }

  if (!currentProduct) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F7F8FA] px-5 text-center text-[#081A33]">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="max-w-lg text-sm text-gray-500">
          {loadError || "This product may have been removed or is not currently available."}
        </p>
        <Link href="/products" className="bg-[#081A33] px-5 py-3 text-sm font-semibold text-white">
          Browse all products
        </Link>
      </main>
    );
  }

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;

  const increaseQty = () =>
    setQuantity((q) => q + 1);

  const decreaseQty = () =>
    setQuantity((q) => (q > 1 ? q - 1 : 1));

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("dpack-cart-add", {
          detail: {
            ...currentProduct,
            quantity,
          },
        })
      );
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1d2939]">

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-gray-100 bg-[#F7F8FA]">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-5 py-4 text-sm text-gray-500">

          <Link
            href="/"
            className="font-medium text-[#081A33] hover:text-[#F5A623]"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <Link
            href="/products"
            className="font-medium text-[#081A33]"
          >
            Products
          </Link>

          <ChevronRight size={15} />

          <span>
            {currentProduct.name}
          </span>

        </div>
      </div>

      {/* =====================================================
          PRODUCT SECTION
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT: STICKY GALLERY */}

          <div className="lg:sticky lg:top-5 lg:self-start">

            <div className="grid grid-cols-[95px_1fr] gap-5">

              {/* THUMBNAILS */}

              <div className="flex flex-col gap-4">

                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    className={`flex h-[90px] items-center justify-center border bg-white p-2 transition ${
                      selectedImage === index
                        ? "border-2 border-[#F5A623]"
                        : "border-gray-200 hover:border-[#081A33]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.name} view ${
                        index + 1
                      }`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}

              </div>

              {/* MAIN VIEWER */}

              <div className="relative flex min-h-[570px] items-center justify-center overflow-hidden border border-gray-200 bg-[#F7F9FB]">

                <div className="absolute left-5 top-5 z-20 bg-[#081A33] px-4 py-2 text-[15px] font-bold uppercase tracking-wider text-white">
                  {currentProduct.badge ||
                    "Featured Product"}
                </div>

                <img
                  src={images[selectedImage]}
                  alt={currentProduct.name}
                  className="h-[500px] w-full object-contain p-8 transition duration-300 hover:scale-105"
                />

                <button
                  onClick={() => setZoom(true)}
                  className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center border border-gray-200 bg-white text-[#081A33] shadow-sm transition hover:bg-[#F5A623]"
                  aria-label="Zoom product image"
                >
                  <ZoomIn size={19} />
                </button>

              </div>

            </div>

            {/* TRUST STRIP */}

            <div className="mt-5 grid grid-cols-3 border border-gray-200">

              <div className="flex items-center gap-3 border-r border-gray-200 px-5 py-4">

                <ShieldCheck
                  className="text-[#F5A623]"
                  size={25}
                />

                <div>
                  <p className="text-[15px] font-bold text-[#081A33]">
                    Quality Assured
                  </p>

                  <p className="text-[11px] text-gray-500">
                    Premium materials
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3 border-r border-gray-200 px-5 py-4">

                <Truck
                  className="text-[#F5A623]"
                  size={25}
                />

                <div>
                  <p className="text-[15px] font-bold text-[#081A33]">
                    Fast Delivery
                  </p>

                  <p className="text-[11px] text-gray-500">
                    Across India
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3 px-5 py-4">

                <RotateCcw
                  className="text-[#F5A623]"
                  size={25}
                />

                <div>
                  <p className="text-[15px] font-bold text-[#081A33]">
                    Easy Support
                  </p>

                  <p className="text-[11px] text-gray-500">
                    Expert assistance
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT: PRODUCT INFORMATION
          ================================================= */}

          <div>

            <div className="mb-3 flex items-center gap-3">

              <span className="bg-[#081A33] px-3 py-1 text-[15px] font-bold uppercase tracking-wider text-white">
                {content.category}
              </span>

              <span className={`px-3 py-1 text-[15px] font-bold ${inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {inStock ? "In Stock" : "Out of Stock"}
              </span>

            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#081A33] md:text-5xl">
              {currentProduct.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-5">

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <Star
                      key={item}
                      size={17}
                      fill={
                        item <=
                        Math.round(
                          Number(
                            currentProduct.rating ||
                              0
                          )
                        )
                          ? "#F5A623"
                          : "none"
                      }
                      className="text-[#F5A623]"
                    />
                  )
                )}

              </div>

              <span className="text-sm font-bold text-[#081A33]">
                {currentProduct.rating || "4.5"}
              </span>

              <span className="text-sm text-gray-500">
                ({currentProduct.reviews || 0} Reviews)
              </span>

              <span className="text-gray-300">
                |
              </span>

              <span className="text-sm text-gray-500">
                SKU:{" "}
                <span className="font-bold text-[#081A33]">
                  {currentProduct.sku || "N/A"}
                </span>
              </span>

            </div>

            <p className="mt-6 text-[16px] leading-8 text-gray-600">
              {content.description}
            </p>

            {/* PRICE */}

            <div className="mt-7 bg-[#F7F8FA] p-6">

              <div className="flex items-end gap-4">

                <span className="text-4xl font-black text-[#081A33]">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {oldPrice > price && (
                  <span className="pb-1 text-lg text-gray-400 line-through">
                    ₹{oldPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                )}

                {discount > 0 && (
                  <span className="mb-1 bg-[#F5A623] px-3 py-1 text-[15px] font-extrabold text-[#081A33]">
                    SAVE {discount}%
                  </span>
                )}

              </div>

              <p className="mt-2 text-[15px] text-gray-500">
                Inclusive of applicable taxes
              </p>

            </div>

            {/* KEY FEATURES */}

            <div className="mt-7">

              <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#081A33]">
                Key Features
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {content.keyFeatures.map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >

                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#081A33] text-white">
                        <Check size={12} />
                      </span>

                      <span className="text-sm text-gray-600">
                        {feature}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="my-7 border-t border-gray-200" />

            {/* QUANTITY */}

            <div className="flex flex-wrap items-center gap-5">

              <div>

                <p className="mb-2 text-[15px] font-bold uppercase tracking-wider text-gray-500">
                  Quantity
                </p>

                <div className="flex h-12 border border-gray-300">

                  <button
                    onClick={decreaseQty}
                    className="flex w-12 items-center justify-center bg-gray-50 transition hover:bg-[#081A33] hover:text-white"
                  >
                    <Minus size={16} />
                  </button>

                  <div className="flex w-14 items-center justify-center border-x border-gray-300 font-bold">
                    {quantity}
                  </div>

                  <button
                    onClick={increaseQty}
                    className="flex w-12 items-center justify-center bg-gray-50 transition hover:bg-[#081A33] hover:text-white"
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>

              <button
                onClick={addToCart}
                disabled={!inStock}
                className="mt-5 flex h-12 flex-1 items-center justify-center gap-3 bg-[#F5A623] px-8 text-sm font-extrabold uppercase tracking-wide text-[#081A33] transition hover:bg-[#081A33] hover:text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                <ShoppingCart size={19} />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={() => toggleWishlist(currentProduct)}
                className={`mt-5 flex h-12 w-12 items-center justify-center border transition ${
                  saved
                    ? "border-[#F5A623] bg-[#F5A623]"
                    : "border-gray-300 bg-white hover:border-[#081A33]"
                }`}
              >
                <Heart
                  size={20}
                  fill={
                    saved
                      ? "#081A33"
                      : "none"
                  }
                  className="text-[#081A33]"
                />
              </button>

              <button className="mt-5 flex h-12 w-12 items-center justify-center border border-gray-300 bg-white transition hover:border-[#081A33]">
                <GitCompare
                  size={20}
                  className="text-[#081A33]"
                />
              </button>

            </div>

            {/* BUY NOW */}

            <button className="mt-4 h-12 w-full border-2 border-[#081A33] bg-[#081A33] text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#081A33]">
              Buy It Now
            </button>

            {/* DELIVERY INFO */}

            <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">

              <div className="flex items-center gap-4 py-5">

                <div className="flex h-11 w-11 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <Truck size={21} />
                </div>

                <div>

                  <p className="text-sm font-bold text-[#081A33]">
                    Fast & Secure Delivery
                  </p>

                  <p className="mt-1 text-[15px] text-gray-500">
                    Estimated delivery within 3–7 working days.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 py-5">

                <div className="flex h-11 w-11 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <ShieldCheck size={21} />
                </div>

                <div>

                  <p className="text-sm font-bold text-[#081A33]">
                    Quality Guaranteed
                  </p>

                  <p className="mt-1 text-[15px] text-gray-500">
                    Carefully inspected before dispatch.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 py-5">

                <div className="flex h-11 w-11 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <MapPin size={21} />
                </div>

                <div>

                  <p className="text-sm font-bold text-[#081A33]">
                    Bulk Orders Welcome
                  </p>

                  <p className="mt-1 text-[15px] text-gray-500">
                    Contact our team for customized pricing.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          BLUE FEATURE BAND
      ===================================================== */}

      <section className="bg-[#081A33]">

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-3">

          <div className="flex items-center gap-5 border-b border-white/10 px-8 py-8 md:border-b-0 md:border-r">

            <ShieldCheck
              size={34}
              className="text-[#F5A623]"
            />

            <div>

              <h3 className="font-bold text-white">
                Premium Protection
              </h3>

              <p className="mt-1 text-sm text-white/60">
                Built for fragile products
              </p>

            </div>

          </div>

          <div className="flex items-center gap-5 border-b border-white/10 px-8 py-8 md:border-b-0 md:border-r">

            <Truck
              size={34}
              className="text-[#F5A623]"
            />

            <div>

              <h3 className="font-bold text-white">
                Reliable Delivery
              </h3>

              <p className="mt-1 text-sm text-white/60">
                Secure nationwide shipping
              </p>

            </div>

          </div>

          <div className="flex items-center gap-5 px-8 py-8">

            <Heart
              size={34}
              className="text-[#F5A623]"
            />

            <div>

              <h3 className="font-bold text-white">
                Customer First
              </h3>

              <p className="mt-1 text-sm text-white/60">
                Support when you need it
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="border-t border-gray-200">

        <div className="mx-auto max-w-[1400px] px-5 py-16">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">

            {/* LEFT STICKY TABS */}

            <aside className="lg:sticky lg:top-8 lg:self-start">

              <div className="border border-gray-200 bg-white">

                <div className="bg-[#081A33] px-5 py-4">

                  <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-white/60">
                    Product Details
                  </span>

                </div>

                <div className="flex flex-row lg:flex-col">

                  {/* DESCRIPTION TAB */}

                  <button
                    onClick={() =>
                      setActiveTab("description")
                    }
                    className={`group relative flex flex-1 items-center gap-3 px-5 py-5 text-left transition lg:flex-none ${
                      activeTab === "description"
                        ? "bg-[#F7F8FA]"
                        : "bg-white hover:bg-[#F7F8FA]"
                    }`}
                  >

                    <span
                      className={`text-xs font-black ${
                        activeTab === "description"
                          ? "text-[#F5A623]"
                          : "text-gray-300"
                      }`}
                    >
                      01
                    </span>

                    <span
                      className={`text-xs font-extrabold uppercase tracking-[1.2px] ${
                        activeTab === "description"
                          ? "text-[#081A33]"
                          : "text-gray-400"
                      }`}
                    >
                      Description
                    </span>

                    {activeTab ===
                      "description" && (
                      <span className="absolute left-0 top-0 h-full w-[3px] bg-[#F5A623]" />
                    )}

                  </button>

                  {/* SPECIFICATION TAB */}

                  <button
                    onClick={() =>
                      setActiveTab(
                        "specification"
                      )
                    }
                    className={`group relative flex flex-1 items-center gap-3 border-t border-gray-200 px-5 py-5 text-left transition lg:flex-none ${
                      activeTab ===
                      "specification"
                        ? "bg-[#F7F8FA]"
                        : "bg-white hover:bg-[#F7F8FA]"
                    }`}
                  >

                    <span
                      className={`text-xs font-black ${
                        activeTab ===
                        "specification"
                          ? "text-[#F5A623]"
                          : "text-gray-300"
                      }`}
                    >
                      02
                    </span>

                    <span
                      className={`text-xs font-extrabold uppercase tracking-[1.2px] ${
                        activeTab ===
                        "specification"
                          ? "text-[#081A33]"
                          : "text-gray-400"
                      }`}
                    >
                      Specifications
                    </span>

                    {activeTab ===
                      "specification" && (
                      <span className="absolute left-0 top-0 h-full w-[3px] bg-[#F5A623]" />
                    )}

                  </button>

                </div>

              </div>

            </aside>

            {/* RIGHT CONTENT */}

            <div className="min-w-0">

              {/* DESCRIPTION */}

              {activeTab === "description" && (
                <div className="space-y-12">

                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-[100px_1fr]">

                    <div className="hidden lg:block">

                      <div className="text-7xl font-black leading-none text-[#081A33]/10">
                        01
                      </div>

                      <div className="mt-4 h-16 w-[2px] bg-[#F5A623]" />

                    </div>

                    <div>

                      <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#F5A623]">
                        Product Overview
                      </span>

                      <h2 className="mt-4 text-3xl font-black leading-tight text-[#081A33] md:text-5xl">

                        {content.overviewTitle}

                        <span className="block">
                          {content.overviewTitleSecond}
                        </span>

                      </h2>

                      {content.overviewParagraphs.map(
                        (paragraph) => (
                          <p
                            key={paragraph}
                            className="mt-6 max-w-3xl text-[16px] leading-8 text-gray-600"
                          >
                            {paragraph}
                          </p>
                        )
                      )}

                    </div>

                  </div>

                  {/* PROTECTION CARDS */}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {[
                      {
                        no: "01",
                        title: "Impact Protection",
                        text: "Air-based cushioning helps absorb external shocks and reduce the impact transferred to the packed product.",
                      },
                      {
                        no: "02",
                        title: "Lightweight Design",
                        text: "Provides reliable protection without adding unnecessary weight to the overall packaging.",
                      },
                      {
                        no: "03",
                        title: "Space Efficient",
                        text: "Efficient packaging construction makes storage and transportation easier.",
                      },
                    ].map((item) => (
                      <div
                        key={item.no}
                        className="group border border-gray-200 bg-white p-7 transition hover:border-[#F5A623]"
                      >

                        <span className="text-xs font-black text-gray-300 group-hover:text-[#F5A623]">
                          {item.no}
                        </span>

                        <div className="mt-7 h-[3px] w-10 bg-[#F5A623] transition-all duration-300 group-hover:w-16" />

                        <h3 className="mt-5 text-xl font-black text-[#081A33]">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-gray-500">
                          {item.text}
                        </p>

                      </div>
                    ))}

                  </div>

                  {/* ADVANTAGES */}

                  <div className="bg-[#081A33] p-8 md:p-12">

                    <span className="text-xs font-bold uppercase tracking-[3px] text-[#F5A623]">
                      Packaging Advantage
                    </span>

                    <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
                      Why Choose{" "}
                      {currentProduct.name}?
                    </h3>

                    <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

                      {content.advantages.map(
                        (item, index) => (
                          <div
                            key={item}
                            className="flex items-start gap-4 border-b border-white/10 pb-4"
                          >

                            <span className="text-xs font-bold text-[#F5A623]">
                              0{index + 1}
                            </span>

                            <span className="text-sm leading-6 text-white/75">
                              {item}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>
              )}

              {/* SPECIFICATIONS */}

              {activeTab ===
                "specification" && (
                <div>

                  <div className="mb-10 border-b border-gray-200 pb-8">

                    <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#F5A623]">
                      Technical Details
                    </span>

                    <h2 className="mt-3 text-3xl font-black text-[#081A33] md:text-5xl">
                      Product Specifications
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
                      Detailed technical information
                      and product characteristics for{" "}
                      {currentProduct.name}.
                    </p>

                  </div>

                  {/* SPECIFICATION GRID */}

                  <div className="grid grid-cols-1 md:grid-cols-2">

                    {(
                      content.specs ||
                      defaultSpecs
                    ).map(
                      ([label, value], index) => (
                        <div
                          key={label}
                          className="group relative border-b border-gray-200 py-7 md:odd:border-r md:odd:pr-10 md:even:pl-10"
                        >

                          <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[#F5A623] transition-transform duration-300 group-hover:scale-y-100" />

                          <div className="flex gap-5">

                            <span className="w-8 shrink-0 text-xs font-black text-gray-300 group-hover:text-[#F5A623]">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <div>

                              <p className="text-[11px] font-extrabold uppercase tracking-[2px] text-gray-400">
                                {label}
                              </p>

                              <p className="mt-2 text-base font-bold text-[#081A33] transition group-hover:translate-x-1">
                                {value}
                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      <section className="border-t border-gray-200 bg-[#F7F8FA] py-16">

        <div className="mx-auto max-w-[1400px] px-5">

          <div className="mb-9 flex items-end justify-between">

            <div>

              <span className="text-[15px] font-extrabold uppercase tracking-[2px] text-[#F5A623]">
                You May Also Like
              </span>

              <h2 className="mt-2 text-3xl font-black text-[#081A33]">
                Related Products
              </h2>

            </div>

            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-bold text-[#081A33] md:flex"
            >
              View All
              <ChevronRight size={17} />
            </Link>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {relatedProducts.map(
              (item) => (
                <article
                  key={
                    item.slug ||
                    item.id ||
                    item.name
                  }
                  className="group border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-[#081A33] hover:shadow-xl"
                >

                  <div className="relative flex h-[270px] items-center justify-center overflow-hidden bg-white p-6">

                    <span className="absolute left-4 top-4 z-10 bg-[#081A33] px-3 py-1 text-[10px] font-bold uppercase text-white">
                      Packaging
                    </span>

                    <Link
                      href={`/products/${item.slug}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <button
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white opacity-0 shadow-sm transition group-hover:opacity-100"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} />
                    </button>

                  </div>

                  <div className="border-t border-gray-100 p-5">

                    <div className="mb-2 flex gap-1">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={13}
                            fill="#F5A623"
                            className="text-[#F5A623]"
                          />
                        )
                      )}

                    </div>

                    <Link
                      href={`/products/${item.slug}`}
                    >
                      <h3 className="font-bold text-[#081A33] transition group-hover:text-[#F5A623]">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center justify-between">

                      <span className="text-xl font-black text-[#081A33]">
                        ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <button
                        onClick={() => {
                          if (
                            typeof window !==
                            "undefined"
                          ) {
                            window.dispatchEvent(
                              new CustomEvent(
                                "dpack-cart-add",
                                {
                                  detail: {
                                    ...item,
                                    quantity: 1,
                                  },
                                }
                              )
                            );
                          }
                        }}
                        className="flex h-9 w-9 items-center justify-center bg-[#F5A623] text-[#081A33]"
                      >
                        <ShoppingCart size={16} />
                      </button>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          ZOOM MODAL
      ===================================================== */}

      {zoom && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-5"
          onClick={() => setZoom(false)}
        >

          <button
            onClick={() => setZoom(false)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center bg-white text-[#081A33]"
          >
            ×
          </button>

          <img
            src={images[selectedImage]}
            alt={currentProduct.name}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

        </div>
      )}

    </main>
  );
}