"use client";

import { AdminGuard } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useAdminReviewActions, useAdminReviews } from "@/modules/admin/hooks/use-admin";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatDate } from "@/modules/dashboard/utils/formatters";

export default function AdminReviewsPage() {
  const reviews = useAdminReviews();
  const actions = useAdminReviewActions();
  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <DashboardDataTable
          data={reviews.data ?? []}
          isLoading={reviews.isLoading}
          searchPlaceholder="Search reviews"
          columns={[
            { key: "product", header: "Product", accessor: (row) => row.product?.name ?? "Product", sortValue: (row) => row.product?.name ?? "" },
            { key: "user", header: "User", accessor: (row) => row.user?.name ?? "User", sortValue: (row) => row.user?.name ?? "" },
            { key: "rating", header: "Rating", accessor: (row) => row.rating, sortValue: (row) => row.rating },
            { key: "comment", header: "Comment", accessor: (row) => row.comment ?? "-", sortValue: (row) => row.comment ?? "" },
            { key: "createdAt", header: "Date", accessor: (row) => formatDate(row.createdAt), sortValue: (row) => row.createdAt },
            { key: "actions", header: "Actions", accessor: (row) => <Button size="sm" variant="destructive" onClick={() => actions.deleteReview.mutate(row.id)}>Delete</Button> },
          ]}
        />
      </DashboardLayout>
    </AdminGuard>
  );
}
