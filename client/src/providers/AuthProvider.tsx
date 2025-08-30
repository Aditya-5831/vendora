"use client";

import apiRequest from "@/lib/apiRequest";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, setIsLoadingUser } = useAuthStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const { data } = await apiRequest.get("/user/me");
        return data.user;
      } catch (error: unknown) {
        const axiosErr = error as AxiosError;

        if (axiosErr.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },

    retry: false,
  });

  useEffect(() => {
    setIsLoadingUser(isLoading);

    if (!isLoading) {
      setUser(data ?? null);
    }
  }, [data, setUser, isLoading, setIsLoadingUser]);

  return <>{children}</>;
};

export default AuthProvider;
