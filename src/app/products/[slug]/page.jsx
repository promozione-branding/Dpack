"use client";

import { use, useEffect, useState } from "react";
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
  Youtube,
  Play,
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
    const text = Array.isArray(specification)
      ? `${specification[0] ?? ""}: ${specification[1] ?? ""}`
      : specification && typeof specification === "object"
        ? `${specification.label || specification.name || `Specification ${index + 1}`}: ${specification.value ?? specification.description ?? ""}`
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
    return product.variants;
  }
  // Older products have size labels but share a single price.
  if (product?.price != null) {
    const sizes = product.sizes?.length ? product.sizes : ["Default"];
    return sizes.map((size, index) => (
      {
        size,
        price: Number(product.price),
        compareAtPrice:
          product.compareAtPrice != null
            ? Number(product.compareAtPrice)
            : null,
        stock: Number(product.stock ?? 0),
        isDefault: index === 0,
      }
    ));
  }
  return [];
}

function getDefaultVariant(product) {
  const variants = getVariants(product);
  if (!variants.length) return null;
  return (
    variants.find((v) => v.isDefault) ||
    variants[0]
  );
}

function getDisplayPrice(product, selectedVariant = null) {
  const v = selectedVariant || getDefaultVariant(product);
  if (v?.price != null) return Number(v.price);
  return Number(product?.price ?? 0);
}

function getDisplayComparePrice(product, selectedVariant = null) {
  const v = selectedVariant || getDefaultVariant(product);
  // A variant without an MRP must not inherit another size's MRP.
  if (product?.variants?.length && v) return Number(v.compareAtPrice ?? 0);
  if (v?.compareAtPrice != null) return Number(v.compareAtPrice);
  return Number(
    product?.compareAtPrice ??
      product?.oldPrice ??
      product?.mrp ??
      0
  );
}

function getVariantStock(product, selectedVariant = null) {
  const tracking =
    product?.trackInventory ?? product?.inventoryTracking ?? true;
  if (!tracking) return Infinity;

  if (selectedVariant) {
    return Number(selectedVariant.stock ?? 0);
  }

  const variants = getVariants(product);
  if (variants.length > 0) {
    return variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);
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
   DESCRIPTION FORMATTER
   Supports:
   - Plain text descriptions from CSV
   - Old ◆ / 🔹 / ♦ point format
   - Rich HTML saved by the product editor
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
  if (/^technical\s+specifications?$/i.test(heading)) {
    return "Technical Specifications";
  }
  if (/^product\s+specifications?$/i.test(heading)) {
    return "Product Specifications";
  }
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

  /* Remove standalone diamond lines */
  text = text.replace(
    /(?:^|\n)\s*[◆🔹♦]\s*(?=\n|$)/g,
    "\n"
  );

  /* Convert inline diamonds into separate lines */
  text = text.replace(
    /\s*[◆🔹♦]\s*(?=[A-Za-z][^:]*:)/g,
    "\n◆ "
  );

  text = text
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  text = text.replace(
    /(Why\s*\.?\s*Choose)[.!]?[ \t]*\r?\n[ \t]*([^\r\n?]{1,60}\?)/gi,
    "$1 $2"
  );

  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(text);

  /* =====================================================
     PLAIN TEXT / CSV CONTENT
  ===================================================== */

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

  /* =====================================================
     RICH TEXT / HTML CONTENT
  ===================================================== */

  return text
    .replace(
      /<(p|div)\b[^>]*>([\s\S]*?)<\/\1>/gi,
      (paragraph, tagName, contents) => {
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
      }
    )
    .replace(
      /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi,
      (headingElement, tagName, contents) => {
        const heading = normalizeDescriptionHeading(
          contents.replace(/<\/?[^>]+>/g, " ").replace(/\s+/g, " ").trim()
        );
        return heading ? renderDescriptionHeading(heading) : headingElement;
      }
    );
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  const value = String(url).trim();

  if (!value) return null;

  try {
    const parsed = new URL(value);

    // youtube.com/watch?v=VIDEO_ID
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    // youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "").split("?")[0];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // youtube.com/shorts/VIDEO_ID
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname.startsWith("/shorts/")
    ) {
      const videoId = parsed.pathname
        .replace("/shorts/", "")
        .split("/")[0];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Already embed URL
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname.startsWith("/embed/")
    ) {
      return value;
    }
  } catch {
    return null;
  }

  return null;
}

