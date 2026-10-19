
import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import { ok, err } from "@/lib/apiHelpers";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    await connectDB();

    const product = await Product.findOne({
      slug,
      isActive: true,
    }).lean();

    if (!product) {
      return err("Product not found", 404);
    }

    // Ensure shippingPrice is available for each variant.
    const updatedProduct = {
      ...product,
      variants: Array.isArray(product.variants)
        ? product.variants.map((variant) => ({
            ...variant,
            shippingPrice: Number(
              variant.shippingPrice ??
              product.shippingPrice ??
              0
            ),
          }))
        : product.variants,
    };

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .limit(4)
      .lean();

    return ok({
      product: updatedProduct,
      related,
    });
  } catch (e) {
    console.error("Public product lookup failed:", e);

    return err("Failed to fetch product", 500);
  }
}
