import ProductsClient from "@/app/products/ProductsClient";
import { notFound } from "next/navigation";


const categoryNames = {
  "air-column-bag": "Air Column Bags",
  "air-column-bags": "Air Column Bags",
  "air-column-roll": "Air Column Rolls",
  "air-column-rolls": "Air Column Rolls",
  "dunnage-bag": "Dunnage Bags",
  "dunnage-bags": "Dunnage Bags",
  "gap-filler": "Gap Fillers",
  "gap-fillers": "Gap Fillers",
  "packaging-air-bag": "Packaging Air Bags",
  "packaging-air-bags": "Packaging Air Bags",
};


export default async function ProductsCategoryPage({ params }) {
  const { slug } = await params;
  const normalizedSlug = String(slug || "")
    .trim()
    .toLowerCase();

  const initialCategory = categoryNames[normalizedSlug];

  if (!initialCategory) {
    notFound();
  }

  return <ProductsClient initialCategory={initialCategory} />;
}
