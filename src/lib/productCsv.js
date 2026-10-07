export const PRODUCT_CSV_FIELDS = [
  "slug",
  "name",
  "category",
  "shortDescription",
  "description",
  "overview",
  "keyFeatures",
  "applications",
  "specs",
  "sizes",
  "image",
  "imagePublicId",
  "extraImages",
  "extraImagePublicIds",
  "youtubeUrl",
  "instagramUrl",
  "price",
  "compareAtPrice",
  "featured",
  "stock",
  "lowStockThreshold",
  "trackInventory",
  "weight",
  "length",
  "breadth",
  "height",
  "metaTitle",
  "metaDescription",
  "isActive",
];

export function escapeCSV(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    value = JSON.stringify(value);
  }

  return `"${String(value).replace(/"/g, '""')}"`;
}
