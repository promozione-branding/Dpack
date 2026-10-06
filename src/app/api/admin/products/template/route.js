import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiHelpers";
import { PRODUCT_CSV_FIELDS } from "@/lib/productCsv";

export const runtime = "nodejs";

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  return new Response(
    "\uFEFF" + PRODUCT_CSV_FIELDS.join(","),
    {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="dpack-products-template.csv"',
        "Cache-Control": "no-store",
      },
    }
  );
}
