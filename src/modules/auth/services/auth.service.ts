import { api } from "@/services/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/modules/auth/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  logout: async () => {
    const { data } = await api.post<{ success: boolean; message: string }>(
      "/auth/logout"
    );
    return data;
  },
};
