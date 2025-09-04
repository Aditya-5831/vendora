"use client";

import { cn } from "@/lib/utils";
import {
  Book,
  Briefcase,
  Dumbbell,
  Footprints,
  Glasses,
  Laptop,
  Shirt,
  ShoppingBasket,
  Watch,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="size-7" />,
    slug: "all",
  },
  {
    name: "Clothing",
    icon: <Shirt className="size-7" />,
    slug: "clothing",
  },
  {
    name: "Shoes",
    icon: <Footprints className="size-7" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="size-7" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="size-7" />,
    slug: "bags",
  },
  {
    name: "Watches",
    icon: <Watch className="size-7" />,
    slug: "watches",
  },
  {
    name: "Electronics",
    icon: <Laptop className="size-7" />,
    slug: "electronics",
  },
  {
    name: "Sports",
    icon: <Dumbbell className="size-7" />,
    slug: "sports",
  },
  {
    name: "Books",
    icon: <Book className="size-7" />,
    slug: "books",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (category: string) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-4 grid w-full grid-cols-2 gap-5 rounded-lg p-2 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9">
      {categories.map((category) => (
        <div
          key={category.name}
          className={cn(
            "flex cursor-pointer items-center justify-center rounded-md border p-2",
            selectedCategory === category.slug
              ? "bg-neutral-900 text-white"
              : "text-gray-500",
          )}
          onClick={handleChange(category.slug)}
        >
          <div>{category.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
