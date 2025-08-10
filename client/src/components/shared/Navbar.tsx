"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "../home/SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname().split("/")[1] || "/";

  return (
    <nav className="flex items-center justify-between w-full h-20 border-b border-gray-200 pb-4">
      <Link href={"/"} className="flex items-center focus-visible:outline-none">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-bold tracking-wider">
          VENDORA
        </p>
      </Link>
      <div className="flex items-center gap-10">
        <SearchBar />
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className={cn(pathname === "/" && "rounded-md p-2 bg-primary")}
          >
            <Home
              className={cn(
                "size-5",
                pathname === "/" ? "text-white" : "text-gray-600",
              )}
            />
          </Link>
          <Link
            href={"/notifications"}
            className={cn(
              "relative",
              pathname === "/notifications" && "rounded-md p-2 bg-primary",
            )}
          >
            <Bell
              className={cn(
                "size-5",
                pathname === "/notifications" ? "text-white" : "text-gray-600",
              )}
            />
            <div className="text-[10px] absolute -right-2 -top-1 bg-rose-500 text-white size-4 flex items-center justify-center rounded-full">
              5
            </div>
          </Link>
          <Link
            href={"/cart"}
            className={cn(
              "relative ",
              pathname === "/cart" && "rounded-md p-2 bg-primary",
            )}
          >
            <ShoppingCart
              className={cn(
                "size-5",
                pathname === "/cart" ? "text-white" : "text-gray-600",
              )}
            />
            <div className="text-[10px] absolute -right-2 -top-1 bg-rose-500 text-white size-4 flex items-center justify-center rounded-full">
              5
            </div>
          </Link>
        </div>
        <Link href={"/cart"} className={buttonVariants()}>
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
