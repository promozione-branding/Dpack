let cachedProducts = null;
let cacheExpiresAt = 0;
let productsRequest = null;

const CACHE_DURATION_MS = 30_000;

export function getHomeProducts() {
  if (cachedProducts && Date.now() < cacheExpiresAt) {
    return Promise.resolve(cachedProducts);
  }

  if (!productsRequest) {
    productsRequest = fetch("/api/products?page=1&limit=100", {
      cache: "no-store",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || "Unable to load products.");
        }
        return Array.isArray(data.products) ? data.products : [];
      })
      .then((products) => {
        cachedProducts = products;
        cacheExpiresAt = Date.now() + CACHE_DURATION_MS;
        return products;
      })
      .catch((error) => {
        cachedProducts = null;
        cacheExpiresAt = 0;
        throw error;
      })
      .finally(() => {
        productsRequest = null;
      });
  }

  return productsRequest;
}
