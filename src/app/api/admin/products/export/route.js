import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { requireAdmin } from "@/lib/apiHelpers";
import { escapeCSV, PRODUCT_CSV_FIELDS } from "@/lib/productCsv";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    await connectDB();

    const products =
      await Product.find({})
        .sort({ createdAt: -1 })
        .lean();

    const header = PRODUCT_CSV_FIELDS.join(",");

    const rows = products.map((product) => {
      return PRODUCT_CSV_FIELDS.map((field) =>
        escapeCSV(product[field])
      ).join(",");
    });

    const csv = [
      header,
      ...rows,
    ].join("\r\n");

    return new Response(
      "\uFEFF" + csv,
      {
        status: 200,
        headers: {
          "Content-Type":
            "text/csv; charset=utf-8",

          "Content-Disposition":
            `attachment; filename="dpack-products-${new Date()
              .toISOString()
              .slice(0, 10)}.csv"`,

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "CSV EXPORT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "CSV export failed",
      },
      { status: 500 }
    );
  }
}