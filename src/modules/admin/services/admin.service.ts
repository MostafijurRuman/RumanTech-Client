import { api } from "@/services/api";
import type { Product, ProductQuery, Category, Brand } from "@/modules/products/types";
import type { Order } from "@/modules/orders/order.service";
import type { ApiResponse } from "@/types/api.types";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profileImageUrl?: string | null;
  role: "ADMIN" | "USER";
  isActive: boolean;
  createdAt: string;
};

export type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user?: { id: string; name: string; email?: string };
  product?: { id: string; name: string; slug: string };
};

export type ProductPayload = {
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  images?: File[];
};

function productFormData(payload: Partial<ProductPayload>) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === "images") return;
    if (value !== undefined && value !== null) formData.append(key, String(value));
  });
  payload.images?.forEach((file) => formData.append("images", file));
  return formData;
}

export const adminService = {
  async products(params?: ProductQuery) {
    const { data } = await api.get<ApiResponse<Product[]>>("/products", {
      params: { includeDrafts: true, limit: 100, ...params },
    });
    return data.data;
  },

  async createProduct(payload: ProductPayload) {
    const { data } = await api.post<ApiResponse<Product>>("/products", productFormData(payload), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async updateProduct(id: string, payload: Partial<ProductPayload>) {
    const { data } = await api.patch<ApiResponse<Product>>(`/products/${id}`, productFormData(payload), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async deleteProduct(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/products/${id}`);
    return data;
  },

  async categories() {
    const { data } = await api.get<ApiResponse<Category[]>>("/categories", { params: { limit: 100 } });
    return data.data;
  },

  async createCategory(payload: { name: string; description?: string }) {
    const { data } = await api.post<ApiResponse<Category>>("/categories", payload);
    return data;
  },

  async updateCategory(id: string, payload: { name?: string; description?: string }) {
    const { data } = await api.patch<ApiResponse<Category>>(`/categories/${id}`, payload);
    return data;
  },

  async deleteCategory(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/categories/${id}`);
    return data;
  },

  async brands() {
    const { data } = await api.get<ApiResponse<Brand[]>>("/brands", { params: { limit: 100 } });
    return data.data;
  },

  async createBrand(payload: { name: string; description?: string }) {
    const { data } = await api.post<ApiResponse<Brand>>("/brands", payload);
    return data;
  },

  async updateBrand(id: string, payload: { name?: string; description?: string }) {
    const { data } = await api.patch<ApiResponse<Brand>>(`/brands/${id}`, payload);
    return data;
  },

  async deleteBrand(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/brands/${id}`);
    return data;
  },

  async orders() {
    const { data } = await api.get<ApiResponse<Order[]>>("/orders", { params: { limit: 100 } });
    return data.data;
  },

  async updateOrderStatus(id: string, payload: { status?: string; paymentStatus?: string }) {
    const { data } = await api.patch<ApiResponse<Order>>(`/orders/${id}/status`, payload);
    return data;
  },

  async users() {
    const { data } = await api.get<ApiResponse<AdminUser[]>>("/users", { params: { limit: 100 } });
    return data.data;
  },

  async updateUserRole(id: string, role: "ADMIN" | "USER") {
    const { data } = await api.patch<ApiResponse<AdminUser>>(`/users/${id}/role`, { role });
    return data;
  },

  async updateUserStatus(id: string, isActive: boolean) {
    const { data } = await api.patch<ApiResponse<AdminUser>>(`/users/${id}/status`, { isActive });
    return data;
  },

  async deleteUser(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/users/${id}`);
    return data;
  },

  async reviews() {
    const { data } = await api.get<ApiResponse<Review[]>>("/reviews");
    return data.data;
  },

  async deleteReview(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/reviews/${id}`);
    return data;
  },
};
