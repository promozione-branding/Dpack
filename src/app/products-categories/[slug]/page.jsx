import ProductsClient from "@/app/products/ProductsClient";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

export default async function ProductsCategoryPage({ params }) {
  const { slug } = await params;

  const normalizedSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase();

  await connectDB();

  const category = await Category.findOne({
    slug: normalizedSlug,
  }).lean();

  if (!category) {
    notFound();
  }

  return (
    <ProductsClient
      key={String(category._id)}
      initialCategory={category.name}
    />
  );
}