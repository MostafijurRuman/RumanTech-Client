import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      login(response.data.user, response.data.accessToken);
      toast.success(response.message);
    },
  });
}

export function useRegister() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      login(response.data.user, response.data.accessToken);
      toast.success(response.message);
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: (response) => {
      logout();
      toast.success(response.message);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (response) => toast.success(response.message),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (response) => toast.success(response.message),
  });
}
