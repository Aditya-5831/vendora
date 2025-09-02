import { ProductType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductType }) => {
  console.log(product);
  return (
    <div className="group w-[300px] overflow-hidden rounded-2xl border bg-white shadow-md transition hover:shadow-xl">
      <Link
        href={`/product/${product.id}`}
        className="relative flex h-[250px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gray-50"
      >
        <Image
          src={product.images[0] || "/hero.png"}
          alt={product.name}
          width={250}
          height={260}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-3 p-3.5">
        <h1 className="font-medium">{product.name}</h1>
        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        {/* Price */}
        <p className="font-medium">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
