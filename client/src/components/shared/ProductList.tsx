"use client";

import apiRequest from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/types";
import ProductCardFallback from "@/fallbacks/ProductCardFallback";

const ProductList = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = (await apiRequest.get("/product")).data.products;
      return products;
    },
  });

  return (
    <div className="flex w-full flex-col items-center">
      <Categories />
      {!products || products.length === 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <ProductCardFallback key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {products.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
