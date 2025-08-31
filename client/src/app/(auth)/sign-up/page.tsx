import GoogleButton from "@/components/auth/GoogleButton";
import SignUpForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="my-10 flex h-full w-full flex-col items-center px-2 sm:px-0">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-5">
        <h1 className="text-center text-2xl font-bold text-pretty">
          Join Vendora — Your Gateway to Smart Shopping
        </h1>
        <GoogleButton />

        <div className="before: flex items-center before:h-px before:w-36 before:max-w-40 before:bg-gray-200 before:content-[''] after:h-px after:w-36 after:max-w-44 after:flex-grow after:bg-gray-200 after:content-['']">
          <span className="px-3 text-gray-600">or</span>
        </div>

        <SignUpForm />

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className="font-semibold text-blue-500 underline"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-5 text-center text-sm text-pretty text-gray-500">
          By signing up, you agree to our{" "}
          <Link
            href={"/terms"}
            className="font-semibold text-blue-500 underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"/privacy"}
            className="font-semibold text-blue-500 underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
