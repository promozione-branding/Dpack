import { NextResponse } from "next/server";

export async function POST(request) {
  let fields;
  try {
    fields = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = typeof fields?.name === "string" ? fields.name.trim() : "";
  const phone = typeof fields?.phone === "string" ? fields.phone.trim() : "";
  const email = typeof fields?.email === "string" ? fields.email.trim() : "";
  const product =
    typeof fields?.product === "string" ? fields.product.trim() : "";
  const message =
    typeof fields?.message === "string" ? fields.message.trim() : "";

  if (!name || !email || !/^\d{10}$/.test(phone)) {
    return NextResponse.json(
      { success: false, error: "Please provide a name, valid email, and 10-digit phone number." },
      { status: 400 }
    );
  }

  const supplierToken = process.env.DPACK_SUPPLIER_TOKEN;
  if (!supplierToken) {
    console.error("DPACK_SUPPLIER_TOKEN is not configured.");
    return NextResponse.json(
      { success: false, error: "Enquiry submission is not configured." },
      { status: 500 }
    );
  }

  try {
    const upstreamResponse = await fetch("https://brandbnalo.com/api/form/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "DPACK Popup Form",
        supplierToken,
        platformEmail: "dpacksolutionindia@gmail.com",
        name,
        phone,
        email,
        product,
        message,
        place: "N/A",
      }),
      cache: "no-store",
    });
    const result = await upstreamResponse.json();

    if (!upstreamResponse.ok || !result?.success) {
      console.error("Enquiry service rejected submission:", {
        status: upstreamResponse.status,
        error: result?.error || result?.message,
      });
      return NextResponse.json(
        { success: false, error: "Failed to send. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry service request failed:", error);
    return NextResponse.json(
      { success: false, error: "Enquiry service is unavailable. Please try again later." },
      { status: 502 }
    );
  }
}
