import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/modules/dashboard/services/dashboard.service";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: dashboardService.adminOverview,
  });
}

export function useUserDashboard() {
  return useQuery({
    queryKey: ["dashboard", "me"],
    queryFn: dashboardService.userOverview,
  });
}

export function useAnalytics(months = 12) {
  return useQuery({
    queryKey: ["analytics", months],
    queryFn: () => dashboardService.analytics(months),
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: dashboardService.notifications,
    refetchInterval: 30000,
  });
}

export function useNotificationActions() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });

  return {
    markAsRead: useMutation({
      mutationFn: dashboardService.markNotificationAsRead,
      onSuccess: invalidate,
    }),
    markAllAsRead: useMutation({
      mutationFn: dashboardService.markAllNotificationsAsRead,
      onSuccess: invalidate,
    }),
    deleteNotification: useMutation({
      mutationFn: dashboardService.deleteNotification,
      onSuccess: invalidate,
    }),
  };
}
