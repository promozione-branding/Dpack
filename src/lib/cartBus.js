
import { useSyncExternalStore } from "react";
import { cartAPI } from "./apiClient";

let items = [];
let listeners = [];
let loaded = false;

const EMPTY = [];
const OBJECT_ID_RE = /^[0-9a-fA-F]{24}$/;

function isLoggedIn() {
  return (
    typeof window !== "undefined" &&
    !!localStorage.getItem("dpack_token")
  );
}

function backgroundSync(fn) {
  if (!isLoggedIn()) return;

  fn().catch((error) => {
    console.error("Cart sync failed:", error);
  });
}

function load() {
  if (loaded || typeof window === "undefined") return;

  try {
    items = JSON.parse(localStorage.getItem("cart") || "[]");

    // Support existing cart items created before shippingPrice was added.
    items = items.map((item) => ({
      ...item,
      shippingPrice: Number(item.shippingPrice ?? 0),
    }));
  } catch {
    items = [];
  }

  loaded = true;
}

function persist() {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
}

function emit() {
  listeners.forEach((listener) => listener());

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:added"));
  }
}

function subscribe(listener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

function getSnapshot() {
  load();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

function keyOf(product) {
  return String(product.cartKey ?? product._id ?? product.id ?? product.name);
}

/* =========================================================
   ADD TO CART
========================================================= */


/* =========================================================
   ADD TO CART
========================================================= */

export function addToCart(product, qty = 1) {
  load();

  // Product ID
  const key = keyOf(product);

  // Selected variant support
  const variant = product.selectedVariant ?? null;
  const variantId = product.variantId ?? variant?._id ?? null;

  // Unique key for each product variant
  const cartKey = variantId ? `${key}_${variantId}` : key;

  // Read price and shipping from the selected variant
  const price = Number(
    variant?.price ?? product.price ?? 0
  );

  const shippingPrice = Number(
    variant?.shippingPrice ?? product.shippingPrice ?? 0
  );

  const compareAtPrice =
    variant?.compareAtPrice ?? product.compareAtPrice ?? null;

  const size = variant?.size ?? product.size ?? "";

  const existing = items.find((item) => item.key === cartKey);

  if (existing) {
    // Update quantity and variant details
    items = items.map((item) =>
      item.key === cartKey
        ? {
            ...item,
            qty: item.qty + Number(qty),
            price,
            shippingPrice,
            compareAtPrice:
              compareAtPrice != null
                ? Number(compareAtPrice)
                : null,
            size,
          }
        : item
    );
  } else {
    // Add a new cart item
    items = [
      ...items,
      {
        key: cartKey,
        id: key,
        variantId,
        size,
        name: product.name ?? product.title ?? "",
        image: product.image ?? product.images?.[0] ?? "",
        price,
        compareAtPrice:
          compareAtPrice != null
            ? Number(compareAtPrice)
            : null,
        shippingPrice,
        category: product.category,
        sku: product.sku ?? "",
        slug: product.slug ?? "",
        trackInventory: product.trackInventory ?? false,
        stock: variant?.stock ?? product.stock ?? null,
        qty: Number(qty),
      },
    ];
  }

  persist();
  emit();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:open"));
  }

  // Sync only non-variant items with the existing cart API
  if (!variantId && OBJECT_ID_RE.test(key)) {
    backgroundSync(() => cartAPI.add(key, Number(qty)));
  }
}


/* =========================================================
   UPDATE QUANTITY
========================================================= */

export function updateQty(key, qty) {
  load();

  if (qty <= 0) {
    return removeFromCart(key);
  }

  items = items.map((item) =>
    item.key === key ? { ...item, qty } : item
  );

  persist();
  emit();

  const item = items.find((entry) => entry.key === key);

  if (item && !item.variantId && OBJECT_ID_RE.test(item.id)) {
    backgroundSync(() => cartAPI.setQty(item.id, qty));
  }
}

/* =========================================================
   REMOVE FROM CART
========================================================= */

export function removeFromCart(key) {
  load();

  const removedItem = items.find((item) => item.key === key);

  items = items.filter((item) => item.key !== key);

  persist();
  emit();

  if (
    removedItem &&
    !removedItem.variantId &&
    OBJECT_ID_RE.test(removedItem.id)
  ) {
    backgroundSync(() => cartAPI.remove(removedItem.id));
  }
}

/* =========================================================
   CLEAR CART
========================================================= */

export function clearCart() {
  items = [];
  persist();
  emit();
}

/* =========================================================
   SYNC CART FROM SERVER
========================================================= */

export async function syncCartFromServer() {
  load();

  try {
    const localItems = items
      .filter(
        (item) =>
          !item.variantId &&
          OBJECT_ID_RE.test(item.id) &&
          item.key === item.id
      )
      .map((item) => ({
        productId: item.id,
        qty: item.qty,
      }));

    const { cart } = await cartAPI.merge(localItems);

    const serverItems = cart.map((item) => ({
      key: item.id,
      id: item.id,
      variantId: null,
      size: "",
      name: item.name,
      image: item.image,
      price: Number(item.price ?? 0),
      compareAtPrice: item.compareAtPrice ?? null,
      shippingPrice: Number(item.shippingPrice ?? 0),
      category: item.category,
      sku: item.sku ?? "",
      slug: item.slug ?? "",
      trackInventory: item.trackInventory ?? false,
      stock: item.stock ?? null,
      qty: item.qty,
    }));

    // Preserve locally stored variant-specific cart lines until
    // the server API supports variant-aware cart merging.
    const variantItems = items.filter((item) => item.variantId);

    items = [...serverItems, ...variantItems];

    persist();
    emit();
  } catch (error) {
    // Keep the local cart if syncing fails.
    console.error("Cart merge failed:", error);
  }
}

/* =========================================================
   CART HOOK
========================================================= */

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

/* =========================================================
   CART COUNT
========================================================= */

export function cartCount(items) {
  return items.reduce((total, item) => total + item.qty, 0);
}

/* =========================================================
   CART SUBTOTAL
========================================================= */

export function cartSubtotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.price ?? 0) * item.qty,
    0
  );
}

/* =========================================================
   CART SHIPPING TOTAL
========================================================= */

export function cartShipping(items) {
  return items.reduce(
    (total, item) =>
      total + Number(item.shippingPrice ?? 0) * item.qty,
    0
  );
}

/* =========================================================
   CART GRAND TOTAL
========================================================= */

export function cartTotal(items) {
  return cartSubtotal(items) + cartShipping(items);
}

/* =========================================================
   CART SAVINGS
========================================================= */

export function cartSavings(items) {
  return items.reduce(
    (total, item) =>
      total +
      (item.compareAtPrice && item.compareAtPrice > item.price
        ? (item.compareAtPrice - item.price) * item.qty
        : 0),
    0
  );
}

/* =========================================================
   FORMAT INR
========================================================= */

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}
