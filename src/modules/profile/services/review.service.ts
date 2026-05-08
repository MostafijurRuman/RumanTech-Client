import { api } from "@/services/api";
import type { Review } from "@/modules/admin/services/admin.service";
import type { ApiResponse } from "@/types/api.types";

export const myReviewService = {
  async list() {
    const { data } = await api.get<ApiResponse<Review[]>>("/reviews/my-reviews");
    return data.data;
  },

  async update(id: string, payload: { rating?: number; comment?: string }) {
    const { data } = await api.patch<ApiResponse<Review>>(`/reviews/${id}`, payload);
    return data;
  },

  async delete(id: string) {
    const { data } = await api.delete<ApiResponse<null>>(`/reviews/${id}`);
    return data;
  },
};
