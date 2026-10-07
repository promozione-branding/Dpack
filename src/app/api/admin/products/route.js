import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { requireAdmin, ok, err, parseFormData } from "@/lib/apiHelpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { organizeProductFields } from "@/lib/productContent";

function parseArrayField(value) {
  if (value === undefined || value === "") return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // newline-separated fallback
  }

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseVariants(value) {
  if (value === undefined || value === null || value === "") return [];

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((v) => ({
        size: String(v.size || "").trim(),
        price: Number(v.price),
        compareAtPrice:
          v.compareAtPrice === "" ||
          v.compareAtPrice === undefined ||
          v.compareAtPrice === null
            ? null
            : Number(v.compareAtPrice),
        stock: Number(v.stock ?? 0),
        sku: v.sku ? String(v.sku).trim() : null,
        weight:
          v.weight === "" || v.weight === undefined || v.weight === null
            ? null
            : Number(v.weight),
        isDefault: Boolean(v.isDefault),
      }))
      .filter((v) => v.size && Number.isFinite(v.price) && v.price >= 0);
  } catch {
    return [];
  }
}

function makeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

export async function POST(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectDB();
    const { fields, files } = await parseFormData(request);

    let image = fields.image?.trim() || "";
    let imagePublicId = null;

    if (files.imageFile) {
      const uploaded = await uploadToCloudinary(
        files.imageFile.buffer,
        "dpack/products"
      );
      image = uploaded.url;
      imagePublicId = uploaded.public_id;
    }

    const name = fields.name?.trim() || "";
    const category = fields.category?.trim() || "";
    const description = fields.description?.trim() || "";
    const variants = parseVariants(fields.variants);

    // price: from default variant OR top-level price field
    let price = Number(fields.price);
    if (variants.length > 0) {
      const def =
        variants.find((v) => v.isDefault) || variants[0];
      price = def.price;
    }

    if (
      !name ||
      !category ||
      !description ||
      !image ||
      !Number.isFinite(price)
    ) {
      return err(
        "Product name, category, detailed description, image, and valid price are required."
      );
    }

    const productFields = {
      name,
      slug: fields.slug?.trim() || makeSlug(name),
      category,
      shortDescription: fields.shortDescription?.trim() || "",
      description,
      overview: parseArrayField(fields.overview),
      keyFeatures: parseArrayField(fields.keyFeatures),
      applications: parseArrayField(fields.applications),
      specs: parseArrayField(fields.specs),
      variants,
      sizes: parseArrayField(fields.sizes), // optional; schema syncs from variants
      image,
      imagePublicId,
      extraImages: parseArrayField(fields.extraImages),
      extraImagePublicIds: parseArrayField(fields.extraImagePublicIds),
      youtubeUrl: fields.youtubeUrl?.trim() || null,
      instagramUrl: fields.instagramUrl?.trim() || null,
      price,
      compareAtPrice:
        fields.compareAtPrice === "" || fields.compareAtPrice === undefined
          ? null
          : Number(fields.compareAtPrice),
      stock: Number(fields.stock || 0),
      lowStockThreshold: Number(fields.lowStockThreshold || 10),
      trackInventory: fields.trackInventory === "true",
      featured: fields.featured === "true",
      isActive: fields.isActive !== "false",
      weight:
        fields.weight === "" || fields.weight === undefined
          ? null
          : Number(fields.weight),
      length:
        fields.length === "" || fields.length === undefined
          ? null
          : Number(fields.length),
      breadth:
        fields.breadth === "" || fields.breadth === undefined
          ? null
          : Number(fields.breadth),
      height:
        fields.height === "" || fields.height === undefined
          ? null
          : Number(fields.height),
      metaTitle: fields.metaTitle?.trim() || "",
      metaDescription: fields.metaDescription?.trim() || "",
    };

    Object.assign(productFields, organizeProductFields(productFields));

    const product = await Product.create(productFields);

    return ok({ product }, 201);
  } catch (error) {
    console.error("ADMIN PRODUCT CREATE ERROR:", error);
    if (error.code === 11000) {
      return err("A product with this slug already exists.", 409);
    }
    return err("Failed to create product", 500);
  }
}