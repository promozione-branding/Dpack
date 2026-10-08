export function parseVariants(value) {
  if (value === undefined || value === null || value === "") return [];
  const parsed = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(parsed)) throw new Error("variants must be an array");

  const num = (x) => (x === "" || x == null ? null : Number(x));

  return parsed.map((v, i) => {
    const size = String(v.size || "").trim();
    const price = Number(String(v.price ?? "").replace(/,/g, ""));
    if (!size || !Number.isFinite(price) || price < 0) {
      throw new Error(`Variant ${i + 1}: size and a valid price are required`);
    }
    return {
      size,
      price,
      compareAtPrice: num(v.compareAtPrice),
      stock: Number(v.stock ?? 0),
      sku: v.sku ? String(v.sku).trim() : null,
      weight: num(v.weight),
      isDefault: Boolean(v.isDefault),
    };
  });
}