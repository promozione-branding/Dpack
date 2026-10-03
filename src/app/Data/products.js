const products = [
  {
    id: 1,
    name: "Air Column Bag",
    slug: "air-column-bag",
    category: "Air Column Packaging",
    categorySlug: "air-column-packaging",
    sku: "ACB-001",

    price: 1499,
    oldPrice: 1799,
    currency: "INR",

    rating: 4.8,
    reviews: 24,

    badge: "Best Seller",

    image: "/Air column bag (2).webp",

    images: [
      "/Air column bag (2).webp",
      "/Air column bag (2).webp",
      "/Air column bag (2).webp",
      "/Air column bag (2).webp",
    ],

    shortDescription:
      "High-quality air column packaging solution designed to protect fragile products during shipping, storage and transportation.",

    description:
      "Air Column Bag is a protective packaging solution designed to provide cushioning and impact protection for fragile and valuable products. Its air-filled columns help absorb shocks, vibrations and external pressure during handling, shipping and storage.",

    features: [
      "Excellent shock and impact protection",
      "Lightweight and easy to handle",
      "Space-saving packaging solution",
      "Suitable for fragile products",
      "Easy and quick product wrapping",
      "Helps reduce transportation damage",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Air Column Bag",
      },
      {
        label: "Material",
        value: "High Quality PE Film",
      },
      {
        label: "Protection",
        value: "Air Cushion Protection",
      },
      {
        label: "Application",
        value: "Fragile Product Packaging",
      },
      {
        label: "Usage",
        value: "Shipping & Transportation",
      },
      {
        label: "Structure",
        value: "Multi Air Column",
      },
      {
        label: "Weight",
        value: "Lightweight",
      },
      {
        label: "Packaging",
        value: "Roll / Individual Packs",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "SKU",
        value: "ACB-001",
      },
    ],

    tags: [
      "Air Column",
      "Protective Packaging",
      "Fragile Packaging",
      "Shipping Protection",
    ],

    inStock: true,
    featured: true,
    bestSeller: true,
  },

  {
    id: 2,
    name: "Dunnage Air Bag",
    slug: "dunnage-air-bag",
    category: "Dunnage Packaging",
    categorySlug: "dunnage-packaging",
    sku: "DAB-001",

    price: 1299,
    oldPrice: 1599,
    currency: "INR",

    rating: 4.7,
    reviews: 18,

    badge: "Popular",

    image: "/Dunnage.webp",

    images: [
      "/Dunnage.webp",
      "/Dunnage.webp",
      "/Dunnage.webp",
      "/Dunnage.webp",
    ],

    shortDescription:
      "Inflatable dunnage air bag designed to stabilize cargo and reduce movement during transportation.",

    description:
      "Dunnage Air Bags are designed to fill empty spaces between cargo and prevent unwanted movement during transportation. They provide cushioning support and help reduce the risk of damage caused by shifting, vibration and impact.",

    features: [
      "Prevents cargo movement",
      "Reduces impact during transportation",
      "Lightweight and easy to install",
      "Quick inflation and deflation",
      "Suitable for different cargo sizes",
      "Helps improve load stability",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Dunnage Air Bag",
      },
      {
        label: "Material",
        value: "Multi-Layer PE / PP",
      },
      {
        label: "Application",
        value: "Cargo Stabilization",
      },
      {
        label: "Usage",
        value: "Truck, Container & Shipping",
      },
      {
        label: "Protection",
        value: "Movement & Impact Protection",
      },
      {
        label: "Installation",
        value: "Inflatable",
      },
      {
        label: "Structure",
        value: "Inflatable Air Cushion",
      },
      {
        label: "Color",
        value: "Brown / White",
      },
      {
        label: "Packaging",
        value: "Flat Packed",
      },
      {
        label: "SKU",
        value: "DAB-001",
      },
    ],

    tags: [
      "Dunnage Bag",
      "Cargo Protection",
      "Cargo Stabilization",
      "Transportation Packaging",
    ],

    inStock: true,
    featured: true,
    bestSeller: false,
  },

  {
    id: 3,
    name: "Air Column Roll",
    slug: "air-column-roll",
    category: "Air Column Packaging",
    categorySlug: "air-column-packaging",
    sku: "ACR-001",

    price: 1199,
    oldPrice: 1399,
    currency: "INR",

    rating: 4.6,
    reviews: 16,

    badge: "",

    image: "/Air Column Roll (2).webp",

    images: [
      "/Air Column Roll (2).webp",
      "/Air Column Roll (2).webp",
      "/Air Column Roll (2).webp",
      "/Air Column Roll (2).webp",
    ],

    shortDescription:
      "Flexible air column roll providing lightweight cushioning and protection for products during transportation.",

    description:
      "Air Column Roll is a flexible protective packaging material that provides cushioning around products. It can be used for wrapping and protecting a wide range of products from scratches, shocks and handling damage.",

    features: [
      "Flexible protective packaging",
      "Excellent cushioning performance",
      "Lightweight construction",
      "Easy to cut and wrap",
      "Suitable for multiple product sizes",
      "Helps protect against scratches and impact",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Air Column Roll",
      },
      {
        label: "Material",
        value: "High Quality PE Film",
      },
      {
        label: "Application",
        value: "Product Wrapping",
      },
      {
        label: "Protection",
        value: "Cushioning & Impact Protection",
      },
      {
        label: "Usage",
        value: "Shipping & Storage",
      },
      {
        label: "Structure",
        value: "Air Column Roll",
      },
      {
        label: "Form",
        value: "Roll",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "Packaging",
        value: "Roll Packed",
      },
      {
        label: "SKU",
        value: "ACR-001",
      },
    ],

    tags: [
      "Air Column Roll",
      "Cushioning",
      "Protective Packaging",
      "Product Wrapping",
    ],

    inStock: true,
    featured: true,
    bestSeller: false,
  },

  {
    id: 4,
    name: "Packaging Air Bag",
    slug: "packaging-air-bag",
    category: "Packaging Air Bags",
    categorySlug: "packaging-air-bags",
    sku: "PAB-001",

    price: 999,
    oldPrice: 1199,
    currency: "INR",

    rating: 4.7,
    reviews: 21,

    badge: "New",

    image: "/packing bag.webp",

    images: [
      "/packing bag.webp",
      "/packing bag.webp",
      "/packing bag.webp",
      "/packing bag.webp",
    ],

    shortDescription:
      "Lightweight inflatable packaging air bag designed to cushion and protect products during shipping.",

    description:
      "Packaging Air Bags provide a practical cushioning layer around products and help reduce damage caused by shocks, vibrations and pressure during transportation. They are lightweight, easy to use and suitable for different packaging requirements.",

    features: [
      "Lightweight cushioning solution",
      "Easy to use and install",
      "Provides shock protection",
      "Reduces product movement",
      "Space efficient",
      "Suitable for shipping and storage",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Packaging Air Bag",
      },
      {
        label: "Material",
        value: "PE Film",
      },
      {
        label: "Application",
        value: "Protective Packaging",
      },
      {
        label: "Protection",
        value: "Shock & Vibration Protection",
      },
      {
        label: "Usage",
        value: "Shipping & Storage",
      },
      {
        label: "Structure",
        value: "Inflatable Air Cushion",
      },
      {
        label: "Weight",
        value: "Lightweight",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "Packaging",
        value: "Packed",
      },
      {
        label: "SKU",
        value: "PAB-001",
      },
    ],

    tags: [
      "Air Bag",
      "Packaging",
      "Cushioning",
      "Shipping Protection",
    ],

    inStock: true,
    featured: true,
    bestSeller: false,
  },

  {
    id: 5,
    name: "Gap Filler",
    slug: "gap-filler",
    category: "Gap Fillers",
    categorySlug: "gap-fillers",
    sku: "GF-001",

    price: 899,
    oldPrice: 1099,
    currency: "INR",

    rating: 4.5,
    reviews: 14,

    badge: "",

    image: "/Gap filler (3).webp",

    images: [
      "/Gap filler (3).webp",
      "/Gap filler (3).webp",
      "/Gap filler (3).webp",
      "/Gap filler (3).webp",
    ],

    shortDescription:
      "Protective gap filling solution designed to prevent product movement inside packaging boxes.",

    description:
      "Gap Fillers help fill empty spaces inside packaging boxes and shipping containers. They keep products securely positioned and reduce unwanted movement, helping protect goods during transportation and handling.",

    features: [
      "Fills empty packaging spaces",
      "Reduces product movement",
      "Lightweight and easy to use",
      "Improves package stability",
      "Suitable for different box sizes",
      "Helps reduce transit damage",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Packaging Gap Filler",
      },
      {
        label: "Material",
        value: "Protective Packaging Material",
      },
      {
        label: "Application",
        value: "Void Filling",
      },
      {
        label: "Protection",
        value: "Movement Protection",
      },
      {
        label: "Usage",
        value: "Boxes & Shipping Packages",
      },
      {
        label: "Structure",
        value: "Flexible Cushioning",
      },
      {
        label: "Weight",
        value: "Lightweight",
      },
      {
        label: "Color",
        value: "As Available",
      },
      {
        label: "Packaging",
        value: "Packed",
      },
      {
        label: "SKU",
        value: "GF-001",
      },
    ],

    tags: [
      "Gap Filler",
      "Void Filling",
      "Packaging Protection",
      "Shipping",
    ],

    inStock: true,
    featured: false,
    bestSeller: false,
  },

  {
    id: 6,
    name: "Air Pillow Packaging",
    slug: "air-pillow-packaging",
    category: "Packaging Air Bags",
    categorySlug: "packaging-air-bags",
    sku: "APP-001",

    price: 799,
    oldPrice: 999,
    currency: "INR",

    rating: 4.6,
    reviews: 12,

    badge: "",

    image: "/air-pillow.webp",

    images: [
      "/air-pillow.webp",
      "/air-pillow.webp",
      "/air-pillow.webp",
      "/air-pillow.webp",
    ],

    shortDescription:
      "Compact air pillow packaging solution for cushioning and filling empty spaces around products.",

    description:
      "Air Pillow Packaging provides lightweight cushioning for products inside cartons and shipping boxes. It helps fill empty spaces and protects products from movement, shocks and minor impacts during transportation.",

    features: [
      "Lightweight protective solution",
      "Excellent for void filling",
      "Easy to handle",
      "Space efficient",
      "Reduces product movement",
      "Suitable for e-commerce packaging",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Air Pillow",
      },
      {
        label: "Material",
        value: "PE Film",
      },
      {
        label: "Application",
        value: "Void Filling & Cushioning",
      },
      {
        label: "Protection",
        value: "Impact & Movement Protection",
      },
      {
        label: "Usage",
        value: "E-commerce & Shipping",
      },
      {
        label: "Structure",
        value: "Inflatable Air Cushion",
      },
      {
        label: "Weight",
        value: "Very Lightweight",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "Packaging",
        value: "Packed",
      },
      {
        label: "SKU",
        value: "APP-001",
      },
    ],

    tags: [
      "Air Pillow",
      "Void Filling",
      "E-commerce Packaging",
      "Cushioning",
    ],

    inStock: true,
    featured: false,
    bestSeller: false,
  },

  {
    id: 7,
    name: "Air Bubble Roll",
    slug: "air-bubble-roll",
    category: "Protective Packaging",
    categorySlug: "protective-packaging",
    sku: "ABR-001",

    price: 1099,
    oldPrice: 1299,
    currency: "INR",

    rating: 4.7,
    reviews: 19,

    badge: "Popular",

    image: "/products/air-bubble-roll.webp",

    images: [
      "/products/air-bubble-roll.webp",
      "/products/air-bubble-roll.webp",
      "/products/air-bubble-roll.webp",
      "/products/air-bubble-roll.webp",
    ],

    shortDescription:
      "Protective air bubble roll designed to cushion products against scratches, shocks and handling damage.",

    description:
      "Air Bubble Roll is a versatile protective packaging material suitable for wrapping and cushioning products. Its air-filled bubbles provide an additional layer of protection during storage, transportation and shipping.",

    features: [
      "Excellent cushioning",
      "Protects against scratches",
      "Lightweight and flexible",
      "Easy to cut and wrap",
      "Suitable for fragile products",
      "Ideal for shipping and storage",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Air Bubble Roll",
      },
      {
        label: "Material",
        value: "LDPE Film",
      },
      {
        label: "Application",
        value: "Product Wrapping",
      },
      {
        label: "Protection",
        value: "Shock & Scratch Protection",
      },
      {
        label: "Usage",
        value: "Shipping & Storage",
      },
      {
        label: "Structure",
        value: "Air Bubble Cushion",
      },
      {
        label: "Form",
        value: "Roll",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "Packaging",
        value: "Roll Packed",
      },
      {
        label: "SKU",
        value: "ABR-001",
      },
    ],

    tags: [
      "Bubble Roll",
      "Protective Packaging",
      "Fragile Packaging",
      "Cushioning",
    ],

    inStock: true,
    featured: true,
    bestSeller: false,
  },

  {
    id: 8,
    name: "EPE Foam Roll",
    slug: "epe-foam-roll",
    category: "Protective Packaging",
    categorySlug: "protective-packaging",
    sku: "EPE-001",

    price: 1399,
    oldPrice: 1599,
    currency: "INR",

    rating: 4.5,
    reviews: 11,

    badge: "",

    image: "/products/epe-foam-roll.webp",

    images: [
      "/products/epe-foam-roll.webp",
      "/products/epe-foam-roll.webp",
      "/products/epe-foam-roll.webp",
      "/products/epe-foam-roll.webp",
    ],

    shortDescription:
      "Lightweight EPE foam roll providing cushioning and surface protection for products during handling and transportation.",

    description:
      "EPE Foam Roll is a flexible protective material designed to cushion products and provide protection against scratches, abrasion and minor impact. It is suitable for a wide range of industrial, commercial and e-commerce packaging applications.",

    features: [
      "Lightweight and flexible",
      "Excellent cushioning",
      "Protects surfaces from scratches",
      "Easy to cut and wrap",
      "Reusable for multiple applications",
      "Suitable for different product shapes",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "EPE Foam Roll",
      },
      {
        label: "Material",
        value: "Expanded Polyethylene",
      },
      {
        label: "Application",
        value: "Protective Wrapping",
      },
      {
        label: "Protection",
        value: "Scratch & Impact Protection",
      },
      {
        label: "Usage",
        value: "Industrial & Commercial Packaging",
      },
      {
        label: "Structure",
        value: "Closed Cell Foam",
      },
      {
        label: "Form",
        value: "Roll",
      },
      {
        label: "Color",
        value: "White",
      },
      {
        label: "Packaging",
        value: "Roll Packed",
      },
      {
        label: "SKU",
        value: "EPE-001",
      },
    ],

    tags: [
      "EPE Foam",
      "Foam Roll",
      "Protective Packaging",
      "Surface Protection",
    ],

    inStock: true,
    featured: false,
    bestSeller: false,
  },

  {
    id: 9,
    name: "Protective Packaging Film",
    slug: "protective-packaging-film",
    category: "Protective Packaging",
    categorySlug: "protective-packaging",
    sku: "PPF-001",

    price: 899,
    oldPrice: 1099,
    currency: "INR",

    rating: 4.6,
    reviews: 15,

    badge: "",

    image: "/products/protective-film.webp",

    images: [
      "/products/protective-film.webp",
      "/products/protective-film.webp",
      "/products/protective-film.webp",
      "/products/protective-film.webp",
    ],

    shortDescription:
      "Protective packaging film designed to help safeguard product surfaces from dust, scratches and handling damage.",

    description:
      "Protective Packaging Film provides a temporary protective layer over product surfaces during handling, storage and transportation. It helps reduce the risk of scratches, dust and surface damage.",

    features: [
      "Surface protection",
      "Helps prevent scratches",
      "Protects against dust",
      "Lightweight and flexible",
      "Easy application and removal",
      "Suitable for multiple product surfaces",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Protective Film",
      },
      {
        label: "Material",
        value: "Protective Polymer Film",
      },
      {
        label: "Application",
        value: "Surface Protection",
      },
      {
        label: "Protection",
        value: "Dust & Scratch Protection",
      },
      {
        label: "Usage",
        value: "Storage & Transportation",
      },
      {
        label: "Structure",
        value: "Flexible Film",
      },
      {
        label: "Form",
        value: "Roll",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "Packaging",
        value: "Roll Packed",
      },
      {
        label: "SKU",
        value: "PPF-001",
      },
    ],

    tags: [
      "Protective Film",
      "Surface Protection",
      "Packaging Film",
      "Scratch Protection",
    ],

    inStock: true,
    featured: false,
    bestSeller: false,
  },

  {
    id: 10,
    name: "Protective Air Packaging",
    slug: "protective-air-packaging",
    category: "Air Column Packaging",
    categorySlug: "air-column-packaging",
    sku: "PAP-001",

    price: 1599,
    oldPrice: 1899,
    currency: "INR",

    rating: 4.8,
    reviews: 27,

    badge: "Top Rated",

    image: "/Air column bag (2).webp",

    images: [
      "/Air column bag (2).webp",
      "/Air column bag (2).webp",
      "/Air column bag (2).webp",
      "/Air column bag (2).webp",
    ],

    shortDescription:
      "Advanced protective air packaging solution designed to provide reliable cushioning for fragile products.",

    description:
      "Protective Air Packaging provides an air-based cushioning layer around products to help absorb shocks, vibrations and external pressure. It is suitable for fragile goods that require additional protection during transportation.",

    features: [
      "Advanced air cushioning",
      "Excellent impact absorption",
      "Lightweight packaging solution",
      "Helps reduce transit damage",
      "Suitable for fragile products",
      "Easy to use and store",
    ],

    specifications: [
      {
        label: "Product Type",
        value: "Protective Air Packaging",
      },
      {
        label: "Material",
        value: "High Quality PE Film",
      },
      {
        label: "Application",
        value: "Fragile Product Protection",
      },
      {
        label: "Protection",
        value: "Shock, Impact & Vibration",
      },
      {
        label: "Usage",
        value: "Shipping & Transportation",
      },
      {
        label: "Structure",
        value: "Air Cushion",
      },
      {
        label: "Weight",
        value: "Lightweight",
      },
      {
        label: "Color",
        value: "Transparent",
      },
      {
        label: "Packaging",
        value: "Packed",
      },
      {
        label: "SKU",
        value: "PAP-001",
      },
    ],

    tags: [
      "Air Packaging",
      "Protective Packaging",
      "Fragile Product Protection",
      "Cushioning",
    ],

    inStock: true,
    featured: true,
    bestSeller: true,
  },
];

