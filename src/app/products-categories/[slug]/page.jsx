
// import ProductsClient from "@/app/products/ProductsClient";
// import { notFound } from "next/navigation";

// const categoryNames = {
//   "air-column-bag": "Air Column Bags",
//   "air-bubble-tube-rolls": "Air Bubble Tube Rolls",
//   "air-column-bags": "Air Column Bags",

//   "air-column-roll": "Air Column Rolls",
//   "air-column-rolls": "Air Column Rolls",

//   "dunnage-bag": "Dunnage Bags",
//   "dunnage-bags": "Dunnage Bags",

//   "gap-filler": "Gap Fillers",
//   "gap-fillers": "Gap Fillers",

//   "packaging-air-bag": "Packaging Air Bags",
//   "packaging-air-bags": "Packaging Air Bags",

//   // Air Bubble Tube
//   "air-bubble-tube": "Air Bubble Tube",
//   "air-bubble-tubes": "Air Bubble Tube",
// };

import ProductsClient from "@/app/products/ProductsClient";
import { notFound } from "next/navigation";

async function getCategories() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    console.log(baseUrl)

    const response = await fetch(
      `${baseUrl}/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // API response ke possible formats
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.categories)) {
      return data.categories;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Categories API error:", error);
    return [];
  }
}

export default async function ProductsCategoryPage({ params }) {
  const { slug } = await params;

  const normalizedSlug = String(slug || "")

  const categories = await getCategories();
  console.log(categories)
  const matchedCategory = categories?.find((category) => {
    const categorySlug = String(category?.slug || "")

    return categorySlug === normalizedSlug;
  });

  // if (!matchedCategory) {
  //   notFound();
  // }

  return (
    <ProductsClient
      key={normalizedSlug}
      initialCategory={matchedCategory?.name}
    />
  );
}
