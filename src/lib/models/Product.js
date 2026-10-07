import mongoose from "mongoose";


const VariantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      default: null,
      trim: true,
    },
    weight: {
      type: Number,
      default: null,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    overview: [{ type: String }],

    keyFeatures: [{ type: String }],

    applications: [{ type: String }],

    specs: [{ type: String }],

    variants: {
      type: [VariantSchema],
      default: [],
    },

    sizes: [{ type: String }],

    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      default: null,
    },

    extraImages: [{ type: String }],

    extraImagePublicIds: [{ type: String }],

    youtubeUrl: {
      type: String,
      default: null,
      trim: true,
    },

    instagramUrl: {
      type: String,
      default: null,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    compareAtPrice: {
      type: Number,
      default: null,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 10,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    weight: {
      type: Number,
      default: null,
    },

    length: {
      type: Number,
      default: null,
    },

    breadth: {
      type: Number,
      default: null,
    },

    height: {
      type: Number,
      default: null,
    },

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


ProductSchema.pre("validate", function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});


ProductSchema.pre("validate", function () {
  if (this.variants && this.variants.length > 0) {
    this.sizes = this.variants.map((v) => v.size);

    // ensure only one isDefault
    const defaults = this.variants.filter((v) => v.isDefault);
    if (defaults.length === 0) {
      this.variants[0].isDefault = true;
    } else if (defaults.length > 1) {
      let kept = false;
      this.variants.forEach((v) => {
        if (v.isDefault && !kept) {
          kept = true;
        } else {
          v.isDefault = false;
        }
      });
    }

    const defaultVariant =
      this.variants.find((v) => v.isDefault) || this.variants[0];

    this.price = defaultVariant.price;
    this.compareAtPrice =
      defaultVariant.compareAtPrice != null
        ? defaultVariant.compareAtPrice
        : null;

    this.stock = this.variants.reduce(
      (sum, v) => sum + (Number(v.stock) || 0),
      0
    );
  }
});


ProductSchema.virtual("stockStatus").get(function () {
  if (!this.trackInventory) return "in_stock";

  const totalStock =
    this.variants && this.variants.length > 0
      ? this.variants.reduce((s, v) => s + (v.stock || 0), 0)
      : this.stock;

  if (totalStock <= 0) return "out_of_stock";
  if (totalStock <= this.lowStockThreshold) return "low_stock";
  return "in_stock";
});

ProductSchema.set("toJSON", {
  virtuals: true,
});


const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;