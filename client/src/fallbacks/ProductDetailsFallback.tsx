import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductDetailsFallback = () => {
  return (
    <div className="my-10 flex items-start gap-12">
      <div className="relative flex h-[500px] w-1/2 gap-5">
        <div className="space-y-3">
          <Skeleton className="h-24 w-24 rounded-md bg-gray-100" />
          <Skeleton className="h-24 w-24 rounded-md bg-gray-100" />
          <Skeleton className="h-24 w-24 rounded-md bg-gray-100" />
        </div>
        <div className="relative h-full w-[500px] rounded-md bg-gray-100">
          <Skeleton className="h-full w-full rounded-md bg-gray-100" />
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-5">
        <div className="space-y-3">
          <Skeleton className="h-12 w-1/2 rounded-md bg-gray-100" />
          <Skeleton className="h-4 w-1/2 rounded-md bg-gray-100" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-14 rounded-md bg-gray-100" />
          <Skeleton className="h-9 w-14 rounded-md bg-gray-100" />
          <Skeleton className="h-9 w-14 rounded-md bg-gray-100" />
          <Skeleton className="h-9 w-14 rounded-md bg-gray-100" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="size-6 rounded-full bg-gray-100" />
          <Skeleton className="size-6 rounded-full bg-gray-100" />
          <Skeleton className="size-6 rounded-full bg-gray-100" />
          <Skeleton className="size-6 rounded-full bg-gray-100" />
        </div>

        <Skeleton className="h-7 w-1/3 rounded-md bg-gray-100" />

        <div className="space-y-3">
          <Skeleton className="h-5 w-full rounded-md bg-gray-100" />
          <Skeleton className="h-5 w-full rounded-md bg-gray-100" />
          <Skeleton className="h-5 w-1/2 rounded-md bg-gray-100" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-72 rounded-md bg-gray-100" />
          <Skeleton className="h-10 w-11 rounded-md bg-gray-100" />
          <Skeleton className="h-10 w-11 rounded-md bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsFallback;
