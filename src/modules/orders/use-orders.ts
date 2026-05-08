import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/modules/orders/order.service";

export function useMyOrders() {
  return useQuery({ queryKey: ["my-orders"], queryFn: orderService.myOrders });
}

export function useAdminOrders() {
  return useQuery({ queryKey: ["admin-orders"], queryFn: orderService.allOrders });
}
