import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { organizeProductFields } from "@/lib/productContent";

export const runtime = "nodejs";



function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(value);
      value = "";

      if (row.some((cell) => String(cell).trim() !== "")) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    value += char;
  }

  if (value !== "" || row.length > 0) {
    row.push(value);

    if (row.some((cell) => String(cell).trim() !== "")) {
      rows.push(row);
    }
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) =>
    String(header)
      .replace(/^\uFEFF/, "")
      .trim()
  );

  return rows.slice(1).map((cells) => {
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = cells[index] ?? "";
    });

    return obj;
  });
}

/* =========================================================
   HELPERS
========================================================= */

const ARRAY_FIELDS = [
  "overview",
  "keyFeatures",
  "applications",
  "specs",
  "sizes",
  "extraImages",
  "extraImagePublicIds",
];

const BOOLEAN_FIELDS = [
  "featured",
  "trackInventory",
  "isActive",
];

const NUMBER_FIELDS = [
  "price",
  "compareAtPrice",
  "stock",
  "lowStockThreshold",
  "weight",
  "length",
  "breadth",
  "height",
];

const STRING_FIELDS = [
  "slug",
  "name",
  "category",
  "shortDescription",
  "description",
  "image",
  "imagePublicId",
  "youtubeUrl",
  "instagramUrl",
  "metaTitle",
  "metaDescription",
];

const ALL_FIELDS = [
  ...STRING_FIELDS,
  ...ARRAY_FIELDS,
  ...BOOLEAN_FIELDS,
  ...NUMBER_FIELDS,
];

function cleanString(value) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return null;
  }

  return String(value).trim();
}

/* =========================================================
   ARRAY PARSER

   Supports:
   1. JSON:
      ["One","Two"]

   2. Pipe:
      One | Two

   3. Comma fallback
========================================================= */

function parseArray(value) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return [];
  }

  const text = String(value).trim();

  // JSON array
  if (text.startsWith("[") && text.endsWith("]")) {
    try {
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item).trim())
          .filter(Boolean);
      }
    } catch {
      // Continue with pipe separator
    }
  }

  // Pipe separated
  if (text.includes("|")) {
    return text
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [text];
}

/* =========================================================
   BOOLEAN PARSER
========================================================= */

function parseBoolean(value, defaultValue = false) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return defaultValue;
  }

  const normalized = String(value)
    .trim()
    .toLowerCase();

  if (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "y"
  ) {
    return true;
  }

  if (
    normalized === "false" ||
    normalized === "0" ||
    normalized === "no" ||
    normalized === "n"
  ) {
    return false;
  }

  return defaultValue;
}

/* =========================================================
   NUMBER PARSER
========================================================= */

function parseNumber(value, defaultValue = null) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return defaultValue;
  }

  const cleaned = String(value)
    .trim()
    .replace(/,/g, "");

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : defaultValue;
}

/* =========================================================
   SLUG GENERATOR
========================================================= */

function makeSlug(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* =========================================================
   NORMALIZE PRODUCT
========================================================= */

function normalizeProduct(row) {
  const name = cleanString(row.name);

  let slug = cleanString(row.slug);

  if (!slug && name) {
    slug = makeSlug(name);
  }

  const product = {
    slug,
    name,
    category: cleanString(row.category),
    shortDescription: cleanString(row.shortDescription) || "",
    description: cleanString(row.description),

    overview: parseArray(row.overview),
    keyFeatures: parseArray(row.keyFeatures),
    applications: parseArray(row.applications),
    specs: parseArray(row.specs),
    sizes: parseArray(row.sizes),

    image: cleanString(row.image),

    imagePublicId: cleanString(row.imagePublicId),

    extraImages: parseArray(row.extraImages),
    extraImagePublicIds: parseArray(row.extraImagePublicIds),

    youtubeUrl: cleanString(row.youtubeUrl),
    instagramUrl: cleanString(row.instagramUrl),

    price: parseNumber(row.price, 0),

    compareAtPrice: parseNumber(
      row.compareAtPrice,
      null
    ),

    featured: parseBoolean(row.featured, false),

    stock: parseNumber(row.stock, 0),

    lowStockThreshold: parseNumber(
      row.lowStockThreshold,
      10
    ),

    trackInventory: parseBoolean(
      row.trackInventory,
      true
    ),

    weight: parseNumber(row.weight, null),
    length: parseNumber(row.length, null),
    breadth: parseNumber(row.breadth, null),
    height: parseNumber(row.height, null),

    metaTitle: cleanString(row.metaTitle) || "",
    metaDescription:
      cleanString(row.metaDescription) || "",

    isActive: parseBoolean(row.isActive, true),
  };

  Object.assign(product, organizeProductFields(product));

  return product;
}

/* =========================================================
   POST
========================================================= */

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "CSV file is required",
        },
        { status: 400 }
      );
    }

    const filename = String(file.name || "");

    if (!filename.toLowerCase().endsWith(".csv")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only CSV files are allowed",
        },
        { status: 400 }
      );
    }

    const text = await file.text();

    if (!text.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "CSV file is empty",
        },
        { status: 400 }
      );
    }

    const rows = parseCSV(text);

    if (!rows.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No products found in CSV",
        },
        { status: 400 }
      );
    }

    let created = 0;
    let updated = 0;
    let skipped = 0;

    const errors = [];

    /* =====================================================
       PROCESS EVERY PRODUCT
    ===================================================== */

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const csvRowNumber = i + 2;

      try {
        const product = normalizeProduct(row);

        /* -----------------------------------------------
           REQUIRED FIELDS
        ------------------------------------------------ */

        if (!product.name) {
          throw new Error("Product name is required");
        }

        if (!product.slug) {
          throw new Error("Product slug is required");
        }

        if (!product.category) {
          throw new Error("Product category is required");
        }

        if (!product.description) {
          throw new Error("Product description is required");
        }

        if (!product.image) {
          throw new Error("Product image is required");
        }

        if (
          product.price === null ||
          product.price === undefined
        ) {
          throw new Error("Product price is required");
        }

        /* -----------------------------------------------
           REMOVE UNDEFINED VALUES
        ------------------------------------------------ */

        Object.keys(product).forEach((key) => {
          if (product[key] === undefined) {
            delete product[key];
          }
        });

        /* -----------------------------------------------
           IMPORTANT

           Using findOneAndUpdate + upsert means:

           - Existing slug = UPDATE
           - New slug = CREATE
           - No Product.save()
           - No Product.create()
           - No validate middleware
           - No "next is not a function"
        ------------------------------------------------ */

        const existing = await Product.findOne({
          slug: product.slug,
        })
          .select("_id")
          .lean();

        if (existing) {
          await Product.updateOne(
            { _id: existing._id },
            {
              $set: product,
            },
            {
              runValidators: true,
            }
          );

          updated++;
        } else {
          await Product.collection.insertOne({
            ...product,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          created++;
        }
      } catch (error) {
        skipped++;

        errors.push({
          row: csvRowNumber,
          slug: row.slug || "",
          message:
            error?.message ||
            "Unknown import error",
        });
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      message: "CSV import completed",

      summary: {
        totalRows: rows.length,
        created,
        updated,
        skipped,
      },

      errors,
    });
  } catch (error) {
    console.error("CSV IMPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "CSV import failed",
      },
      { status: 500 }
    );
  }
}