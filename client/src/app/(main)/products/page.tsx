import ProductList from "@/components/shared/ProductList";
import React from "react";

const Products = () => {
  return (
    <div className="mt-5">
      <ProductList params="productsPage" />
    </div>
  );
};

export default Products;
