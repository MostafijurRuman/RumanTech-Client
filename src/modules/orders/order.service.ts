import { api } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";

export type Order = {
  id: string;
  status: string;
  paymentStatus: string;
  total: string;
  createdAt: string;
};

export type CreateOrderPayload = {
  shippingName: string;
  shippingPhone: string;
  shippingLine1: string;
  shippingLine2?: string;
  shippingCity: string;
  deliveryFee?: number;
  discount?: number;
};

export const orderService = {
  async createOrder(payload: CreateOrderPayload) {
    const { data } = await api.post<ApiResponse<Order>>("/orders", payload);
    return data;
  },

  async myOrders() {
    const { data } = await api.get<ApiResponse<Order[]>>("/orders/my-orders");
    return data.data;
  },

  async allOrders() {
    const { data } = await api.get<ApiResponse<Order[]>>("/orders");
    return data.data;
  },
};
