import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setSession(response.data.user, response.data.accessToken);
      toast.success(response.message);
    },
  });
}

export function useLogout() {
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: (response) => {
      clearSession();
      toast.success(response.message);
    },
  });
}
