"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { organizeProductFields } from "@/lib/productContent";

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
  Send,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

// Time the main image is shown before switching to the video.
const VIDEO_DELAY_MS = 3000;

/* =========================================================
   DEFAULT SPECIFICATIONS
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


/* =========================================================
   HELPERS
========================================================= */

function getContent(slug, product) {


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

function toSpecificationPairs(specifications = []) {
  return specifications.map((specification, index) => {
    const text = Array.isArray(specification)
      ? `${specification[0] ?? ""}: ${specification[1] ?? ""}`
      : specification && typeof specification === "object"
        ? `${specification.label ||
        specification.name ||
        `Specification ${index + 1}`}: ${specification.value ?? specification.description ?? ""}`
        : String(specification ?? "");

    const separator = text.indexOf(":");

    if (separator > 0) {
      return [
        text.slice(0, separator).trim(),
        text.slice(separator + 1).trim(),
      ];
    }

    return [`Specification ${index + 1}`, text];
  });
}

/* =========================================================
   VARIANT HELPERS
========================================================= */

function getVariants(product) {
  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    return product.variants.map((variant) => ({
      ...variant,
      price: Number(variant.price ?? 0),
      compareAtPrice:
        variant.compareAtPrice != null
          ? Number(variant.compareAtPrice)
          : null,
      shippingPrice: Number(
        variant.shippingPrice ?? product.shippingPrice ?? 0
      ),
      stock: Number(variant.stock ?? 0),
    }));
  }

  if (product?.price != null) {
    const sizes = product.sizes?.length ? product.sizes : ["Default"];

    return sizes.map((size, index) => ({
      size,
      price: Number(product.price),
      compareAtPrice:
        product.compareAtPrice != null
          ? Number(product.compareAtPrice)
          : null,
      shippingPrice: Number(product.shippingPrice ?? 0),
      stock: Number(product.stock ?? 0),
      isDefault: index === 0,
    }));
  }

  return [];
}

function getDefaultVariant(product) {
  const variants = getVariants(product);
  if (!variants.length) return null;
  return variants.find((variant) => variant.isDefault) || variants[0];
}

function getDisplayPrice(product, selectedVariant = null) {
  const variant = selectedVariant || getDefaultVariant(product);
  if (variant?.price != null) return Number(variant.price);
  return Number(product?.price ?? 0);
}

function getDisplayComparePrice(product, selectedVariant = null) {
  const variant = selectedVariant || getDefaultVariant(product);

  if (product?.variants?.length && variant) {
    return Number(variant.compareAtPrice ?? 0);
  }

  if (variant?.compareAtPrice != null) {
    return Number(variant.compareAtPrice);
  }

  return Number(
    product?.compareAtPrice ?? product?.oldPrice ?? product?.mrp ?? 0
  );
}

function getVariantStock(product, selectedVariant = null) {
  const tracking =
    product?.trackInventory ?? product?.inventoryTracking ?? true;

  if (!tracking) return Infinity;

  if (selectedVariant) return Number(selectedVariant.stock ?? 0);

  const variants = getVariants(product);

  if (variants.length > 0) {
    return variants.reduce(
      (sum, variant) => sum + Number(variant.stock || 0),
      0
    );
  }

  return Number(product?.stock ?? 0);
}

function isVariantInStock(product, selectedVariant = null) {
  const tracking =
    product?.trackInventory ?? product?.inventoryTracking ?? true;

  if (!tracking) return true;

  return getVariantStock(product, selectedVariant) > 0;
}

/* =========================================================
   MEDIA HELPERS
========================================================= */

