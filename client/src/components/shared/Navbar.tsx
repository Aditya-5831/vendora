"use client";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { Bell, Home, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../home/SearchBar";
import { buttonVariants } from "../ui/button";
import UserButton from "./UserButton";

const Navbar = () => {
  const pathname = usePathname().split("/")[1] || "/";

  const { isAuthenticated, isLoadingUser, user } = useAuthStore(
    (state) => state,
  );

  console.log(user);

  return (
    <nav className="flex h-20 w-full items-center justify-between border-b border-gray-200 pb-4">
      <Link href={"/"} className="flex items-center focus-visible:outline-none">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={36}
          height={36}
          className="h-6 w-6 md:h-9 md:w-9"
        />
        <p className="text-md hidden font-bold tracking-wider md:block">
          VENDORA
        </p>
      </Link>
      <div className="flex items-center gap-10">
        <SearchBar />
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className={cn(pathname === "/" && "bg-primary rounded-md p-2")}
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
              pathname === "/notifications" && "bg-primary rounded-md p-2",
            )}
          >
            <Bell
              className={cn(
                "size-5",
                pathname === "/notifications" ? "text-white" : "text-gray-600",
              )}
            />
            <div className="absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
              5
            </div>
          </Link>
          <Link
            href={"/cart"}
            className={cn(
              "relative",
              pathname === "/cart" && "bg-primary rounded-md p-2",
            )}
          >
            <ShoppingCart
              className={cn(
                "size-5",
                pathname === "/cart" ? "text-white" : "text-gray-600",
              )}
            />
            <div className="absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
              5
            </div>
          </Link>
        </div>
        {isLoadingUser ? (
          <div className="size-9 animate-pulse rounded-full bg-gray-300" />
        ) : isAuthenticated ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
