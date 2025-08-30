import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStoreProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  setUser: (user: User | null) => void;
  setIsLoadingUser: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoadingUser: true,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setIsLoadingUser: (loading) => set({ isLoadingUser: loading }),
    }),
    { name: "user" },
  ),
);
