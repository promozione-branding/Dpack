import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    // ---------------------------------------------------------
    // BASE QUERY
    // ---------------------------------------------------------

    const query = {
      isActive: true,
    };

    // ---------------------------------------------------------
    // SEARCH
    // ---------------------------------------------------------

    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          category: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          slug: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // ---------------------------------------------------------
    // CATEGORY FILTER
    // ---------------------------------------------------------

    if (category.trim()) {
      query.category = category.trim();
    }

    // ---------------------------------------------------------
    // FEATURED FILTER
    // ---------------------------------------------------------

    if (featured === "true") {
      query.featured = true;
    }

    // ---------------------------------------------------------
    // FETCH PRODUCTS
    // ---------------------------------------------------------

    const products = await Product.find(query)
      .sort({
        createdAt: -1,
      })
      .limit(Math.min(limit, 200))
      .lean();

    // ---------------------------------------------------------
    // CATEGORY LIST
    // ---------------------------------------------------------

    const categories = await Product.distinct("category", {
      isActive: true,
      category: {
        $exists: true,
        $ne: "",
      },
    });

    // ---------------------------------------------------------
    // TOTAL COUNT
    // ---------------------------------------------------------

    const total = await Product.countDocuments(query);

    // ---------------------------------------------------------
    // RESPONSE
    // ---------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        products,
        categories,
        total,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("PUBLIC PRODUCTS API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        products: [],
        categories: [],
        total: 0,
      },
      {
        status: 500,
      }
    );
  }
}