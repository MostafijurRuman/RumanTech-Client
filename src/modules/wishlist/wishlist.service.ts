import { api } from "@/services/api";
import type { Product } from "@/modules/products/types";
import type { ApiResponse } from "@/types/api.types";

export type WishlistItem = {
  id: string;
  productId: string;
  product: Product;
};

export const wishlistService = {
  async getWishlist() {
    const { data } = await api.get<ApiResponse<WishlistItem[]>>("/wishlist");
    return data.data;
  },

  async add(productId: string) {
    const { data } = await api.post<ApiResponse<WishlistItem>>("/wishlist", { productId });
    return data;
  },

  async remove(productId: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/wishlist/${productId}`);
    return data;
  },
};
