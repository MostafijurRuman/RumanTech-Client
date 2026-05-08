"use client";

import { AdminGuard } from "@/components/shared/protected-route";
import { OrdersPieChart, RevenueLineChart, SalesBarChart, UserGrowthAreaChart } from "@/modules/dashboard/charts/dashboard-charts";
import { useAnalytics } from "@/modules/dashboard/hooks/use-dashboard";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency } from "@/modules/dashboard/utils/formatters";

export default function AdminAnalyticsPage() {
  const analytics = useAnalytics();

  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Analytics</h2>
            <p className="mt-1 text-sm text-muted-foreground">Revenue, sales, order, product, and user analytics.</p>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <RevenueLineChart data={analytics.data?.revenueTrends ?? []} />
            <SalesBarChart data={analytics.data?.revenueTrends ?? []} />
            <OrdersPieChart data={analytics.data?.orderStatus ?? []} />
            <UserGrowthAreaChart data={analytics.data?.userGrowth ?? []} />
          </div>
          <DashboardDataTable
            data={analytics.data?.productPerformance ?? []}
            isLoading={analytics.isLoading}
            searchPlaceholder="Search products"
            columns={[
              { key: "name", header: "Product", accessor: (row) => row.name, sortValue: (row) => row.name },
              { key: "quantity", header: "Units sold", accessor: (row) => row.quantity, sortValue: (row) => row.quantity },
              { key: "revenue", header: "Revenue", accessor: (row) => formatCurrency(row.revenue), sortValue: (row) => row.revenue },
            ]}
          />
        </div>
      </DashboardLayout>
    </AdminGuard>
  );
}
