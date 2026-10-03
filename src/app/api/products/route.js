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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10) || 50));

    const query = { isActive: true };
    if (category && category !== "All") query.category = category;
    if (featured === "true") query.featured = true;
    if (search?.trim()) {
      const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { category: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const [total, products, categoryNames] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.distinct("category", { isActive: true }),
    ]);

    return ok({ products, categories: categoryNames.sort(), total, page, limit });
  } catch (e) {
    console.error(e);
    return err("Failed to fetch products", 500);
  }
}
