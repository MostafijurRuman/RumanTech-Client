import { api } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";

export type Order = {
  id: string;
  status: string;
  paymentStatus: string;
  total: string;
  createdAt: string;
};

export const orderService = {
  async myOrders() {
    const { data } = await api.get<ApiResponse<Order[]>>("/orders/my-orders");
    return data.data;
  },

  async allOrders() {
    const { data } = await api.get<ApiResponse<Order[]>>("/orders");
    return data.data;
  },
};
