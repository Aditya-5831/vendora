"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      variant={"outline"}
      className="w-full"
      size={"lg"}
    >
      <FcGoogle className="size-5" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
