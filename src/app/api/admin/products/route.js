import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { requireAdmin, ok, err } from "@/lib/apiHelpers";

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(
      1,
      Number.parseInt(searchParams.get("page") || "1", 10) || 1
    );
    const limit = Math.min(
      200,
      Math.max(
        1,
        Number.parseInt(searchParams.get("limit") || "12", 10) || 12
      )
    );
    const search = searchParams.get("search")?.trim() || "";
    const query = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { category: { $regex: escapedSearch, $options: "i" } },
        { slug: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return ok({ products, total, page, limit });
  } catch (error) {
    console.error("ADMIN PRODUCTS API ERROR:", error);
    return err("Failed to fetch products", 500);
  }
}
