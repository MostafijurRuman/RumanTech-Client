import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistService } from "@/modules/wishlist/wishlist.service";

export function useWishlist() {
  return useQuery({ queryKey: ["wishlist"], queryFn: wishlistService.getWishlist });
}

export function useAddWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistService.add,
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function useRemoveWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistService.remove,
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}
