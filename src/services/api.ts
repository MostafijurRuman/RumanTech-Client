import axios from "axios";
import { toast } from "sonner";
import { env } from "@/config/env";
import { useAuthStore } from "@/store/auth-store";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicAuthPaths = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isPublicAuthRequest = publicAuthPaths.some((path) =>
      String(originalRequest?.url ?? "").includes(path)
    );

    if (error.response?.status === 401 && !originalRequest?._retry && !isPublicAuthRequest) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const user = data.data.user ?? useAuthStore.getState().user;
        useAuthStore.getState().setSession(user, data.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(originalRequest);
      } catch {
        useAuthStore.getState().clearSession();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    const message = error.response?.data?.message;
    if (message && typeof window !== "undefined") {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);
