
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const fields = await request.json();

    const name = String(fields?.name || "").trim();
    const phone = String(fields?.phone || "").replace(/\D/g, "");
    const company = String(fields?.company || "").trim();
    const place = String(fields?.place || "").trim();
    const product = String(fields?.product || "").trim();
    const message = String(fields?.message || "").trim();
    const email = String(fields?.email || "").trim();

    // Normalize Indian phone numbers
    const normalizedPhone =
      phone.length === 12 && phone.startsWith("91")
        ? phone.slice(2)
        : phone;

    if (!name || !/^\d{10}$/.test(normalizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your name and a valid 10-digit phone number.",
        },
        { status: 400 }
      );
    }

    const supplierToken = process.env.DPACK_SUPPLIER_TOKEN;

    if (!supplierToken) {
      console.error("DPACK_SUPPLIER_TOKEN is not configured.");

      return NextResponse.json(
        {
          success: false,
          error: "Enquiry submission is not configured.",
        },
        { status: 500 }
      );
    }

    const upstreamResponse = await fetch(
      "https://brandbnalo.com/api/form/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "DPACK Bulk Enquiry Form",
          supplierToken,
          platformEmail: "dpacksolutionindia@gmail.com",
          name,
          phone: normalizedPhone,
          email,
          company,
          place,
          product,
          message,
        }),
        cache: "no-store",
      }
    );

    const result = await upstreamResponse.json();

    if (!upstreamResponse.ok || !result?.success) {
      console.error("Enquiry service rejected submission:", {
        status: upstreamResponse.status,
        error: result?.error || result?.message,
      });

      return NextResponse.json(
        {
          success: false,
          error: result?.error || "Failed to send enquiry. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Bulk enquiry submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
