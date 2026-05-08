"use client";

import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useNotificationActions, useNotifications } from "@/modules/dashboard/hooks/use-dashboard";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatDate } from "@/modules/dashboard/utils/formatters";

export default function DashboardNotificationsPage() {
  const notifications = useNotifications();
  const actions = useNotificationActions();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardDataTable
          data={notifications.data?.items ?? []}
          isLoading={notifications.isLoading}
          searchPlaceholder="Search notifications"
          columns={[
            { key: "title", header: "Title", accessor: (row) => row.title, sortValue: (row) => row.title },
            { key: "type", header: "Type", accessor: (row) => row.type, sortValue: (row) => row.type },
            { key: "message", header: "Message", accessor: (row) => row.message, sortValue: (row) => row.message },
            { key: "status", header: "Status", accessor: (row) => (row.readAt ? "Read" : "Unread"), sortValue: (row) => row.readAt ?? "" },
            { key: "createdAt", header: "Date", accessor: (row) => formatDate(row.createdAt), sortValue: (row) => row.createdAt },
            {
              key: "actions",
              header: "Actions",
              accessor: (row) => (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => actions.markAsRead.mutate(row.id)}>Read</Button>
                  <Button size="sm" variant="destructive" onClick={() => actions.deleteNotification.mutate(row.id)}>Delete</Button>
                </div>
              ),
            },
          ]}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
