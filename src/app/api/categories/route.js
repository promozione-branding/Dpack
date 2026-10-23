import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";
import Category from "@/lib/models/Category";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})
      .select("name slug image")
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      categories: categories.map((category) => ({
        _id: String(category._id),
        name: category.name,
        slug: category.slug,
        image: category.image || "",
      })),
    });
  } catch (error) {
    console.error("GET /api/categories error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to load categories." },
      { status: 500 }
    );
  }
}