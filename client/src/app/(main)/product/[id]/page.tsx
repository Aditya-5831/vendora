import ProductDetails from "@/components/products/ProductDetails";

interface ProductDetailsProps {
  params: { id: string };
}

const ProductDetailsPage = ({ params }: ProductDetailsProps) => {
  return <ProductDetails productId={params.id} />;
};

export default ProductDetailsPage;
