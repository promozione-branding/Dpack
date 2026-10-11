export function getCouponDiscount(coupon, subtotal) {
  if (coupon.discountType === "percent") {
    const value = subtotal * (coupon.discountValue / 100);
    return Math.min(value, coupon.maxDiscount ?? value, subtotal);
  }
  return Math.min(coupon.discountValue, subtotal);
}

export function getCouponError(coupon, subtotal) {
  if (!coupon || !coupon.isActive) return "This coupon code is not valid";
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return "This coupon code has expired";
  if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) return "This coupon code has reached its usage limit";
  if (subtotal < coupon.minimumOrder) return `This coupon requires a minimum order of ₹${coupon.minimumOrder}`;
  return "";
}
