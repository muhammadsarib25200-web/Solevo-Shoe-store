import ProductDetail from "@components/ProductDetail/productDetail";

export default async function Page({ params }) {
  const { id } = await params;

  return <ProductDetail id={id} />;
}