/* =========================================================
   CATEGORY DATA
========================================================= */

export const categories = [
  {
    name: "All Products",
    slug: "all",
  },
  {
    name: "Air Column Packaging",
    slug: "air-column-packaging",
  },
  {
    name: "Dunnage Packaging",
    slug: "dunnage-packaging",
  },
  {
    name: "Packaging Air Bags",
    slug: "packaging-air-bags",
  },
  {
    name: "Protective Packaging",
    slug: "protective-packaging",
  },
  {
    name: "Gap Fillers",
    slug: "gap-fillers",
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

export const getProductBySlug = (slug) => {
  return products.find(
    (product) => product.slug === slug
  );
};

export const getProductById = (id) => {
  return products.find(
    (product) => product.id === Number(id)
  );
};

export const getProductsByCategory = (categorySlug) => {
  if (
    !categorySlug ||
    categorySlug === "all"
  ) {
    return products;
  }

  return products.filter(
    (product) =>
      product.categorySlug === categorySlug
  );
};

export const getFeaturedProducts = () => {
  return products.filter(
    (product) => product.featured
  );
};

export const getBestSellingProducts = () => {
  return products.filter(
    (product) => product.bestSeller
  );
};

export const getRelatedProducts = (
  currentProduct,
  limit = 4
) => {
  if (!currentProduct) {
    return [];
  }

  return products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.categorySlug ===
          currentProduct.categorySlug
    )
    .slice(0, limit);
};

export const searchProducts = (query) => {
  if (!query?.trim()) {
    return products;
  }

  const searchTerm = query
    .toLowerCase()
    .trim();

  return products.filter((product) => {
    return (
      product.name
        .toLowerCase()
        .includes(searchTerm) ||
      product.category
        .toLowerCase()
        .includes(searchTerm) ||
      product.sku
        .toLowerCase()
        .includes(searchTerm) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      )
    );
  });
};

export default products;