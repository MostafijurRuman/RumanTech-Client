import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/modules/auth/types/auth.types";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
  setSession: (user: AuthUser, accessToken: string) => void;
  clearSession: () => void;
  hasRole: (roles: AuthUser["role"][]) => boolean;
};

const authStateCreator: StateCreator<AuthState> = (set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  setSession: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
  clearSession: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  hasRole: (roles) => {
    const user = get().user;
    return Boolean(user && roles.includes(user.role));
  },
});

export const useAuthStore = create<AuthState>()(
  persist(
    authStateCreator,
    {
      name: "rumantech-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
