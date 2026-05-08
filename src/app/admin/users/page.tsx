"use client";

import { AdminGuard } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useAdminUserActions, useAdminUsers } from "@/modules/admin/hooks/use-admin";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatDate } from "@/modules/dashboard/utils/formatters";

export default function AdminUsersPage() {
  const users = useAdminUsers();
  const actions = useAdminUserActions();
  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <DashboardDataTable
          data={users.data ?? []}
          isLoading={users.isLoading}
          searchPlaceholder="Search users"
          columns={[
            { key: "name", header: "Name", accessor: (row) => row.name, sortValue: (row) => row.name },
            { key: "email", header: "Email", accessor: (row) => row.email, sortValue: (row) => row.email },
            { key: "role", header: "Role", accessor: (row) => row.role, sortValue: (row) => row.role },
            { key: "status", header: "Status", accessor: (row) => (row.isActive ? "Active" : "Banned"), sortValue: (row) => Number(row.isActive) },
            { key: "createdAt", header: "Joined", accessor: (row) => formatDate(row.createdAt), sortValue: (row) => row.createdAt },
            {
              key: "actions",
              header: "Actions",
              accessor: (row) => (
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => actions.updateRole.mutate({ id: row.id, role: row.role === "ADMIN" ? "USER" : "ADMIN" })}>
                    {row.role === "ADMIN" ? "Make user" : "Make admin"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => actions.updateStatus.mutate({ id: row.id, isActive: !row.isActive })}>
                    {row.isActive ? "Ban" : "Unban"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => actions.deleteUser.mutate(row.id)}>Delete</Button>
                </div>
              ),
            },
          ]}
        />
      </DashboardLayout>
    </AdminGuard>
  );
}
