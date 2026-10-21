
import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { ok, err } from "@/lib/apiHelpers";

export const dynamic = "force-dynamic";

function createSlug(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    await connectDB();

    const productNames = await Product.distinct("category", {
      isActive: true,
    });

    const categoryDocs = await Category.find({}).lean();

    const categoryMap = new Map();

    for (const name of productNames) {
      if (!name || name === "All") continue;

      categoryMap.set(name, {
        name,
        slug: createSlug(name),
        image: "",
      });
    }

    for (const category of categoryDocs) {
      if (!category.name || category.name === "All") continue;

      categoryMap.set(category.name, {
        name: category.name,
        slug: category.slug || createSlug(category.name),
        image: category.image || "",
      });
    }

    const categories = Array.from(categoryMap.values()).sort(
      (a, b) => a.name.localeCompare(b.name)
    );

    return ok({
      categories: [
        { name: "All", slug: "", image: "" },
        ...categories,
      ],
      categoryImages: Object.fromEntries(
        categories
          .filter((category) => category.image)
          .map((category) => [category.name, category.image])
      ),
    });
  } catch (e) {
    console.error("Categories API error:", e);
    return err("Failed to fetch categories", 500);
  }
}
