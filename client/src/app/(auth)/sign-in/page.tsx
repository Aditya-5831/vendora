import SignInForm from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  return (
    <div className="my-10 flex h-full w-full flex-col items-center px-2 sm:px-0">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-5">
        <h1 className="text-center text-2xl font-bold text-pretty">
          Welcome Back to Vendora
        </h1>
        <Button variant={"outline"} className="w-full" size={"lg"}>
          <FcGoogle className="size-5" />
          Continue with Google
        </Button>

        <div className="before: flex items-center before:h-px before:w-36 before:max-w-40 before:bg-gray-200 before:content-[''] after:h-px after:w-36 after:max-w-44 after:flex-grow after:bg-gray-200 after:content-['']">
          <span className="px-3 text-gray-600">or</span>
        </div>

        <SignInForm />

        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={"/sign-up"}
            className="font-semibold text-blue-500 underline"
          >
            Sign up
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

export default SignInPage;
