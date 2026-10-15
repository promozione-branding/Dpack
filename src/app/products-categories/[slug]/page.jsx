import ProductsClient from "@/app/products/ProductsClient";

const categoryNames = {
  "dunnage-bag": "Dunnage Bags",
  "dunnage-bags": "Dunnage Bags",
  "air-column-bag": "Air Column Bags",
  "air-column-bags": "Air Column Bags",
  "air-column-roll": "Air Column Roll",
  "air-column-rolls": "Air Column Roll",
  "gap-filler": "Gap Filler",
  "gap-fillers": "Gap Filler",
  "packaging-air-bag": "Packaging Air Bags",
  "packaging-air-bags": "Packaging Air Bags",
};

export default async function ProductsCategoryPage({ params }) {
  const { slug } = await params;
  const normalizedSlug = String(slug || "").trim().toLowerCase();
  const fallbackSlug = normalizedSlug.endsWith("s")
    ? normalizedSlug.slice(0, -1)
    : normalizedSlug;

  const initialCategory =
    categoryNames[normalizedSlug] ||
    categoryNames[fallbackSlug] ||
    normalizedSlug.replace(/-/g, " ");

  return <ProductsClient initialCategory={initialCategory} />;
}