/** Extracts a YouTube video ID from watch, youtu.be, shorts, embed or live URLs. */
function getYouTubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(String(url).trim());
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }

    if (host.endsWith("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;

      const match = parsed.pathname.match(/^\/(shorts|embed|live)\/([^/?#]+)/);
      if (match) return match[2];
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Builds a YouTube embed URL.
 * autoplay: plays and loops muted (browsers only allow autoplay when muted).
 * controls: false hides the player controls (used for the gallery preview).
 */
function getYouTubeEmbedUrl(url, { autoplay = false, controls = true } = {}) {
  const id = getYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: "1",
    loop: "1",
    playlist: id,
    playsinline: "1",
    controls: controls ? "1" : "0",
    rel: "0",
    modestbranding: "1",
  });

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

/** Converts an Instagram reel/post/tv URL into its embeddable iframe URL. */
function getInstagramEmbedUrl(url) {
  if (!url) return null;

  try {
    const cleanUrl = String(url).split("?")[0].replace(/\/$/, "");

    if (
      cleanUrl.includes("instagram.com/reel/") ||
      cleanUrl.includes("instagram.com/p/") ||
      cleanUrl.includes("instagram.com/tv/")
    ) {
      return `${cleanUrl}/embed/?autoplay=1`;
    }
  } catch {
    return null;
  }

  return null;
}

/** True only for direct .mp4 files (ignores query strings and hashes). */
function isDirectMp4(url) {
  if (!url) return false;
  return /\.mp4(\?|#|$)/i.test(String(url).trim());
}

/** Returns the product's YouTube URL from whichever field holds it. */
function getProductYoutubeUrl(product) {
  return (
    product?.youtubeUrl ||
    product?.youtubeLink ||
    product?.youtubeVideo ||
    product?.youtube ||
    ""
  );
}

/** Returns the product's MP4 URL from whichever field holds it. */
function getProductVideoUrl(product) {
  return product?.videoUrl || product?.mp4Url || product?.video || "";
}

/** Media type shown after the delay: YouTube, direct MP4, Instagram, or null. */
function getVideoMediaType(product) {
  if (!product) return null;
  if (getYouTubeId(getProductYoutubeUrl(product))) return "youtube";
  if (isDirectMp4(getProductVideoUrl(product))) return "video";
  if (getInstagramEmbedUrl(product?.instagramUrl || "")) return "instagram";
  return null;
}

/* =========================================================
   DESCRIPTION FORMATTER
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeDescriptionHeading(value) {
  const heading = value
    .replace(/\s+/g, " ")
    .replace(/[.:]+\s*/g, " ")
    .trim();

  if (/^key\s+features?$/i.test(heading)) return "Key Features";
  if (/^technical\s+specifications?$/i.test(heading)) return "Technical Specifications";
  if (/^product\s+specifications?$/i.test(heading)) return "Product Specifications";
  if (/^specifications?$/i.test(heading)) return "Specifications";
  if (/^applications?$/i.test(heading)) return "Applications";
  if (/^product\s+overview$/i.test(heading)) return "Product Overview";
  if (/^overview$/i.test(heading)) return "Overview";
  if (/^features?$/i.test(heading)) return "Features";
  if (/^ideal\s+for$/i.test(heading)) return "Ideal For";
  if (/^available\s+sizes?$/i.test(heading)) return "Available Sizes";
  if (/^sizes?$/i.test(heading)) return "Sizes";
  if (/^benefits?$/i.test(heading)) return "Benefits";
  if (/^advantages?$/i.test(heading)) return "Advantages";
  if (/^how\s+to\s+use$/i.test(heading)) return "How to Use";

  const whyChoose = heading.match(/^why\s+choose\s+(.+)$/i);
  if (whyChoose) {
    return `Why Choose ${whyChoose[1].replace(/[.?]+$/, "").trim()}?`;
  }

  if (/^why\s+choose$/i.test(heading)) return "Why Choose";

  return null;
}

function renderDescriptionHeading(value) {
  return `<h2 class="description-heading">${escapeHtml(value)}</h2>`;
}

function renderPlainDescriptionBody(value) {
  const items = value
    .split(/(?<=[.!?])\s+(?=[A-Z0-9•◆🔹♦])/)
    .map((item) => item.replace(/^[\s•◆🔹♦-]+/, "").trim())
    .filter(Boolean);

  if (!items.length) return "";

  return `
    <div class="description-points">
      ${items
      .map(
        (item) => `
            <div class="description-point">
              <span class="description-diamond"></span>
              <p>${escapeHtml(item)}</p>
            </div>
          `
      )
      .join("")}
    </div>
  `;
}

function formatProductDescription(description) {
  if (!description) return "";

  let text = String(description).trim();

  text = text.replace(/(?:^|\n)\s*[◆🔹♦]\s*(?=\n|$)/g, "\n");
  text = text.replace(/\s*[◆🔹♦]\s*(?=[A-Za-z][^:]*:)/g, "\n◆ ");
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  text = text.replace(
    /(Why\s*\.?\s*Choose)[.!]?[ \t]*\r?\n[ \t]*([^\r\n?]{1,60}\?)/gi,
    "$1 $2"
  );

  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(text);

  if (!hasHtml) {
    const headingPattern =
      /(^|(?<=[.!?])\s+|\r?\n)(Why\s*\.?\s*Choose(?:[.!?]\s*)?(?:[^.!?:\r\n]+\?)?|Product\s+Overview|Overview|Key\s*\.?\s*Features?|Features?|Technical\s+Specifications?|Product\s+Specifications?|Specifications?|Applications?|Ideal\s+For|Available\s+Sizes?|Sizes?|Benefits?|Advantages?|How\s+to\s+Use)(?=\s*[:\r\n]|[.!?](?=\s|$)|$|(?<=\?)(?=\s))/gim;

    const sections = [];
    let match;

    while ((match = headingPattern.exec(text))) {
      const heading = normalizeDescriptionHeading(match[2]);
      if (!heading) continue;

      sections.push({
        heading,
        start: match.index + match[1].length,
        end: headingPattern.lastIndex,
      });
    }

    let html = "";
    let cursor = 0;

    for (const section of sections) {
      const body = text
        .slice(cursor, section.start)
        .replace(/[:.]\s*$/, "")
        .trim();

      if (body) html += renderPlainDescriptionBody(body);

      html += renderDescriptionHeading(section.heading);

      cursor = section.end;

      while (/^[\s:.]/.test(text[cursor] || "")) cursor++;
    }

    const remaining = text.slice(cursor).trim();
    if (remaining) html += renderPlainDescriptionBody(remaining);

    return html;
  }

  return text
    .replace(/<(p|div)\b[^>]*>([\s\S]*?)<\/\1>/gi, (paragraph, tagName, contents) => {
      const plainContents = contents
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/?[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

      const heading = normalizeDescriptionHeading(plainContents);
      if (heading) return renderDescriptionHeading(heading);

      if (!plainContents || /^[◆🔹♦]\s*$/.test(plainContents)) return "";

      const clean = contents.replace(/^\s*[◆🔹♦]\s*/, "").trim();

      return `
          <div class="description-point">
            <span class="description-diamond"></span>
            <p>${clean}</p>
          </div>
        `;
    })
    .replace(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi, (headingElement, tagName, contents) => {
      const heading = normalizeDescriptionHeading(
        contents.replace(/<\/?[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      );

      return heading ? renderDescriptionHeading(heading) : headingElement;
    });
}

/* =========================================================
   SMALL UI PIECES
========================================================= */

/** Shared thumbnail frame so every media type looks identical in the strip. */
function MediaThumb({ active, onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`group relative flex h-[75px] w-[75px] shrink-0 items-center justify-center overflow-hidden border bg-white transition sm:h-[85px] sm:w-[85px] lg:h-[90px] lg:w-[90px] ${active ? "border-2 border-[#F5A623]" : "border-gray-200 hover:border-[#081A33]"
        }`}
    >
      {children}
    </button>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function ProductPage({ params }) {
  const router = useRouter();
  const { slug } = use(params);

  const [selectedImage, setSelectedImage] = useState(0);

  // selectedMedia.type: "image" | "video" | "youtube" | "instagram"
  const [selectedMedia, setSelectedMedia] = useState({
    type: "image",
    index: 0,
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);
  const [zoom, setZoom] = useState(false);

  const [isBulkEnquiryOpen, setIsBulkEnquiryOpen] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState("");

  const { isWishlisted, toggleWishlist } = useAuth();

  const [databaseProduct, setDatabaseProduct] = useState(null);
  const [databaseRelated, setDatabaseRelated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Pending switch from the main image to the video.
  const videoTimerRef = useRef(null);

  const clearVideoTimer = () => {
    if (videoTimerRef.current) {
      clearTimeout(videoTimerRef.current);
      videoTimerRef.current = null;
    }
  };

  /** Selects a media item and cancels the pending automatic switch. */
  const chooseMedia = (media) => {
    clearVideoTimer();
    setSelectedMedia(media);
  };

  /* =======================================================
     LOAD PRODUCT
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setLoadError("");
      setDatabaseProduct(null);
      setDatabaseRelated(null);
      setSelectedVariantIndex(null);
      setQuantity(1);
      setSelectedImage(0);

      try {
        const response = await fetch(
          `/api/products/${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        );

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

        if (!cancelled) {
          setLoadError(error.message || "Failed to load product.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* =======================================================
     DEFAULT GALLERY STATE
     Keep the first product image in the main viewer when the
     product opens. Videos autoplay only in their thumbnails;
     the main viewer changes only when a thumbnail is clicked.
  ======================================================= */

  useEffect(() => {
    if (!databaseProduct) return;
    clearVideoTimer();
    setSelectedMedia({ type: "image", index: 0 });
    setSelectedImage(0);

    return () => clearVideoTimer();
  }, [databaseProduct]);

  /* =======================================================
     PRODUCT DATA
  ======================================================= */

  const currentProduct = databaseProduct;

  const baseContent = currentProduct
    ? getContent(currentProduct.slug || slug, currentProduct)
    : null;

  const organizedFields = organizeProductFields(
    currentProduct
      ? {
        ...currentProduct,
        specs: currentProduct.specs || currentProduct.specifications,
      }
      : {}
  );

  const content = currentProduct
    ? {
      ...baseContent,

      category: currentProduct.category || baseContent.category,

      shortDescription: currentProduct.shortDescription || "",

      description: currentProduct.description || baseContent.description,

      keyFeatures: organizedFields.keyFeatures?.length
        ? organizedFields.keyFeatures
        : currentProduct.features?.length
          ? currentProduct.features
          : baseContent.keyFeatures,

      overviewParagraphs: organizedFields.overview?.length
        ? organizedFields.overview
        : baseContent.overviewParagraphs,

      applications: organizedFields.applications || [],

      specs: toSpecificationPairs(
        organizedFields.specs?.length ? organizedFields.specs : baseContent.specs
      ),

      sizes: organizedFields.sizes || [],
    }
    : null;

  const isBeltCategory =
    String(content?.category || "").trim().toLowerCase() === "belts";

  const relatedProducts = databaseRelated || [];

  /* =======================================================
     MEDIA SOURCES
  ======================================================= */

  const images = (
    currentProduct?.images?.length > 0
      ? currentProduct.images
      : [currentProduct?.image, ...(currentProduct?.extraImages || [])]
  ).filter(Boolean);

  const youtubeUrl = getProductYoutubeUrl(currentProduct);

  // Main viewer: autoplay, muted, looping.
  const youtubeEmbedUrl = getYouTubeEmbedUrl(youtubeUrl, { autoplay: true });

  // Gallery strip: autoplay, muted, looping, no controls.
  const youtubePreviewUrl = getYouTubeEmbedUrl(youtubeUrl, {
    autoplay: true,
    controls: false,
  });

  const instagramEmbedUrl = getInstagramEmbedUrl(currentProduct?.instagramUrl || "");

  const videoUrl = getProductVideoUrl(currentProduct);
  const hasMp4 = isDirectMp4(videoUrl);

  // Guard: if the selected media no longer exists, fall back to the first image.
  const activeType =
    (selectedMedia.type === "youtube" && youtubeEmbedUrl) ||
      (selectedMedia.type === "instagram" && instagramEmbedUrl) ||
      (selectedMedia.type === "video" && hasMp4) ||
      selectedMedia.type === "image"
      ? selectedMedia.type
      : "image";

  const activeImageIndex =
    activeType === "image"
      ? Math.min(selectedImage, Math.max(images.length - 1, 0))
      : 0;

  /* =======================================================
     VARIANTS
  ======================================================= */

  const variants = getVariants(currentProduct);

  const selectedVariant =
    selectedVariantIndex !== null
      ? variants[selectedVariantIndex]
      : variants.find((variant) => variant.isDefault) || variants[0] || null;

  const price = getDisplayPrice(currentProduct, selectedVariant);
  const oldPrice = getDisplayComparePrice(currentProduct, selectedVariant);
  const stock = getVariantStock(currentProduct, selectedVariant);
  const inStock = isVariantInStock(currentProduct, selectedVariant);

  const saved = currentProduct
    ? isWishlisted(currentProduct._id || currentProduct.id)
    : false;

  const discount =
    oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  /* =======================================================
     QUANTITY
  ======================================================= */

  const increaseQty = () => {
    setQuantity((current) => (inStock ? Math.min(current + 1, stock) : current));
  };

  const decreaseQty = () => {
    setQuantity((current) => (current > 1 ? current - 1 : 1));
  };

  /* =======================================================
     CART
  ======================================================= */

  const addToCart = () => {
    if (!inStock || typeof window === "undefined") return;

    window.dispatchEvent(
      new CustomEvent("dpack-cart-add", {
        detail: {
          ...currentProduct,
          quantity,
          selectedVariant,
          shippingPrice: Number(
            selectedVariant?.shippingPrice ?? currentProduct?.shippingPrice ?? 0
          ),
          price: Number(selectedVariant?.price ?? currentProduct?.price ?? 0),
          variantId: selectedVariant?._id ?? null,
          size: selectedVariant?.size ?? "",
        },
      })
    );
  };

  const buyNow = () => {
    if (!inStock) return;
    addToCart();
    router.push("/checkout");
  };

  /* =======================================================
     BULK ENQUIRY SUBMIT
  ======================================================= */

  const handleBulkSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("customerName") || "").trim();
    const companyName = String(data.get("companyName") || "").trim();
    const phone = String(data.get("mobile") || "").replace(/\D/g, "");
    const place = String(data.get("place") || "").trim();
    const message = String(data.get("message") || "").trim();
    const productName = currentProduct?.name || "";

    if (!/^\d{10}$/.test(phone)) {
      setEnquiryStatus("Enter a valid 10-digit phone number.");
      return;
    }

    setEnquiryLoading(true);
    setEnquiryStatus("Sending...");

    try {
      const response = await fetch("/api/contact-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          company: companyName,
          place,
          product: productName,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Failed to send. Please try again.");
      }

      setEnquiryStatus("Your enquiry has been submitted successfully!");

      const whatsappText = `Hi, I am ${name}.
CompanyName: ${companyName}
Place: ${place}
Product: ${productName}
Message: ${message}

Contact: ${phone}`;

      window.open(
        `https://wa.me/917669988825?text=${encodeURIComponent(whatsappText)}`,
        "_blank",
        "noopener,noreferrer"
      );

      form.reset();
    } catch (error) {
      console.error("Bulk enquiry submission failed:", error);
      setEnquiryStatus(error.message || "Server error. Try again later.");
    } finally {
      setEnquiryLoading(false);
    }
  };

  /* =======================================================
     LOADING / NOT FOUND
  ======================================================= */

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F8FA] px-5 text-[#081A33]">
        <p className="text-sm font-medium text-gray-500">Loading product…</p>
      </main>
    );
  }

  if (!currentProduct) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F7F8FA] px-5 text-center text-[#081A33]">
        <h1 className="text-3xl font-bold">Product not found</h1>

        <p className="max-w-lg text-sm text-gray-500">
          {loadError ||
            "This product may have been removed or is not currently available."}
        </p>

        <Link
          href="/products"
          className="bg-[#081A33] px-5 py-3 text-sm font-semibold text-white"
        >
          Browse all products
        </Link>
      </main>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-[#1d2939]">
      {/* BREADCRUMB */}

      <div className="border-b border-gray-100 bg-[#F7F8FA]">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-hidden px-4 py-3 text-xs text-gray-500 sm:px-5 sm:py-4 sm:text-sm">
          <Link href="/" className="shrink-0 font-medium text-[#081A33] hover:text-[#F5A623]">
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link href="/products" className="shrink-0 font-medium text-[#081A33]">
            Products
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="truncate">{currentProduct.name}</span>
        </div>
      </div>

      {/* PRODUCT SECTION */}

      <section className="mx-auto max-w-[1400px] px-4 py-7 sm:px-5 sm:py-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

          {/* LEFT: GALLERY */}

          <div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[90px_1fr] lg:gap-5">

              {/* THUMBNAILS */}

              <div className="order-2 flex w-full gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:gap-4 lg:overflow-visible">



     {/* YouTube thumbnail: autoplays muted and loops */}
               
                {/* Image thumbnails */}
                {images.map((image, index) => (
                  <MediaThumb
                    key={`${image}-${index}`}
                    label={`${currentProduct.name} view ${index + 1}`}
                    active={activeType === "image" && activeImageIndex === index}
                    onClick={() => {
                      setSelectedImage(index);
                      chooseMedia({ type: "image", index });
                    }}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.name} view ${index + 1}`}
                      className="h-full w-full object-contain p-2"
                    />
                  </MediaThumb>
                ))}

                 {youtubePreviewUrl && (
                  <MediaThumb
                    label="Watch YouTube product video"
                    active={activeType === "youtube"}
                    onClick={() => chooseMedia({ type: "youtube", index: 0 })}
                  >
                    <div className="absolute inset-0 bg-[#081A33]" />

                    {/* 16:9 iframe scaled to cover the square tile. Pointer events are off so the button receives clicks. */}
                    <iframe
                      src={youtubePreviewUrl}
                      title="YouTube preview"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-full w-[177.78%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
                      allow="autoplay; encrypted-media"
                    />
                  </MediaThumb>
                )}

                {/* Instagram thumbnail: show the backend Reel embed without a custom play badge */}
                {instagramEmbedUrl && (
                  <MediaThumb
                    label="View Instagram product video"
                    active={activeType === "instagram"}
                    onClick={() => chooseMedia({ type: "instagram", index: 0 })}
                  >
                    <iframe
                      src={instagramEmbedUrl}
                      title="Instagram Reel thumbnail preview"
                      tabIndex={-1}
                      aria-hidden="true"
                      loading="eager"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      className="pointer-events-none absolute inset-0 h-full w-full border-0"
                    />
                  </MediaThumb>
                )}

                {/* MP4 thumbnail: autoplays muted and loops */}
                {hasMp4 && (
                  <MediaThumb
                    label="Play product video"
                    active={activeType === "video"}
                    onClick={() => chooseMedia({ type: "video", index: 0 })}
                  >
                    <div className="absolute inset-0 bg-[#081A33]" />
                    <video
                      src={videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </MediaThumb>
                )}

           
              </div>

              

              {/* MAIN VIEWER */}

              <div className="relative order-1 flex h-[380px] w-full items-center justify-center overflow-hidden border border-gray-200 bg-[#F7F9FB] sm:h-[450px] lg:order-2 lg:h-auto lg:min-h-[570px]">

                {activeType === "youtube" && youtubeEmbedUrl && (
                  <iframe
                    key={youtubeEmbedUrl}
                    src={youtubeEmbedUrl}
                    title={`${currentProduct.name} YouTube Video`}
                    className="absolute inset-0 h-full w-full bg-black"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}

                {activeType === "instagram" && instagramEmbedUrl && (
                  <iframe
                    key={instagramEmbedUrl}
                    src={instagramEmbedUrl}
                    title={`${currentProduct.name} Instagram Video`}
                    className="absolute inset-0 h-full w-full bg-white"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {activeType === "video" && hasMp4 && (
                  <video
                    key={videoUrl}
                    src={videoUrl}
                    poster={images[0] || undefined}
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full bg-black object-contain"
                  />
                )}

                {activeType === "image" && images[activeImageIndex] && (
                  <img
                    src={images[activeImageIndex]}
                    alt={currentProduct.name}
                    className="h-full w-full object-contain"
                  />
                )}

                {activeType === "image" && (
                  <button
                    type="button"
                    onClick={() => setZoom(true)}
                    className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center border border-gray-200 bg-white text-[#081A33] shadow-sm transition hover:bg-[#F5A623] sm:bottom-5 sm:right-5 sm:h-11 sm:w-11"
                    aria-label="Zoom product image"
                  >
                    <ZoomIn size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* LARGE PRODUCT VIDEO — displayed below the main image/gallery */}
            {(hasMp4 || youtubeEmbedUrl || instagramEmbedUrl) && (
              <section className="mt-6 w-full overflow-hidden border border-gray-200 bg-[#081A33]">
                <div className="flex items-center justify-between gap-4 bg-[#081A33] px-4 py-3 sm:px-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[2px] text-[#F5A623]">
                      Product Video
                    </p>
                    <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                      See {currentProduct.name} in action
                    </h3>
                  </div>
                </div>

                <div className="relative aspect-video w-full bg-black">
                  {hasMp4 ? (
                    <video
                      key={`large-${videoUrl}`}
                      src={videoUrl}
                      poster={images[0] || undefined}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  ) : youtubeEmbedUrl ? (
                    <iframe
                      key={`large-${youtubeEmbedUrl}`}
                      src={getYouTubeEmbedUrl(youtubeUrl, { autoplay: true, controls: false })}
                      title={`${currentProduct.name} product video`}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <iframe
                      key={`large-${instagramEmbedUrl}`}
                      src={instagramEmbedUrl}
                      title={`${currentProduct.name} Instagram Reel`}
                      className="absolute inset-0 h-full w-full border-0 bg-white"
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>
              </section>
            )}

            {/* TRUST STRIP */}
      
            

            <div className="mt-5 grid grid-cols-1 border border-gray-200 sm:grid-cols-3">
              
              
              <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 sm:border-b-0 sm:border-r sm:px-5">
                <ShieldCheck className="shrink-0 text-[#F5A623]" size={25} />
                <div>
                  <p className="text-sm font-bold text-[#081A33] sm:text-[15px]">Quality Assured</p>
                  <p className="text-[11px] text-gray-500">Premium materials</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 sm:border-b-0 sm:border-r sm:px-5">
                <Truck className="shrink-0 text-[#F5A623]" size={25} />
                <div>
                  <p className="text-sm font-bold text-[#081A33] sm:text-[15px]">Fast Delivery</p>
                  <p className="text-[11px] text-gray-500">Across India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
                <RotateCcw className="shrink-0 text-[#F5A623]" size={25} />
                <div>
                  <p className="text-sm font-bold text-[#081A33] sm:text-[15px]">Easy Support</p>
                  <p className="text-[11px] text-gray-500">Expert assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFORMATION */}

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
              <span
                className={`px-3 py-1 text-[11px] font-bold sm:text-[15px] ${inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#081A33] sm:text-4xl md:text-5xl">
              {currentProduct.name}
            </h1>

            {/* RATING */}

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-gray-200 pb-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={16}
                    fill={
                      item <= Math.round(Number(currentProduct.rating || 0))
                        ? "#F5A623"
                        : "none"
                    }
                    className="text-[#F5A623]"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#081A33]">
                {currentProduct.rating || "4.5"}
              </span>
            </div>

            {/* SHORT DESCRIPTION */}

            {content.shortDescription && (
              <div
                className="
                  mt-6 text-[15px] leading-7 text-gray-600 sm:text-[16px] sm:leading-8
                  [&_.description-heading]:mb-4 [&_.description-heading]:mt-8
                  [&_.description-heading]:text-xl [&_.description-heading]:font-black
                  [&_.description-heading]:leading-tight [&_.description-heading]:text-[#081A33]
                  [&_.description-heading:first-child]:mt-0
                  [&_.description-point]:flex [&_.description-point]:items-start [&_.description-point]:gap-3
                  [&_.description-point_p]:m-0 [&_.description-point_p]:leading-7 sm:[&_.description-point_p]:leading-8
                  [&_.description-point_strong]:font-semibold [&_.description-point_strong]:text-[#081A33]
                  [&_.description-diamond]:mt-[11px] [&_.description-diamond]:h-2.5 [&_.description-diamond]:w-2.5
                  [&_.description-diamond]:shrink-0 [&_.description-diamond]:rotate-45 [&_.description-diamond]:bg-[#3B82F6]
                  [&_p]:mb-4 [&_p:last-child]:mb-0
                  [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5
                  [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5
                  [&_li]:mb-2
                  [&_strong]:font-semibold [&_em]:italic [&_u]:underline
                  [&_a]:text-[#081A33] [&_a]:underline [&_a]:underline-offset-2
                "
                dangerouslySetInnerHTML={{
                  __html: formatProductDescription(content.shortDescription),
                }}
              />
            )}

            {/* PRICE + VARIANTS */}

            {!isBeltCategory && (
              <div className="mt-7 bg-[#F7F8FA] p-4 sm:p-6">
                <div className="flex flex-wrap items-end gap-3 sm:gap-4">
                  <span className="text-3xl font-black text-[#081A33] sm:text-4xl">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  {oldPrice > price && (
                    <span className="pb-1 text-base text-gray-400 line-through sm:text-lg">
                      ₹{oldPrice.toLocaleString("en-IN")}
                    </span>
                  )}

                  {discount > 0 && (
                    <span className="mb-1 bg-[#F5A623] px-2 py-1 text-xs font-extrabold text-[#081A33] sm:px-3 sm:text-[15px]">
                      SAVE {discount}%
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-500 sm:text-[15px]">
                  Inclusive of applicable taxes
                </p>

                {variants.length > 0 && (
                  <div className="mt-5" role="group" aria-label="Select product size">
                    <p className="mb-2 text-sm font-semibold text-[#081A33]">
                      Size: {selectedVariant?.size || "Default"}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {variants.map((variant, index) => (
                        <button
                          key={variant._id || `${variant.size}-${index}`}
                          type="button"
                          aria-pressed={selectedVariant === variant}
                          onClick={() => {
                            setSelectedVariantIndex(index);
                            setQuantity(1);
                          }}
                          className={`rounded border px-3 py-2 text-xs font-medium text-[#081A33] transition sm:text-sm ${selectedVariant === variant
                              ? "border-[#F5A623] bg-[#F5A623]"
                              : "border-gray-300 bg-white hover:border-[#F5A623]"
                            }`}
                        >
                          {variant.size}
                          {!isVariantInStock(currentProduct, variant) &&
                            " (Out of stock)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* KEY FEATURES */}

            <div className="mt-7">
              <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#081A33]">
                Key Features
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {content.keyFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#081A33] text-white">
                      <Check size={12} />
                    </span>
                    <span className="text-sm leading-6 text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-7 border-t border-gray-200" />

            {/* QUANTITY + CART */}

            {isBeltCategory ? (
              <button
                type="button"
                onClick={() => setIsBulkEnquiryOpen(true)}
                className="flex h-12 w-full items-center justify-center gap-2 border-2 border-[#F5A623] bg-[#F5A623] px-5 text-sm font-extrabold uppercase tracking-wide text-[#081A33] transition-all duration-300 hover:bg-[#081A33] hover:text-white"
              >
                <Send size={17} />
                <span>Bulk Enquiry</span>
              </button>
            ) : (
              <>
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-end gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-5">
                  {/* QUANTITY */}
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 sm:text-[15px]">
                      Quantity
                    </p>

                    <div className="flex h-12 border border-gray-300">
                      <button
                        type="button"
                        onClick={decreaseQty}
                        className="flex w-10 items-center justify-center bg-gray-50 transition hover:bg-[#081A33] hover:text-white sm:w-12"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>

                      <div className="flex w-11 items-center justify-center border-x border-gray-300 text-sm font-bold sm:w-14">
                        {quantity}
                      </div>

                      <button
                        type="button"
                        onClick={increaseQty}
                        className="flex w-10 items-center justify-center bg-gray-50 transition hover:bg-[#081A33] hover:text-white sm:w-12"
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    onClick={addToCart}
                    disabled={!inStock}
                    className="mt-0 flex h-12 min-w-0 flex-1 items-center justify-center gap-2 bg-[#F5A623] px-2 text-[10px] font-extrabold uppercase tracking-wide text-[#081A33] transition hover:bg-[#081A33] hover:text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 sm:mt-5 sm:gap-3 sm:px-8 sm:text-sm"
                  >
                    <ShoppingCart size={18} />
                    <span className="truncate">
                      {inStock ? "Add to Cart" : "Out of Stock"}
                    </span>
                  </button>

                  {/* WISHLIST */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(currentProduct)}
                    className={`mt-0 flex h-12 w-12 shrink-0 items-center justify-center border transition sm:mt-5 ${saved
                        ? "border-[#F5A623] bg-[#F5A623]"
                        : "border-gray-300 bg-white hover:border-[#081A33]"
                      }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={20}
                      fill={saved ? "#081A33" : "none"}
                      className="text-[#081A33]"
                    />
                  </button>

                  COMPARE
                  {/* <button
                    type="button"
                    className="mt-0 flex h-12 w-12 shrink-0 items-center justify-center border border-gray-300 bg-white transition hover:border-[#081A33] sm:mt-5"
                    aria-label="Compare product"
                  >
                    <GitCompare size={20} className="text-[#081A33]" />
                  </button> */}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={buyNow}
                    disabled={!inStock}
                    className="flex h-12 w-full items-center justify-center border-2 border-[#081A33] bg-[#081A33] px-5 text-sm font-extrabold uppercase tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-[#081A33] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Buy It Now
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBulkEnquiryOpen(true)}
                    className="flex h-12 w-full items-center justify-center gap-2 border-2 border-[#F5A623] bg-[#F5A623] px-5 text-sm font-extrabold uppercase tracking-wide text-[#081A33] transition-all duration-300 hover:bg-[#081A33] hover:text-white"
                  >
                    <Send size={17} />
                    <span>Bulk Enquiry</span>
                  </button>
                </div>
              </>
            )}

            {/* DELIVERY INFO */}

            <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
              <div className="flex items-start gap-4 py-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <Truck size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#081A33]">Fast & Secure Delivery</p>
                  <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-[15px]">
                    Estimated delivery within 3–7 working days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#081A33]">Quality Guaranteed</p>
                  <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-[15px]">
                    Carefully inspected before dispatch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <MapPin size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#081A33]">Bulk Orders Welcome</p>
                  <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-[15px]">
                    Contact our team for customized pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLUE FEATURE BAND */}

      <section className="bg-[#081A33]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-3">
          <div className="flex items-center gap-5 border-b border-white/10 px-5 py-7 md:border-b-0 md:border-r md:px-8 md:py-8">
            <ShieldCheck size={32} className="shrink-0 text-[#F5A623]" />
            <div>
              <h3 className="font-bold text-white">Premium Protection</h3>
              <p className="mt-1 text-sm text-white/60">Built for fragile products</p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b border-white/10 px-5 py-7 md:border-b-0 md:border-r md:px-8 md:py-8">
            <Truck size={32} className="shrink-0 text-[#F5A623]" />
            <div>
              <h3 className="font-bold text-white">Reliable Delivery</h3>
              <p className="mt-1 text-sm text-white/60">Secure nationwide shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-5 px-5 py-7 md:px-8 md:py-8">
            <Heart size={32} className="shrink-0 text-[#F5A623]" />
            <div>
              <h3 className="font-bold text-white">Customer First</h3>
              <p className="mt-1 text-sm text-white/60">Support when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS */}

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-5 sm:py-16 lg:py-20">

          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
                <span className="h-[2px] w-8 bg-[#F5A623]" />
                Product Details
              </span>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-[#081A33] sm:text-4xl md:text-6xl">
                Everything you need to know
                <span className="block text-[#F5A623]">before you pack.</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p className="text-sm leading-7 text-gray-500">
                Explore product information, specifications, applications and packaging advantages designed to help you choose the right solution for your requirements.
              </p>
            </div>
          </div>

          {/* OVERVIEW */}

          <div className="relative overflow-hidden bg-[#F7F8FA]">
            <div className="pointer-events-none absolute -right-5 -top-16 text-[120px] font-black leading-none text-[#081A33]/[0.035] sm:text-[180px]">
              01
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr]">
              <div className="hidden border-r border-gray-200 p-8 lg:block">
                <div className="sticky top-10">
                  <span className="text-6xl font-black text-[#081A33]">01</span>
                  <div className="mt-6 h-20 w-[3px] bg-[#F5A623]" />
                  <p className="mt-5 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                    Product
                    <br />
                    Overview
                  </p>
                </div>
              </div>

              <div className="relative p-5 sm:p-7 md:p-12 lg:p-16">
                <div className="mb-8">
                  <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
                    Product Overview
                  </span>

                  <h3 className="mt-4 max-w-4xl text-2xl font-black leading-tight text-[#081A33] sm:text-3xl md:text-5xl">
                    {content.overviewTitle}
                    <span className="block text-[#081A33]/60">
                      {content.overviewTitleSecond}
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {content.overviewParagraphs.map((paragraph, index) => (
                    <div
                      key={paragraph}
                      className="border-l-2 border-[#F5A623] bg-white p-5 sm:p-6 md:p-7"
                    >
                      <span className="mb-4 block text-xs font-black text-[#081A33]/30">
                        0{index + 1}
                      </span>
                      <p className="text-[15px] leading-8 text-gray-600">{paragraph}</p>
                    </div>
                  ))}
                </div>

                {content.description && (
                  <div className="mt-10 border-t border-gray-200 pt-8 sm:mt-12 sm:pt-10">
                    <div
                      className="
                        max-w-4xl text-[15px] leading-7 text-gray-600 sm:text-[16px] sm:leading-8
                        [&_.description-heading]:mb-5 [&_.description-heading]:mt-10
                        [&_.description-heading]:text-xl [&_.description-heading]:font-black
                        [&_.description-heading]:leading-tight [&_.description-heading]:text-[#081A33]
                        sm:[&_.description-heading]:text-2xl
                        [&_.description-heading:first-child]:mt-0
                        [&_.description-point]:mb-4 [&_.description-point]:flex [&_.description-point]:items-start
                        [&_.description-point]:gap-3 sm:[&_.description-point]:gap-4
                        [&_.description-point_p]:m-0 [&_.description-point_p]:leading-7 sm:[&_.description-point_p]:leading-8
                        [&_.description-diamond]:mt-[11px] [&_.description-diamond]:h-2.5 [&_.description-diamond]:w-2.5
                        [&_.description-diamond]:shrink-0 [&_.description-diamond]:rotate-45 [&_.description-diamond]:bg-[#F5A623]
                        [&_p]:mb-5 [&_p:last-child]:mb-0
                        [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-6
                        [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-6
                        [&_li]:mb-2
                        [&_strong]:font-bold [&_strong]:text-[#081A33]
                        [&_a]:font-semibold [&_a]:text-[#081A33] [&_a]:underline
                      "
                      dangerouslySetInnerHTML={{
                        __html: formatProductDescription(content.description),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SPECIFICATIONS */}

          {content.specs.length > 0 && (
            <div className="mt-14 sm:mt-20">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
                    02 / Specifications
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-[#081A33] sm:text-3xl md:text-4xl">
                    Product Specifications
                  </h3>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Technical Information
                </span>
              </div>

              <div className="overflow-hidden border border-gray-200">
                {content.specs.map(([label, value], index) => (
                  <div
                    key={`${label}-${index}`}
                    className={`group grid grid-cols-1 gap-3 p-4 transition sm:p-5 md:grid-cols-[280px_1fr] md:items-center ${index % 2 === 0 ? "bg-[#F7F8FA]" : "bg-white"
                      } hover:bg-[#081A33]`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-black text-[#F5A623]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-black text-[#081A33] transition group-hover:text-white">
                        {label}
                      </span>
                    </div>

                    <div className="text-sm leading-6 text-gray-500 transition group-hover:text-white/70">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APPLICATIONS + SIZES */}

          {(content.applications.length > 0 || content.sizes.length > 0) && (
            <div className="relative mt-14 overflow-hidden bg-[#081A33] sm:mt-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[60px] border-white/[0.03]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[70px] border-[#F5A623]/[0.04]" />

              <div className="relative p-5 sm:p-8 md:p-14 lg:p-16">
                <div className="max-w-2xl">
                  <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
                    03 / Applications
                  </span>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl md:text-5xl">
                    Where this product
                    <span className="block text-white/50">makes a difference.</span>
                  </h3>
                </div>

                {content.applications.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2">
                    {content.applications.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#F5A623] hover:bg-white/[0.08] sm:p-6"
                      >
                        <span className="text-4xl font-black text-[#F5A623]/30 transition group-hover:text-[#F5A623]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="mt-5 flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[#F5A623]" />
                          <p className="text-sm leading-7 text-white/70">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {content.sizes.length > 0 && (
                  <div className="mt-10 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
                    <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
                      Available Sizes
                    </span>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {content.sizes.map((size, index) => (
                        <span
                          key={`${size}-${index}`}
                          className="border border-white/15 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/70 transition hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-[#081A33] sm:px-5"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FINAL CTA */}

          <div className="relative mt-14 overflow-hidden bg-[#F5A623] sm:mt-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-[#081A33]/[0.06]" />

            <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div>
                <span className="text-xs font-black uppercase tracking-[3px] text-[#081A33]/60">
                  Need bulk quantity?
                </span>
                <h3 className="mt-3 text-xl font-black text-[#081A33] sm:text-2xl md:text-3xl">
                  Looking for a packaging solution?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#081A33]/70">
                  Contact our team for bulk orders, product requirements and customized packaging solutions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsBulkEnquiryOpen(true)}
                className="shrink-0 border-2 border-[#081A33] bg-[#081A33] px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[#081A33] sm:px-7"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}

      <section className="border-t border-gray-200 bg-[#F7F8FA] py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5">
          <div className="mb-7 flex items-end justify-between sm:mb-9">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#F5A623] sm:text-[15px]">
                You May Also Like
              </span>
              <h2 className="mt-2 text-2xl font-black text-[#081A33] sm:text-3xl">
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

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <article
                key={item.slug || item.id || item.name}
                className="group min-w-0 border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-[#081A33] hover:shadow-xl"
              >
                <div className="relative flex h-[190px] items-center justify-center overflow-hidden bg-white sm:h-[230px] lg:h-[270px]">
                  <span className="absolute left-2 top-2 z-10 bg-[#081A33] px-2 py-1 text-[8px] font-bold uppercase text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
                    Packaging
                  </span>

                  <Link href={`/products/${item.slug}`} className="flex h-full w-full items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    type="button"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-white opacity-0 shadow-sm transition group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={15} />
                  </button>
                </div>

                <div className="border-t border-gray-100 p-3 sm:p-5">
                  <div className="mb-2 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={11}
                        fill="#F5A623"
                        className="text-[#F5A623] sm:h-[13px] sm:w-[13px]"
                      />
                    ))}
                  </div>

                  <Link href={`/products/${item.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-bold text-[#081A33] transition group-hover:text-[#F5A623] sm:text-base">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-base font-black text-[#081A33] sm:text-xl">
                      ₹{Number(item.price || 0).toLocaleString("en-IN")}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(
                            new CustomEvent("dpack-cart-add", {
                              detail: { ...item, quantity: 1 },
                            })
                          );
                        }
                      }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#F5A623] text-[#081A33] sm:h-9 sm:w-9"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ZOOM MODAL */}

      {zoom && activeType === "image" && images[activeImageIndex] && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-3 sm:p-5"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center bg-white text-2xl text-[#081A33] sm:right-5 sm:top-5 sm:h-12 sm:w-12"
            aria-label="Close zoom"
          >
            ×
          </button>

          <img
            src={images[activeImageIndex]}
            alt={currentProduct.name}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[82vh] max-w-[94vw] object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
          />
        </div>
      )}

      {/* BULK ENQUIRY MODAL */}

      {isBulkEnquiryOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsBulkEnquiryOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsBulkEnquiryOpen(false)}
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-black"
              aria-label="Close enquiry form"
            >
              &times;
            </button>

            <h2 className="pr-8 text-2xl font-extrabold text-[#081A33]">
              Bulk Enquiry
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Minimum Order Value:{" "}
              <span className="font-bold text-[#D95026]">₹20,000 or above</span>
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleBulkSubmit}>
              <input
                type="text"
                name="customerName"
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#081A33]"
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#081A33]"
              />

              <input
                type="tel"
                name="mobile"
                maxLength={10}
                placeholder="Mobile Number"
                required
                pattern="[0-9+\-\s()]{10,}"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#081A33]"
              />

              <input
                type="text"
                name="place"
                placeholder="City / Delivery Location"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#081A33]"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Message / Requirement Details"
                required
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#081A33]"
              />

              {enquiryStatus && (
                <p className="text-sm font-semibold text-[#081A33]">{enquiryStatus}</p>
              )}

              <button
                type="submit"
                disabled={enquiryLoading}
                className="w-full rounded-xl bg-[#081A33] px-5 py-3.5 font-bold text-white transition hover:bg-[#D95026] disabled:opacity-60"
              >
                {enquiryLoading ? "Sending..." : "Submit Bulk Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}