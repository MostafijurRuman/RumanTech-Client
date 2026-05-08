import type { ApiMeta } from "@/types/api.types";

export type DashboardStats = Record<string, number>;

export type DashboardOrder = {
  id: string;
  status: string;
  paymentStatus: string;
  total: string;
  createdAt: string;
  user?: { id: string; name: string; email: string };
};

export type AdminDashboardOverview = {
  stats: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    monthlyRevenue: number;
    salesGrowth: number;
    pendingOrders: number;
  };
  recentOrders: DashboardOrder[];
};

export type UserDashboardOverview = {
  stats: {
    totalOrders: number;
    wishlistItems: number;
    reviewsCount: number;
  };
  recentOrders: DashboardOrder[];
};

export type AnalyticsSummary = {
  revenueTrends: { month: string; revenue: number; orders: number }[];
  orderStatus: { label: string; value: number }[];
  paymentStatus: { label: string; value: number }[];
  userGrowth: { month: string; users: number }[];
  productPerformance: { productId: string; name: string; quantity: number; revenue: number }[];
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: string;
  href?: string | null;
  readAt?: string | null;
  createdAt: string;
};

export type NotificationsResponse = {
  items: NotificationItem[];
  unread: number;
};

export type Paginated<T> = {
  data: T;
  meta?: ApiMeta;
};
