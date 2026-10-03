import ProductsClient from "./ProductsClient";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  return <ProductsClient initialCategory={params?.category || null} />;
}
