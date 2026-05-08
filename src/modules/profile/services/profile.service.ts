import { api } from "@/services/api";
import type { AuthUser } from "@/modules/auth/types/auth.types";
import type { ApiResponse } from "@/types/api.types";

export type Address = {
  id: string;
  label?: string | null;
  name: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
  isDefault: boolean;
};

export type Profile = AuthUser & {
  phone?: string | null;
  profileImageUrl?: string | null;
  addresses: Address[];
};

export const profileService = {
  async me() {
    const { data } = await api.get<ApiResponse<Profile>>("/users/me");
    return data.data;
  },

  async update(payload: { name?: string; phone?: string }) {
    const { data } = await api.patch<ApiResponse<AuthUser>>("/users/me", payload);
    return data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await api.post<ApiResponse<AuthUser>>("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async changePassword(payload: { oldPassword: string; newPassword: string }) {
    const { data } = await api.patch<ApiResponse<null>>("/auth/change-password", payload);
    return data;
  },

  async createAddress(payload: {
    label?: string;
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isDefault?: boolean;
  }) {
    const { data } = await api.post<ApiResponse<Address>>("/users/me/addresses", payload);
    return data;
  },

  async deleteAddress(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/users/me/addresses/${id}`);
    return data;
  },
};
