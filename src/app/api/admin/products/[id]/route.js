import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { requireAdmin, ok, err, parseFormData } from "@/lib/apiHelpers";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return err("Product not found", 404);
  return ok({ product });
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id);
    if (!product) return err("Product not found", 404);

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const { fields, files } = await parseFormData(request);

      if (files.imageFile) {
        const { url, public_id } = await uploadToCloudinary(
          files.imageFile.buffer,
          "dpack/products"
        );
        if (product.imagePublicId) {
          await deleteFromCloudinary(product.imagePublicId);
        }
        product.image = url;
        product.imagePublicId = public_id;
      } else if (fields.image !== undefined && fields.image.trim()) {
        product.image = fields.image.trim();
      }

      for (let i = 0; i < 10; i++) {
        const key = `extraImage_${i}`;
        if (files[key]) {
          const res = await uploadToCloudinary(files[key].buffer, "dpack/products");
          product.extraImages = product.extraImages || [];
          product.extraImagePublicIds = product.extraImagePublicIds || [];
          product.extraImages.push(res.url);
          product.extraImagePublicIds.push(res.public_id);
        }
      }

      const parseArrayField = (value) => {
        if (value === undefined) return undefined;
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
          // Support newline-separated values from older form submissions.
        }
        return value.split("\n").map((item) => item.trim()).filter(Boolean);
      };

      if (fields.youtubeUrl !== undefined) {
        product.youtubeUrl = fields.youtubeUrl.trim() || null;
      }
      if (fields.instagramUrl !== undefined) {
        product.instagramUrl = fields.instagramUrl.trim() || null;
      }

      for (const field of [
        "overview",
        "keyFeatures",
        "applications",
        "specs",
        "sizes",
      ]) {
        const value = parseArrayField(fields[field]);
        if (value !== undefined) product[field] = value;
      }

      if (fields.extraImages !== undefined) {
        const extraImages = parseArrayField(fields.extraImages);
        const existingIdsByUrl = new Map(
          (product.extraImages || []).map((url, index) => [
            url,
            product.extraImagePublicIds?.[index],
          ])
        );
        product.extraImages = extraImages;
        product.extraImagePublicIds = extraImages.map(
          (url) => existingIdsByUrl.get(url) || ""
        );
      }

      for (const field of [
        "name",
        "slug",
        "category",
        "description",
        "metaTitle",
        "metaDescription",
      ]) {
        if (fields[field] !== undefined) {
          product[field] = fields[field];
        }
      }

      for (const field of ["price", "stock", "lowStockThreshold"]) {
        if (fields[field] !== undefined && fields[field] !== "") {
          product[field] = Number(fields[field]);
        }
      }

      if (fields.compareAtPrice !== undefined) {
        product.compareAtPrice =
          fields.compareAtPrice === ""
            ? null
            : Number(fields.compareAtPrice);
      }

      for (const field of ["featured", "trackInventory", "isActive"]) {
        if (fields[field] !== undefined) {
          product[field] = fields[field] === "true";
        }
      }
    } else {
      const body = await request.json();
      Object.assign(product, body);
    }

    await product.save();
    return ok({ product });
  } catch (e) {
    console.error(e);
    return err("Failed to update product", 500);
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id);
    if (!product) return err("Product not found", 404);

    if (product.imagePublicId) {
      await deleteFromCloudinary(product.imagePublicId);
    }
    for (const pid of product.extraImagePublicIds || []) {
      await deleteFromCloudinary(pid);
    }
    await product.deleteOne();
    return ok({ message: "Product deleted" });
  } catch (e) {
    console.error(e);
    return err("Failed to delete product", 500);
  }
}