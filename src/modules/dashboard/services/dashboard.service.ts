import { api } from "@/services/api";
import type { ApiResponse } from "@/types/api.types";
import type {
  AdminDashboardOverview,
  AnalyticsSummary,
  NotificationsResponse,
  UserDashboardOverview,
} from "@/modules/dashboard/types/dashboard.types";

export const dashboardService = {
  async adminOverview() {
    const { data } = await api.get<ApiResponse<AdminDashboardOverview>>("/dashboard/admin");
    return data.data;
  },

  async userOverview() {
    const { data } = await api.get<ApiResponse<UserDashboardOverview>>("/dashboard/me");
    return data.data;
  },

  async analytics(months = 12) {
    const { data } = await api.get<ApiResponse<AnalyticsSummary>>("/analytics/summary", { params: { months } });
    return data.data;
  },

  async notifications() {
    const { data } = await api.get<ApiResponse<NotificationsResponse>>("/notifications", { params: { limit: 20 } });
    return data.data;
  },

  async markNotificationAsRead(id: string) {
    const { data } = await api.patch<ApiResponse<unknown>>(`/notifications/${id}/read`);
    return data.data;
  },

  async markAllNotificationsAsRead() {
    const { data } = await api.patch<ApiResponse<unknown>>("/notifications/read-all");
    return data.data;
  },

  async deleteNotification(id: string) {
    const { data } = await api.delete<ApiResponse<unknown>>(`/notifications/${id}`);
    return data.data;
  },
};