/* =========================================================
   PAGE
========================================================= */

export default function ProductPage({ params }) {
  const router = useRouter();
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
const [selectedMedia, setSelectedMedia] = useState({
  type: "image",
  index: 0,
});
const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);
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
      setSelectedVariantIndex(null);
      setQuantity(1);
      setSelectedImage(0);
      setSelectedMedia({
  type: "image",
  index: 0,
});

      try {
        const response = await fetch(`/api/products/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });
        const data = await response.json();
console.log(data)
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
  const organizedFields = organizeProductFields(
    currentProduct
      ? {
          ...currentProduct,
          specs: currentProduct.specs || currentProduct.specifications,
        }
      : {}
  );
  const content = databaseProduct
    ? {
        ...baseContent,
        category: databaseProduct.category || baseContent.category,
        shortDescription: databaseProduct.shortDescription || "",
        description: databaseProduct.description || baseContent.description,
      keyFeatures: organizedFields.keyFeatures,
      overviewParagraphs: organizedFields.overview,
        applications: organizedFields.applications,
        specs: toSpecificationPairs(organizedFields.specs),
        sizes: organizedFields.sizes,
      description: organizedFields.description,
    }
    : currentProduct
      ? {
          ...baseContent,
          shortDescription: currentProduct.shortDescription || "",
          description: currentProduct.description || baseContent.description,
          keyFeatures:
            organizedFields.keyFeatures.length
              ? organizedFields.keyFeatures
              : currentProduct.features?.length
              ? currentProduct.features
              : baseContent.keyFeatures,
          overviewParagraphs: organizedFields.overview.length
            ? organizedFields.overview
            : baseContent.overviewParagraphs,
          description: organizedFields.description || baseContent.description,
          applications: organizedFields.applications,
          specs: toSpecificationPairs(
            organizedFields.specs.length
              ? organizedFields.specs
              : baseContent.specs
          ),
          sizes: organizedFields.sizes,
        }
      : null;

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

    const youtubeUrl =
  currentProduct?.youtubeUrl ||
  currentProduct?.youtubeLink ||
  currentProduct?.youtubeVideo ||
  currentProduct?.youtube ||
  "";

const youtubeEmbedUrl = getYouTubeEmbedUrl(youtubeUrl);

const hasYoutubeVideo = Boolean(youtubeEmbedUrl);

  const variants = getVariants(currentProduct);
  const selectedVariant =
    variants[selectedVariantIndex] || variants.find((variant) => variant.isDefault) || variants[0] || null;
  const price = getDisplayPrice(currentProduct, selectedVariant);
  const oldPrice = getDisplayComparePrice(currentProduct, selectedVariant);
  const stock = getVariantStock(currentProduct, selectedVariant);
  const inStock = isVariantInStock(currentProduct, selectedVariant);
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
    setQuantity((q) => inStock ? Math.min(q + 1, stock) : q);

  const decreaseQty = () =>
    setQuantity((q) => (q > 1 ? q - 1 : 1));

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = () => {
    if (!inStock) return;
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

  const buyNow = () => {
    if (!inStock) return;

    addToCart();
    router.push("/checkout");
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
<div className="flex flex-col gap-4">

  {/* IMAGE THUMBNAILS */}
  {images.map((image, index) => (
    <button
      key={`${image}-${index}`}
      onClick={() => {
        setSelectedImage(index);
        setSelectedMedia({
          type: "image",
          index,
        });
      }}
      className={`flex h-[90px] items-center justify-center border bg-white p-2 transition ${
        selectedMedia.type === "image" &&
        selectedMedia.index === index
          ? "border-2 border-[#F5A623]"
          : "border-gray-200 hover:border-[#081A33]"
      }`}
    >
      <img
        src={image}
        alt={`${currentProduct.name} view ${index + 1}`}
        className="h-full w-full object-contain"
      />
    </button>
  ))}

  {/* YOUTUBE THUMBNAIL */}
  {hasYoutubeVideo && (
    <button
      type="button"
      onClick={() => {
        setSelectedMedia({
          type: "youtube",
          index: 0,
        });
      }}
      className={`group relative flex h-[90px] items-center justify-center overflow-hidden border bg-[#081A33] transition ${
        selectedMedia.type === "youtube"
          ? "border-2 border-[#F5A623]"
          : "border-gray-200 hover:border-[#081A33]"
      }`}
      aria-label="Watch product video"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#081A33] via-[#10284a] to-black" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5A623] text-[#081A33]">
          <Play size={16} fill="currentColor" />
        </span>

        <span className="text-[9px] font-extrabold uppercase tracking-wider">
          Video
        </span>
      </div>
    </button>
  )}

</div>
{/* MAIN VIEWER */}
<div className="relative flex min-h-[570px] items-center justify-center overflow-hidden border border-gray-200 bg-[#F7F9FB]">

  <div className="absolute left-5 top-5 z-20 bg-[#081A33] px-4 py-2 text-[15px] font-bold uppercase tracking-wider text-white">
    {currentProduct.badge || "Featured Product"}
  </div>

  {selectedMedia.type === "youtube" && youtubeEmbedUrl ? (
    <div className="relative h-full min-h-[570px] w-full bg-black">
      <iframe
        src={youtubeEmbedUrl}
        title={`${currentProduct.name} YouTube Video`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  ) : (
    <img
      src={images[selectedImage]}
      alt={currentProduct.name}
      className="w-full object-contain transition duration-300 hover:scale-105"
    />
  )}

  {selectedMedia.type === "image" && (
    <button
      onClick={() => setZoom(true)}
      className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center border border-gray-200 bg-white text-[#081A33] shadow-sm transition hover:bg-[#F5A623]"
      aria-label="Zoom product image"
    >
      <ZoomIn size={19} />
    </button>
  )}

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

            {content.shortDescription && (
              <div
                className="
                  mt-6
                  text-[16px]
                  leading-8
                  text-gray-600
                  [&_.description-heading]:mb-4
                  [&_.description-heading]:mt-8
                  [&_.description-heading]:text-xl
                  [&_.description-heading]:font-black
                  [&_.description-heading]:leading-tight
                  [&_.description-heading]:text-[#081A33]
                  [&_.description-heading:first-child]:mt-0
                  [&_.description-point]:flex
                  [&_.description-point]:items-start
                  [&_.description-point]:gap-3
                  [&_.description-point_p]:m-0
                  [&_.description-point_p]:leading-8
                  [&_.description-point_strong]:font-semibold
                  [&_.description-point_strong]:text-[#081A33]
                  [&_.description-diamond]:mt-[13px]
                  [&_.description-diamond]:h-2.5
                  [&_.description-diamond]:w-2.5
                  [&_.description-diamond]:shrink-0
                  [&_.description-diamond]:rotate-45
                  [&_.description-diamond]:bg-[#3B82F6]
                  [&_p]:mb-4
                  [&_p:last-child]:mb-0
                  [&_ul]:my-4
                  [&_ul]:list-disc
                  [&_ul]:pl-6
                  [&_ol]:my-4
                  [&_ol]:list-decimal
                  [&_ol]:pl-6
                  [&_li]:mb-2
                  [&_strong]:font-semibold
                  [&_em]:italic
                  [&_u]:underline
                  [&_a]:text-[#081A33]
                  [&_a]:underline
                  [&_a]:underline-offset-2
                "
                dangerouslySetInnerHTML={{
                  __html: formatProductDescription(content.shortDescription),
                }}
              />
            )}

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


              {(currentProduct.variants?.length > 0 || currentProduct.sizes?.length > 0) && (
                <div className="mt-4" role="group" aria-label="Select product size">
                  <p className="mb-2 text-sm font-semibold text-[#081A33]">Size: {selectedVariant?.size}</p>
                  {variants.map((variant, index) => (
                    <button
                      key={variant._id || `${variant.size}-${index}`}
                      type="button"
                      aria-pressed={selectedVariant === variant}
                      onClick={() => {
                        setSelectedVariantIndex(index);
                        setQuantity(1);
                      }}
                      className={`mr-2 mt-2 rounded border px-3 py-1 text-sm font-medium text-[#081A33] transition ${
                        selectedVariant === variant
                          ? "border-[#F5A623] bg-[#F5A623]"
                          : "border-gray-300 bg-white hover:border-[#F5A623]"
                      }`}
                    >
                      {variant.size}
                      {!isVariantInStock(currentProduct, variant) && " (Out of stock)"}
                    </button>
                  ))}
                </div>
              )}
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

            <button
              type="button"
              onClick={buyNow}
              disabled={!inStock}
              className="mt-4 h-12 w-full border-2 border-[#081A33] bg-[#081A33] text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#081A33] disabled:cursor-not-allowed disabled:opacity-50"
            >
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
    CREATIVE PRODUCT DETAILS
===================================================== */}
<section className="border-t border-gray-200 bg-white">
  <div className="mx-auto max-w-[1400px] px-5 py-20">

    {/* SECTION HEADER */}
    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
          <span className="h-[2px] w-8 bg-[#F5A623]" />
          Product Details
        </span>

        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#081A33] md:text-6xl">
          Everything you need to know
          <span className="block text-[#F5A623]">
            before you pack.
          </span>
        </h2>
      </div>

      <div className="max-w-md">
        <p className="text-sm leading-7 text-gray-500">
          Explore product information, specifications, applications and
          packaging advantages designed to help you choose the right
          solution for your requirements.
        </p>
      </div>
    </div>

    {/* =================================================
        OVERVIEW
    ================================================= */}
    <div className="relative overflow-hidden bg-[#F7F8FA]">

      {/* BIG BACKGROUND NUMBER */}
      <div className="pointer-events-none absolute -right-5 -top-16 text-[180px] font-black leading-none text-[#081A33]/[0.035]">
        01
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr]">

        {/* NUMBER PANEL */}
        <div className="hidden border-r border-gray-200 p-8 lg:block">
          <div className="sticky top-10">
            <span className="text-6xl font-black text-[#081A33]">
              01
            </span>

            <div className="mt-6 h-20 w-[3px] bg-[#F5A623]" />

            <p className="mt-5 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
              Product
              <br />
              Overview
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-7 md:p-12 lg:p-16">

          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
              Product Overview
            </span>

            <h3 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-[#081A33] md:text-5xl">
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
                className="border-l-2 border-[#F5A623] bg-white p-6 md:p-7"
              >
                <span className="mb-4 block text-xs font-black text-[#081A33]/30">
                  0{index + 1}
                </span>

                <p className="text-[15px] leading-8 text-gray-600">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>

          {/* DETAILED DESCRIPTION */}
          {content.description && (
            <div className="mt-12 border-t border-gray-200 pt-10">

              <div
                className="
                  max-w-4xl
                  text-[16px]
                  leading-8
                  text-gray-600

                  [&_.description-heading]:mb-5
                  [&_.description-heading]:mt-10
                  [&_.description-heading]:text-2xl
                  [&_.description-heading]:font-black
                  [&_.description-heading]:leading-tight
                  [&_.description-heading]:text-[#081A33]

                  [&_.description-heading:first-child]:mt-0

                  [&_.description-point]:mb-4
                  [&_.description-point]:flex
                  [&_.description-point]:items-start
                  [&_.description-point]:gap-4

                  [&_.description-point_p]:m-0
                  [&_.description-point_p]:leading-8

                  [&_.description-diamond]:mt-[13px]
                  [&_.description-diamond]:h-2.5
                  [&_.description-diamond]:w-2.5
                  [&_.description-diamond]:shrink-0
                  [&_.description-diamond]:rotate-45
                  [&_.description-diamond]:bg-[#F5A623]

                  [&_p]:mb-5
                  [&_p:last-child]:mb-0

                  [&_ul]:my-5
                  [&_ul]:list-disc
                  [&_ul]:pl-6

                  [&_ol]:my-5
                  [&_ol]:list-decimal
                  [&_ol]:pl-6

                  [&_li]:mb-2

                  [&_strong]:font-bold
                  [&_strong]:text-[#081A33]

                  [&_a]:font-semibold
                  [&_a]:text-[#081A33]
                  [&_a]:underline
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

    {/* =================================================
        SPECIFICATIONS
    ================================================= */}
    {content.specs.length > 0 && (
      <div className="mt-20">

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
              02 / Specifications
            </span>

            <h3 className="mt-3 text-3xl font-black text-[#081A33] md:text-4xl">
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
              className={`
                group grid grid-cols-1 gap-3 p-5 transition
                md:grid-cols-[280px_1fr]
                md:items-center
                ${
                  index % 2 === 0
                    ? "bg-[#F7F8FA]"
                    : "bg-white"
                }
                hover:bg-[#081A33]
              `}
            >

              <div className="flex items-center gap-4">

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

    {/* =================================================
        APPLICATIONS
    ================================================= */}
    {(content.applications.length > 0 ||
      content.sizes.length > 0) && (
      <div className="relative mt-20 overflow-hidden bg-[#081A33]">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[60px] border-white/[0.03]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[70px] border-[#F5A623]/[0.04]" />

        <div className="relative p-8 md:p-14 lg:p-16">

          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
              03 / Applications
            </span>

            <h3 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Where this product
              <span className="block text-white/50">
                makes a difference.
              </span>
            </h3>
          </div>

          {content.applications.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">

              {content.applications.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-6
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#F5A623]
                    hover:bg-white/[0.08]
                  "
                >

                  <span className="text-4xl font-black text-[#F5A623]/30 transition group-hover:text-[#F5A623]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mt-5 flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[#F5A623]" />

                    <p className="text-sm leading-7 text-white/70">
                      {item}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* SIZES */}
          {content.sizes.length > 0 && (
            <div className="mt-12 border-t border-white/10 pt-10">

              <span className="text-xs font-black uppercase tracking-[3px] text-[#F5A623]">
                Available Sizes
              </span>

              <div className="mt-5 flex flex-wrap gap-3">
                {content.sizes.map((size, index) => (
                  <span
                    key={`${size}-${index}`}
                    className="
                      border
                      border-white/15
                      bg-white/[0.03]
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white/70
                      transition
                      hover:border-[#F5A623]
                      hover:bg-[#F5A623]
                      hover:text-[#081A33]
                    "
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

 

    {/* =================================================
        FINAL CTA
    ================================================= */}
    <div className="relative mt-20 overflow-hidden bg-[#F5A623]">

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-[#081A33]/[0.06]" />

      <div className="relative flex flex-col gap-7 p-8 md:flex-row md:items-center md:justify-between md:p-12">

        <div>
          <span className="text-xs font-black uppercase tracking-[3px] text-[#081A33]/60">
            Need bulk quantity?
          </span>

          <h3 className="mt-3 text-2xl font-black text-[#081A33] md:text-3xl">
            Looking for a packaging solution?
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#081A33]/70">
            Contact our team for bulk orders, product requirements
            and customized packaging solutions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("dpack-product-inquiry", {
                detail: currentProduct,
              })
            );
          }}
          className="
            shrink-0
            border-2
            border-[#081A33]
            bg-[#081A33]
            px-7
            py-4
            text-sm
            font-black
            uppercase
            tracking-wide
            text-white
            transition
            hover:bg-white
            hover:text-[#081A33]
          "
        >
          Enquire Now
        </button>

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

                  <div className="relative flex h-[270px] items-center justify-center overflow-hidden bg-white">

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
