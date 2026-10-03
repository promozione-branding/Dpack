import { uploadToCloudinary } from "./cloudinary";

const ARRAY_FIELDS = ["overview", "keyFeatures", "applications", "specs", "sizes", "extraImages"];
const BOOLEAN_FIELDS = ["featured", "trackInventory", "isActive"];

export class ProductInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProductInputError";
    this.status = 400;
  }
}

function parseArray(value, field) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) return parsed;
  } catch {
    // Accept newline-delimited values from non-admin clients too.
  }
  if (typeof value === "string") return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  throw new ProductInputError(`${field} must be a list of text values.`);
}

function parseBoolean(value, field) {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  throw new ProductInputError(`${field} must be true or false.`);
}

function parseNumber(value, field, { optional = false, integer = false } = {}) {
  if (optional && (value === "" || value == null)) return null;
  if (value === "" || value == null) {
    throw new ProductInputError(`${field} is required.`);
  }
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || (integer && !Number.isInteger(number))) {
    throw new ProductInputError(`${field} must be a valid non-negative ${integer ? "integer" : "number"}.`);
  }
  return number;
}

export async function buildProductData(formData, currentProduct = null) {
  const read = (field) => formData.get(field);
  const name = String(read("name") || "").trim();
  const category = String(read("category") || "").trim();
  const description = String(read("description") || "").trim();

  if (!name || !category || !description) {
    throw new ProductInputError("Name, category, and description are required.");
  }

  const imageFile = read("imageFile");
  let image = String(read("image") || currentProduct?.image || "").trim();
  let imagePublicId = currentProduct?.imagePublicId;

  if (imageFile && typeof imageFile.arrayBuffer === "function" && imageFile.size > 0) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(imageFile.type)) {
      throw new ProductInputError("Product images must be JPEG, PNG, or WebP.");
    }
    if (imageFile.size > 10 * 1024 * 1024) {
      throw new ProductInputError("Product images must be 10 MB or smaller.");
    }
    const uploaded = await uploadToCloudinary(
      Buffer.from(await imageFile.arrayBuffer()),
      "dpack/products",
      imageFile.type
    );
    image = uploaded.url;
    imagePublicId = uploaded.public_id;
  } else if (currentProduct && image !== currentProduct.image) {
    imagePublicId = undefined;
  }

  if (!image) throw new ProductInputError("A product image URL or uploaded image is required.");

  const values = {
    slug: String(read("slug") || "").trim(),
    name,
    category,
    description,
    image,
    imagePublicId,
    price: parseNumber(read("price"), "Price"),
    compareAtPrice: parseNumber(read("compareAtPrice"), "Compare-at price", { optional: true }),
    stock: parseNumber(read("stock") ?? currentProduct?.stock ?? 0, "Stock", { integer: true }),
    lowStockThreshold: parseNumber(read("lowStockThreshold") ?? currentProduct?.lowStockThreshold ?? 10, "Low-stock threshold", { integer: true }),
    youtubeUrl: String(read("youtubeUrl") || "").trim() || null,
    instagramUrl: String(read("instagramUrl") || "").trim() || null,
    metaTitle: String(read("metaTitle") || "").trim(),
    metaDescription: String(read("metaDescription") || "").trim(),
  };

  for (const field of ARRAY_FIELDS) values[field] = parseArray(read(field), field);
  for (const field of BOOLEAN_FIELDS) {
    const value = read(field);
    values[field] = value == null && currentProduct
      ? currentProduct[field]
      : parseBoolean(value ?? (field === "isActive" || field === "trackInventory" ? "true" : "false"), field);
  }

  return values;
}
