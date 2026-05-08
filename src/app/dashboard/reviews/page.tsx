"use client";

import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatDate } from "@/modules/dashboard/utils/formatters";
import { useMyReviewActions, useMyReviews } from "@/modules/profile/hooks/use-my-reviews";

export default function DashboardReviewsPage() {
  const reviews = useMyReviews();
  const actions = useMyReviewActions();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardDataTable
          data={reviews.data ?? []}
          isLoading={reviews.isLoading}
          searchPlaceholder="Search reviews"
          columns={[
            { key: "product", header: "Product", accessor: (row) => row.product?.name ?? "Product", sortValue: (row) => row.product?.name ?? "" },
            { key: "rating", header: "Rating", accessor: (row) => row.rating, sortValue: (row) => row.rating },
            { key: "comment", header: "Comment", accessor: (row) => row.comment ?? "-", sortValue: (row) => row.comment ?? "" },
            { key: "createdAt", header: "Date", accessor: (row) => formatDate(row.createdAt), sortValue: (row) => row.createdAt },
            { key: "actions", header: "Actions", accessor: (row) => <Button size="sm" variant="destructive" onClick={() => actions.deleteReview.mutate(row.id)}>Delete</Button> },
          ]}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
