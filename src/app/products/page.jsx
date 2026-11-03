import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Protective Packaging Products & Solutions | D Pack",
  description: "Explore D Pack's packaging products, including air cushion bags, air column rolls, dunnage bags, bubble rolls and industrial packaging supplies.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  return <ProductsClient initialCategory={params?.category || null} />;
}
