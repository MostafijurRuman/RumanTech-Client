"use client";

import { ClipboardList, DollarSign, TrendingUp, Users } from "lucide-react";
import { AdminGuard } from "@/components/shared/protected-route";
import { RevenueLineChart, SalesBarChart } from "@/modules/dashboard/charts/dashboard-charts";
import { DashboardSkeleton } from "@/modules/dashboard/components/dashboard-skeleton";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { useAdminDashboard, useAnalytics } from "@/modules/dashboard/hooks/use-dashboard";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency, formatDate, formatPercent } from "@/modules/dashboard/utils/formatters";

export default function AdminPage() {
  const overview = useAdminDashboard();
  const analytics = useAnalytics();
  const stats = overview.data?.stats;

  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Admin dashboard</h2>
            <p className="mt-1 text-sm text-muted-foreground">Store health, revenue, orders, customers, and operational queues.</p>
          </div>

          {overview.isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total revenue" value={formatCurrency(stats?.totalRevenue ?? 0)} helper="Paid, non-refunded orders" icon={DollarSign} />
              <StatCard label="Monthly revenue" value={formatCurrency(stats?.monthlyRevenue ?? 0)} helper={formatPercent(stats?.salesGrowth ?? 0)} icon={TrendingUp} tone="accent" />
              <StatCard label="Total orders" value={stats?.totalOrders ?? 0} helper={`${stats?.pendingOrders ?? 0} pending`} icon={ClipboardList} />
              <StatCard label="Users" value={stats?.totalUsers ?? 0} helper={`${stats?.totalProducts ?? 0} products`} icon={Users} tone="neutral" />
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-2">
            <RevenueLineChart data={analytics.data?.revenueTrends ?? []} />
            <SalesBarChart data={analytics.data?.revenueTrends ?? []} />
          </div>

          <DashboardDataTable
            data={overview.data?.recentOrders ?? []}
            isLoading={overview.isLoading}
            searchPlaceholder="Search recent orders"
            columns={[
              { key: "id", header: "Order", accessor: (order) => order.id.slice(0, 8), sortValue: (order) => order.id },
              { key: "customer", header: "Customer", accessor: (order) => order.user?.name ?? "Guest", sortValue: (order) => order.user?.name ?? "" },
              { key: "status", header: "Status", accessor: (order) => order.status, sortValue: (order) => order.status },
              { key: "total", header: "Total", accessor: (order) => formatCurrency(order.total), sortValue: (order) => Number(order.total) },
              { key: "createdAt", header: "Date", accessor: (order) => formatDate(order.createdAt), sortValue: (order) => order.createdAt },
            ]}
          />
        </div>
      </DashboardLayout>
    </AdminGuard>
  );
}
