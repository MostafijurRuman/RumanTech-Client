import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { orderService } from "@/modules/orders/order.service";

export function useMyOrders() {
  return useQuery({ queryKey: ["my-orders"], queryFn: orderService.myOrders });
}

export function useAdminOrders() {
  return useQuery({ queryKey: ["admin-orders"], queryFn: orderService.allOrders });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: async (response) => {
      toast.success(response.message);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["my-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
      ]);
      router.push("/dashboard/orders");
    },
  });
}
