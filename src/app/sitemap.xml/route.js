import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export const dynamic = "force-dynamic";

const SITE_URL = "https://dpackshop.com";

const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/products", priority: "0.9" },
  { path: "/about-us", priority: "0.7" },
  { path: "/contact-us", priority: "0.7" },
  { path: "/privacy-policy", priority: "0.5" },
  { path: "/return-and-refund-policy", priority: "0.5" },
  { path: "/shipping-and-cancellations", priority: "0.5" },
  { path: "/terms-and-conditions", priority: "0.5" },
];

function toCategorySlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIsoDate(value) {
  if (!value) return "";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function urlEntry({ path, lastModified, priority = "0.7", changeFrequency }) {
  const lastmod = toIsoDate(lastModified);

  return [
    "  <url>",
    `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    changeFrequency
      ? `    <changefreq>${escapeXml(changeFrequency)}</changefreq>`
      : "",
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  const entries = staticPages.map((page) =>
    urlEntry({
      ...page,
      changeFrequency: page.path === "/" ? "daily" : "weekly",
    })
  );

  try {
    await connectDB();

    const [categories, products] = await Promise.all([
      Category.find({}).select("name slug updatedAt").lean(),
      Product.find({ isActive: true })
        .select("slug updatedAt category")
        .lean(),
    ]);

    const categorySlugs = new Map();

    categories.forEach((category) => {
      const slug = category.slug || toCategorySlug(category.name);
      if (slug) categorySlugs.set(slug, category.updatedAt);
    });

    products.forEach((product) => {
      const productCategories = Array.isArray(product.category)
        ? product.category
        : [product.category];

      productCategories.forEach((categoryName) => {
        const slug = toCategorySlug(categoryName);
        if (slug && !categorySlugs.has(slug)) {
          categorySlugs.set(slug, null);
        }
      });
    });

    categorySlugs.forEach((lastModified, slug) => {
      entries.push(
        urlEntry({
          path: `/products-categories/${encodeURIComponent(slug)}`,
          lastModified,
          priority: "0.8",
          changeFrequency: "weekly",
        })
      );
    });

    products.forEach((product) => {
      if (!product.slug) return;

      entries.push(
        urlEntry({
          path: `/products/${encodeURIComponent(product.slug)}`,
          lastModified: product.updatedAt,
          priority: "0.8",
          changeFrequency: "weekly",
        })
      );
    });
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}