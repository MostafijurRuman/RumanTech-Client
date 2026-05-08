"use client";

import { ProtectedRoute } from "@/components/shared/protected-route";
import { useMyOrders } from "@/modules/orders/use-orders";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency, formatDate } from "@/modules/dashboard/utils/formatters";

export default function UserOrdersPage() {
  const orders = useMyOrders();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardDataTable
          data={orders.data ?? []}
          isLoading={orders.isLoading}
          searchPlaceholder="Search orders"
          columns={[
            { key: "id", header: "Order", accessor: (row) => row.id.slice(0, 8), sortValue: (row) => row.id },
            { key: "tracking", header: "Tracking", accessor: (row) => row.status, sortValue: (row) => row.status },
            { key: "payment", header: "Payment", accessor: (row) => row.paymentStatus, sortValue: (row) => row.paymentStatus },
            { key: "total", header: "Total", accessor: (row) => formatCurrency(row.total), sortValue: (row) => Number(row.total) },
            { key: "createdAt", header: "Date", accessor: (row) => formatDate(row.createdAt), sortValue: (row) => row.createdAt },
          ]}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
