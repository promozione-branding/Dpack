import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import ProductClient from "./ProductClient";

const SITE_URL = "https://dpackshop.com";

async function getProduct(slug) {
  await connectDB();

  const product = await Product.findOne({
    slug,
    isActive: true,
  })
    .select(
      "name slug metaTitle metaDescription shortDescription description image extraImages price stock variants"
    )
    .lean();

  return product;
}

function plainText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | DPACK",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    product.metaTitle?.trim() ||
    `${product.name} | DPACK`;

  const description =
    product.metaDescription?.trim() ||
    plainText(product.shortDescription || product.description).slice(0, 160);

  const url = `${SITE_URL}/products/${encodeURIComponent(product.slug)}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "DPACK",
      type: "website",
      images: product.image
        ? [
          {
            url: product.image,
            alt: product.name,
          },
        ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductClient params={params} />;
}