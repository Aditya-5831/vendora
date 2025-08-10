import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 text-white flex flex-col items-center md:flex-row md:items-start bg-gray-800 p-8 rounded-lg md:justify-between gap-8 md:gap-0">
      <div className="flex flex-col items-center md:items-start">
        <Link
          href={"/"}
          className="flex items-center focus-visible:outline-none"
        >
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
        <p className="mt-4 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} VENDORA. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <Link href={"/"}>Homepage</Link>
        <Link href={"/"}>About Us</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <Link href={"/"}>All Products</Link>
        <Link href={"/"}>New Arrivals</Link>
        <Link href={"/"}>Best Sellers</Link>
        <Link href={"/"}>Sales</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Blog</Link>
        <Link href={"/"}>Affiliate Program</Link>
      </div>
    </footer>
  );
};

export default Footer;
