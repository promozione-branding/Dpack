import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { ok, err } from "@/lib/apiHelpers";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        parseInt(searchParams.get("limit") || "50", 10) || 50
      )
    );

    const query = {
      isActive: true,
    };

    /*
     * CATEGORY FILTER
     *
     * Supports:
     * category: "Dunnage Bag"
     *
     * and products having:
     * category: ["Dunnage Bag", "Belts"]
     */
    if (category && category !== "All") {
      query.category = category;
    }

    /*
     * FEATURED FILTER
     */
    if (featured === "true") {
      query.featured = true;
    }

    /*
     * SEARCH
     */
    if (search?.trim()) {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      query.$or = [
        {
          name: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          category: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          description: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
      ];
    }

    const [total, products, categoryValues] = await Promise.all([
      Product.countDocuments(query),

      Product.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Product.distinct("category", {
        isActive: true,
      }),
    ]);

    /*
     * Since category can now be:
     *
     * "Dunnage Bag"
     *
     * OR
     *
     * ["Dunnage Bag", "Belts"]
     *
     * flatten all categories for frontend.
     */
    const categoryNames = [
      ...new Set(
        categoryValues
          .flatMap((item) => {
            if (Array.isArray(item)) {
              return item;
            }

            if (typeof item === "string") {
              return [item];
            }

            return [];
          })
          .map((item) => String(item).trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    return ok({
      products,
      categories: categoryNames,
      total,
      page,
      limit,
    });
  } catch (e) {
    console.error("GET Products Error:", e);

    if (!process.env.MONGODB_URI) {
      return err(
        "Product database is not configured. Set MONGODB_URI in .env.local and restart the server.",
        503
      );
    }

    return err("Failed to fetch products", 500);
  }
}