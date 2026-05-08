"use client";

import { useForm } from "react-hook-form";
import { AdminGuard } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useAdminCategories, useAdminCategoryActions } from "@/modules/admin/hooks/use-admin";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";

export default function AdminCategoriesPage() {
  const categories = useAdminCategories();
  const actions = useAdminCategoryActions();
  const form = useForm<{ name: string; description?: string }>();
  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <form className="h-fit rounded-lg border bg-card/90 p-5 shadow-sm" onSubmit={form.handleSubmit((values) => actions.create.mutate(values))}>
            <h2 className="text-lg font-semibold">Create category</h2>
            <div className="mt-4 grid gap-3">
              <input {...form.register("name", { required: true })} placeholder="Name" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <textarea {...form.register("description")} placeholder="Description" className="min-h-24 rounded-md border bg-background p-3 text-sm" />
              <Button type="submit">Create category</Button>
            </div>
          </form>
          <DashboardDataTable
            data={categories.data ?? []}
            isLoading={categories.isLoading}
            columns={[
              { key: "name", header: "Name", accessor: (row) => row.name, sortValue: (row) => row.name },
              { key: "slug", header: "Slug", accessor: (row) => row.slug, sortValue: (row) => row.slug },
              { key: "actions", header: "Actions", accessor: (row) => <Button size="sm" variant="destructive" onClick={() => actions.deleteCategory.mutate(row.id)}>Delete</Button> },
            ]}
          />
        </div>
      </DashboardLayout>
    </AdminGuard>
  );
}
