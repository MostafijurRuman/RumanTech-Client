import { api } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";
import type {
  AuthResponse,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
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

  me: async () => {
    const { data } = await api.get<ApiResponse<AuthResponse["data"]["user"]>>("/auth/me");
    return data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const { data } = await api.post<{ success: boolean; message: string; data?: { resetToken: string | null } }>(
      "/auth/forgot-password",
      payload
    );
    return data;
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const { data } = await api.post<{ success: boolean; message: string }>("/auth/reset-password", payload);
    return data;
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    const { data } = await api.patch<{ success: boolean; message: string }>("/auth/change-password", payload);
    return data;
  },
};
