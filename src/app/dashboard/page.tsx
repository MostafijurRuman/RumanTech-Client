"use client";

import Link from "next/link";
import { Heart, Package, Star, UserRound } from "lucide-react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { DashboardSkeleton } from "@/modules/dashboard/components/dashboard-skeleton";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { useUserDashboard } from "@/modules/dashboard/hooks/use-dashboard";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency, formatDate } from "@/modules/dashboard/utils/formatters";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const dashboard = useUserDashboard();
  const stats = dashboard.data?.stats;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="grid gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">My dashboard</h2>
              <p className="mt-1 text-sm text-muted-foreground">Welcome back, {user?.name}.</p>
            </div>
            {user?.role === "ADMIN" && (
              <Link href="/admin" className="text-sm font-medium text-primary">
                Open admin dashboard
              </Link>
            )}
          </div>

          {dashboard.isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total orders" value={stats?.totalOrders ?? 0} icon={Package} />
              <StatCard label="Wishlist items" value={stats?.wishlistItems ?? 0} icon={Heart} tone="accent" />
              <StatCard label="Reviews" value={stats?.reviewsCount ?? 0} icon={Star} />
              <StatCard label="Account" value={user?.role ?? "USER"} icon={UserRound} tone="neutral" />
            </div>
          )}

          <DashboardDataTable
            data={dashboard.data?.recentOrders ?? []}
            isLoading={dashboard.isLoading}
            searchPlaceholder="Search recent orders"
            columns={[
              { key: "id", header: "Order", accessor: (order) => order.id.slice(0, 8), sortValue: (order) => order.id },
              { key: "status", header: "Status", accessor: (order) => order.status, sortValue: (order) => order.status },
              { key: "paymentStatus", header: "Payment", accessor: (order) => order.paymentStatus, sortValue: (order) => order.paymentStatus },
              { key: "total", header: "Total", accessor: (order) => formatCurrency(order.total), sortValue: (order) => Number(order.total) },
              { key: "createdAt", header: "Date", accessor: (order) => formatDate(order.createdAt), sortValue: (order) => order.createdAt },
            ]}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
