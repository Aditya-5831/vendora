import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductCardFallback = () => {
  return (
    <div className="w-[300px] overflow-hidden rounded-2xl border bg-white shadow-md">
      <div className="flex h-[225px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gray-50">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-3 p-3.5">
        <Skeleton className="h-5 w-[180px]" />
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[220px]" />
        <Skeleton className="h-5 w-[100px]" />
      </div>
    </div>
  );
};

export default ProductCardFallback;
