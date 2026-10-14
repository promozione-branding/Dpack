import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { requireAdmin, ok, err, parseFormData } from "@/lib/apiHelpers";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

function buildSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  await connectDB();
  const [productNames, productCounts, docs] = await Promise.all([
    Product.distinct("category", {
      category: { $type: "string", $ne: "" },
    }),
    Product.aggregate([
      { $match: { category: { $type: "string", $ne: "" } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]),
    Category.find({}).lean(),
  ]);
  const countsByName = Object.fromEntries(
    productCounts.map(({ _id, count }) => [_id, count])
  );
  const byName = Object.fromEntries(docs.map((d) => [d.name, d]));

  const allNames = Array.from(new Set([...productNames, ...docs.map((d) => d.name)])).sort();

  const categories = allNames.map((name) => ({
    name,
    slug: byName[name]?.slug || buildSlug(name),
    image: byName[name]?.image || null,
    productCount: countsByName[name] || 0,
    inUse: (countsByName[name] || 0) > 0,
  }));

  return ok({ categories });
}

export async function POST(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectDB();
    const { fields, files } = await parseFormData(request);
    const name = fields.name?.trim();
    if (!name) return err("Category name is required");
    const slug = buildSlug(name);
    if (!slug) return err("Category name must include letters or numbers");

    const existing = await Category.findOne({ name });
    if (!existing && !files.image) {
      const category = await Category.create({ name, slug });
      return ok({ category }, 201);
    }

    if (!files.image) {
      return ok({ category: existing });
    }

    if (existing?.imagePublicId) {
      await deleteFromCloudinary(existing.imagePublicId);
    }

    const { url, public_id } = await uploadToCloudinary(
      files.image.buffer,
      "dpack/categories",
      files.image.type || "image/jpeg"
    );

    const category = await Category.findOneAndUpdate(
      { name },
      { name, slug, image: url, imagePublicId: public_id },
      { upsert: true, new: true }
    );

    return ok({ category });
  } catch (e) {
    console.error(e);
    if (e.code === 11000) return err("A category with this name already exists");
    return err("Failed to save category", 500);
  }
}

export async function PATCH(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  let uploadedImage;
  let categorySaved = false;
  try {
    await connectDB();
    const { fields, files } = await parseFormData(request);
    const oldName = fields.oldName?.trim();
    const name = fields.name?.trim();
    if (!oldName || !name) return err("Current and new category names are required");

    const slug = buildSlug(name);
    if (!slug) return err("Category name must include letters or numbers");

    const existing = await Category.findOne({ name: oldName });
    const categoryId = existing?._id;
    const duplicateName = await Category.findOne({
      name,
      ...(categoryId ? { _id: { $ne: categoryId } } : {}),
    });
    if (duplicateName) return err("A category with this name already exists", 409);

    const duplicateSlug = await Category.findOne({
      slug,
      ...(categoryId ? { _id: { $ne: categoryId } } : {}),
    });
    if (duplicateSlug) return err("A category with this URL slug already exists", 409);

    const previousImagePublicId = existing?.imagePublicId;
    if (files.image) {
      uploadedImage = await uploadToCloudinary(
        files.image.buffer,
        "dpack/categories",
        files.image.type || "image/jpeg"
      );
    }

    const updatedProducts =
      oldName === name
        ? null
        : await Product.updateMany(
            { category: oldName },
            { $set: { category: name } }
          );

    let category;
    try {
      if (existing) {
        existing.name = name;
        existing.slug = slug;
        if (uploadedImage) {
          existing.image = uploadedImage.url;
          existing.imagePublicId = uploadedImage.public_id;
        }
        category = await existing.save();
      } else {
        category = await Category.create({
          name,
          slug,
          ...(uploadedImage
            ? {
                image: uploadedImage.url,
                imagePublicId: uploadedImage.public_id,
              }
            : {}),
        });
      }
      categorySaved = true;
    } catch (saveError) {
      if (updatedProducts?.modifiedCount) {
        await Product.updateMany(
          { category: name },
          { $set: { category: oldName } }
        );
      }
      throw saveError;
    }

    let warning;
    if (uploadedImage && previousImagePublicId) {
      try {
        await deleteFromCloudinary(previousImagePublicId);
      } catch (cleanupError) {
        console.error("Failed to remove replaced category image", cleanupError);
        warning = "Category updated, but the previous image could not be removed from storage.";
      }
    }

    return ok({ category, ...(warning ? { warning } : {}) });
  } catch (e) {
    if (uploadedImage?.public_id && !categorySaved) {
      try {
        await deleteFromCloudinary(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up uploaded category image", cleanupError);
      }
    }
    console.error(e);
    if (e.code === 11000) return err("A category with this name or URL slug already exists", 409);
    return err("Failed to update category", 500);
  }
}


export async function DELETE(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return err("Invalid request body");
    }
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const action = body?.action;
    if (!name) return err("Category name is required");
    if (action !== "removeImage" && action !== "delete") {
      return err("A valid category action is required");
    }

    await connectDB();
    const existing = await Category.findOne({ name });
    if (existing?.imagePublicId) {
      await deleteFromCloudinary(existing.imagePublicId);
    }

    if (action === "removeImage") {
      if (existing) {
        existing.image = undefined;
        existing.imagePublicId = undefined;
        await existing.save();
      }
      return ok({ message: "Category image removed" });
    }

    const products = await Product.find({ category: name })
      .select("imagePublicId extraImagePublicIds")
      .lean();
    for (const product of products) {
      if (product.imagePublicId) {
        await deleteFromCloudinary(product.imagePublicId);
      }
      for (const publicId of product.extraImagePublicIds || []) {
        await deleteFromCloudinary(publicId);
      }
    }

    const { deletedCount = 0 } = await Product.deleteMany({ category: name });
    await Category.deleteOne({ name });

    return ok({
      message: "Category and its products deleted",
      deletedProducts: deletedCount,
    });
  } catch (e) {
    console.error(e);
    return err("Failed to delete category", 500);
  }
}