import { api } from "@/services/api";
import type { Product } from "@/modules/products/types";
import type { ApiResponse } from "@/types/api.types";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export const cartService = {
  async getCart() {
    const { data } = await api.get<ApiResponse<CartItem[]>>("/cart");
    return data.data;
  },

  async addToCart(payload: { productId: string; quantity: number }) {
    const { data } = await api.post<ApiResponse<CartItem>>("/cart", payload);
    return data;
  },

  async updateQuantity(id: string, quantity: number) {
    const { data } = await api.patch<ApiResponse<CartItem>>(`/cart/${id}`, { quantity });
    return data;
  },

  async remove(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/cart/${id}`);
    return data;
  },

  async clear() {
    const { data } = await api.delete<ApiResponse<null>>("/cart");
    return data;
  },
};
