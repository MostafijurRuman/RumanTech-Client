import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { profileService } from "@/modules/profile/services/profile.service";
import { useAuthStore } from "@/store/auth-store";

export function useProfile() {
  return useQuery({ queryKey: ["profile"], queryFn: profileService.me });
}

export function useProfileActions() {
  const queryClient = useQueryClient();
  const currentToken = useAuthStore((state) => state.accessToken);
  const setSession = useAuthStore((state) => state.setSession);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["profile"] });

  return {
    update: useMutation({
      mutationFn: profileService.update,
      onSuccess: async (response) => {
        toast.success(response.message);
        if (currentToken) setSession(response.data, currentToken);
        await invalidate();
      },
    }),
    uploadAvatar: useMutation({
      mutationFn: profileService.uploadAvatar,
      onSuccess: async (response) => {
        toast.success(response.message);
        if (currentToken) setSession(response.data, currentToken);
        await invalidate();
      },
    }),
    changePassword: useMutation({
      mutationFn: profileService.changePassword,
      onSuccess: (response) => {
        toast.success(response.message);
      },
    }),
    createAddress: useMutation({
      mutationFn: profileService.createAddress,
      onSuccess: async (response) => {
        toast.success(response.message);
        await invalidate();
      },
    }),
    deleteAddress: useMutation({
      mutationFn: profileService.deleteAddress,
      onSuccess: async (response) => {
        toast.success(response.message);
        await invalidate();
      },
    }),
  };
}
