"use client";

import apiRequest from "@/lib/apiRequest";
import { useQuery } from "@tanstack/react-query";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/types";
import ProductCardFallback from "@/fallbacks/ProductCardFallback";
import Filter from "./Filter";

const ProductList = ({
  params,
  showCategories = true,
}: {
  params: "homePage" | "productsPage";
  showCategories?: boolean;
}) => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = (await apiRequest.get("/product")).data.products;
      return products;
    },
  });

  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-semibold">Categories</h3>
      <div className="flex w-full flex-col items-center">
        {showCategories && <Categories />}
        <div className="mb-5 flex w-full items-center justify-end">
          {params === "productsPage" && <Filter />}
        </div>
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
    </div>
  );
};

export default ProductList;
