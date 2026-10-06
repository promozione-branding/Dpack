import mongoose from "mongoose";
import nextEnv from "@next/env";
import Product from "../src/lib/models/Product.js";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const products = [
  {
    "slug": "1-ltr-corrugated-box-5-ply-size-7x5x9-inch-durable-product-packaging-by-dpack",
    "name": "1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch |  Durable product Packaging by Dpack",
    "category": "Corrugated Boxes",
    "description": "The 1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch | Durable product Packaging by Dpack , is designed for safe and reliable packaging of small bottles, jars, and containers of 250ml. Made from high-quality corrugated board, this box strikes the perfect balance of strength, protection, and lightweight packaging, making it ideal for e-commerce shipping and courier deliveries.\nWhether you are shipping cosmetics, oils, food products, or glass bottles, this box helps protect your items from damage during handling and transit.\nKey Features\n• 5-Ply Corrugated Construction – Strong and lightweight packaging material\n• Ideal for 1 ltr Bottles – Perfect fit for 1 ltr bottles, jars, and containers\n• Shipping Friendly – Suitable for courier, logistics, and e-commerce packaging\n• Good Impact Protection – Helps protect products during handling and transport\n• Easy to Pack & Seal – Simple design for quick packaging\nProduct Specifications\nBrand: DpackBox Type: Corrugated Packaging BoxPly: 5 PlyCapacity: Suitable for 1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch | Durable product Packaging by Dpack bottles and containersMaterial: High-quality corrugated boardUse: Packaging, storage, shipping, and e-commerce delivery\nIdeal For\n• Pickle Bottles\n• Essential oil bottles\n• Food jars and sauces\n• Small glass or plastic containers\n• E-commerce product shipping\nWhy Choose Dpack Corrugated Boxes?\nDpack focuses on practical, reliable packaging solutions for businesses and sellers. Our corrugated boxes are designed to provide safe product protection while keeping packaging lightweight and cost-effective.\nPerfect for small businesses, online sellers, packaging trials, and courier shipments.",
    "overview": [
      "The 1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch | Durable product Packaging by Dpack , is designed for safe and reliable packaging of small bottles, jars, and containers of 250ml. Made from high-quality corrugated board, this box strikes the perfect balance of strength, protection, and lightweight packaging, making it ideal for e-commerce shipping and courier deliveries.",
      "Whether you are shipping cosmetics, oils, food products, or glass bottles, this box helps protect your items from damage during handling and transit."
    ],
    "keyFeatures": [
      "5-Ply Corrugated Construction – Strong and lightweight packaging material",
      "Ideal for 1 ltr Bottles – Perfect fit for 1 ltr bottles, jars, and containers",
      "Shipping Friendly – Suitable for courier, logistics, and e-commerce packaging",
      "Good Impact Protection – Helps protect products during handling and transport",
      "Easy to Pack & Seal – Simple design for quick packaging"
    ],
    "applications": [
      "Whether you are shipping cosmetics, oils, food products, or glass bottles, this box helps protect your items from damage during handling and transit."
    ],
    "specs": [
      "Brand: DpackBox Type: Corrugated Packaging BoxPly: 5 PlyCapacity: Suitable for 1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch | Durable product Packaging by Dpack bottles and containersMaterial: High-quality corrugated boardUse: Packaging, storage, shipping, and e-commerce delivery"
    ],
    "sizes": [
      "7x5x9inch"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0688/5280/9886/files/EmptycardboardboxwithDPACKlogo.png?v=1773663540",
    "imagePublicId": null,
    "extraImages": [],
    "extraImagePublicIds": [],
    "youtubeUrl": null,
    "instagramUrl": null,
    "price": 1450.0,
    "compareAtPrice": 1650.0,
    "featured": false,
    "stock": 100,
    "lowStockThreshold": 10,
    "trackInventory": true,
    "weight": 17.2,
    "length": null,
    "breadth": null,
    "height": null,
    "metaTitle": "1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch |  Durable product Pac",
    "metaDescription": "The 1 Ltr Corrugated Box – 5 Ply | Size- 7x5x9 inch | Durable product Packaging by Dpack , is designed for safe and reliable packaging of small bottles, jars, a",
    "isActive": true
  },
  {
    "slug": "250ml-corrugated-box-3-ply-durable-product-packaging-by-dpack",
    "name": "250ml Corrugated Box – 3 Ply | Size- 5.4x4.4 x7.2 inch |  Durable product Packaging by Dpack",
    "category": "Corrugated Boxes",
    "description": "The 250ml 3-ply corrugated box, size 5.4x4.4x7.2 inches by Dpack, is designed for safe and reliable packaging of small bottles, jars, and containers of 250ml. Made from high-quality corrugated board, this box strikes the perfect balance of strength, protection, and lightweight packaging, making it ideal for e-commerce shipping and courier deliveries.\nWhether you are shipping cosmetics, oils, food products, or glass bottles, this box helps protect your items from damage during handling and transit.\nKey Features\n• 3-Ply Corrugated Construction – Strong and lightweight packaging material\n• Ideal for 250ml Bottles – Perfect fit for 250ml bottles, jars, and containers\n• Shipping Friendly – Suitable for courier, logistics, and e-commerce packaging\n• Good Impact Protection – Helps protect products during handling and transport\n• Easy to Pack & Seal – Simple design for quick packaging\nProduct Specifications\nBrand: DpackBox Type: Corrugated Packaging BoxPly: 3 PlyCapacity: Suitable for 250ml bottles and containersMaterial: High-quality corrugated boardUse: Packaging, storage, shipping, and e-commerce delivery\nIdeal For\n• Pickle Bottles\n• Essential oil bottles\n• Food jars and sauces\n• Small glass or plastic containers\n• E-commerce product shipping\nWhy Choose Dpack Corrugated Boxes?\nDpack focuses on practical, reliable packaging solutions for businesses and sellers. Our corrugated boxes are designed to provide safe product protection while keeping packaging lightweight and cost-effective.\nPerfect for small businesses, online sellers, packaging trials, and courier shipments.",
    "overview": [
      "The 250ml 3-ply corrugated box, size 5.4x4.4x7.2 inches by Dpack, is designed for safe and reliable packaging of small bottles, jars, and containers of 250ml. Made from high-quality corrugated board, this box strikes the perfect balance of strength, protection, and lightweight packaging, making it ideal for e-commerce shipping and courier deliveries.",
      "Whether you are shipping cosmetics, oils, food products, or glass bottles, this box helps protect your items from damage during handling and transit."
    ],
    "keyFeatures": [
      "3-Ply Corrugated Construction – Strong and lightweight packaging material",
      "Ideal for 250ml Bottles – Perfect fit for 250ml bottles, jars, and containers",
      "Shipping Friendly – Suitable for courier, logistics, and e-commerce packaging",
      "Good Impact Protection – Helps protect products during handling and transport",
      "Easy to Pack & Seal – Simple design for quick packaging"
    ],
    "applications": [
      "Whether you are shipping cosmetics, oils, food products, or glass bottles, this box helps protect your items from damage during handling and transit."
    ],
    "specs": [
      "Brand: DpackBox Type: Corrugated Packaging BoxPly: 3 PlyCapacity: Suitable for 250ml bottles and containersMaterial: High-quality corrugated boardUse: Packaging, storage, shipping, and e-commerce delivery"
    ],
    "sizes": [
      "5.4x4.4x7.2inch"
    ],
    "image": "https://cdn.shopify.com/s/files/1/0688/5280/9886/files/EmptycardboardboxwithDPACKlogo.png?v=1773663540",
    "imagePublicId": null,
    "extraImages": [
      "https://cdn.shopify.com/s/files/1/0688/5280/9886/files/Box_dimensions_with_measuring_tapes.png?v=1773663676"
    ],
    "extraImagePublicIds": [],
    "youtubeUrl": null,
    "instagramUrl": null,
    "price": 900.0,
    "compareAtPrice": 1100.0,
    "featured": false,
    "stock": 100,
    "lowStockThreshold": 10,
    "trackInventory": true,
    "weight": 4.2,
    "length": null,
    "breadth": null,
    "height": null,
    "metaTitle": "250ml Corrugated Box – 3 Ply | Size- 5.4x4.4 x7.2 inch |  Durable prod",
    "metaDescription": "The 250ml 3-ply corrugated box, size 5.4x4.4x7.2 inches by Dpack, is designed for safe and reliable packaging of small bottles, jars, and containers of 250ml. M",
    "isActive": true
  },
 
]
;

async function seed() {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

  try {
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI must be set in the environment or .env.local");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const { deletedCount } = await Product.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount} existing products`);

    const inserted = await Product.insertMany(products, { ordered: false });
    console.log(`✅ Successfully inserted ${inserted.length} products`);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    if (err.writeErrors) {
      err.writeErrors.forEach((e) => console.error("  -", e.errmsg));
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

seed();

export { products };
