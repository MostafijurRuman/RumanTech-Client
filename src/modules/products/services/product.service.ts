import { api } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";
import type { Brand, Category, Product, ProductQuery } from "@/modules/products/types";

export const productService = {
  async getProducts(params?: ProductQuery) {
    const { data } = await api.get<ApiResponse<Product[]>>("/products", { params });
    return data;
  },

  async getProduct(idOrSlug: string) {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${idOrSlug}`);
    return data.data;
  },

  async getCategories() {
    const { data } = await api.get<ApiResponse<Category[]>>("/categories", {
      params: { limit: 100, sortBy: "name", sortOrder: "asc" },
    });
    return data.data;
  },

  async getBrands() {
    const { data } = await api.get<ApiResponse<Brand[]>>("/brands", {
      params: { limit: 100, sortBy: "name", sortOrder: "asc" },
    });
    return data.data;
  },
};
