import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartService } from "@/modules/cart/cart.service";

export function useCart() {
  return useQuery({ queryKey: ["cart"], queryFn: cartService.getCart });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      cartService.updateQuantity(id, quantity),
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.remove,
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
