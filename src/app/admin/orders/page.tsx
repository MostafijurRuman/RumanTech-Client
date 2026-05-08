"use client";

import { AdminGuard } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useAdminOrderActions, useAdminOrders } from "@/modules/admin/hooks/use-admin";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency, formatDate } from "@/modules/dashboard/utils/formatters";

const statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export default function AdminOrdersPage() {
  const orders = useAdminOrders();
  const actions = useAdminOrderActions();
  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <DashboardDataTable
          data={orders.data ?? []}
          isLoading={orders.isLoading}
          searchPlaceholder="Search orders"
          columns={[
            { key: "id", header: "Order", accessor: (row) => row.id.slice(0, 8), sortValue: (row) => row.id },
            { key: "status", header: "Status", accessor: (row) => row.status, sortValue: (row) => row.status },
            { key: "paymentStatus", header: "Payment", accessor: (row) => row.paymentStatus, sortValue: (row) => row.paymentStatus },
            { key: "total", header: "Total", accessor: (row) => formatCurrency(row.total), sortValue: (row) => Number(row.total) },
            { key: "createdAt", header: "Date", accessor: (row) => formatDate(row.createdAt), sortValue: (row) => row.createdAt },
            {
              key: "actions",
              header: "Actions",
              accessor: (row) => (
                <div className="flex flex-wrap gap-2">
                  <select
                    defaultValue={row.status}
                    onChange={(event) => actions.updateStatus.mutate({ id: row.id, payload: { status: event.target.value } })}
                    className="h-9 rounded-md border bg-background px-2 text-xs"
                  >
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <Button size="sm" variant="outline" onClick={() => actions.updateStatus.mutate({ id: row.id, payload: { paymentStatus: "PAID" } })}>Mark paid</Button>
                </div>
              ),
            },
          ]}
        />
      </DashboardLayout>
    </AdminGuard>
  );
}
