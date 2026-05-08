"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { AdminGuard } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { useAdminBrands, useAdminCategories, useAdminProductActions, useAdminProducts } from "@/modules/admin/hooks/use-admin";
import type { ProductPayload } from "@/modules/admin/services/admin.service";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency } from "@/modules/dashboard/utils/formatters";

export default function AdminProductsPage() {
  const products = useAdminProducts();
  const categories = useAdminCategories();
  const brands = useAdminBrands();
  const actions = useAdminProductActions();
  const form = useForm<ProductPayload>();
  const [images, setImages] = useState<File[]>([]);

  return (
    <AdminGuard>
      <DashboardLayout variant="admin">
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <form
            className="h-fit rounded-lg border bg-card/90 p-5 shadow-sm"
            onSubmit={form.handleSubmit((values) =>
              actions.create.mutate({ ...values, price: Number(values.price), stock: Number(values.stock), images })
            )}
          >
            <h2 className="text-lg font-semibold">Create product</h2>
            <div className="mt-4 grid gap-3">
              <input {...form.register("name", { required: true })} placeholder="Name" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <input {...form.register("sku", { required: true })} placeholder="SKU" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <textarea {...form.register("description", { required: true })} placeholder="Description" className="min-h-24 rounded-md border bg-background p-3 text-sm" />
              <input type="number" step="0.01" {...form.register("price", { required: true, valueAsNumber: true })} placeholder="Price" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <input type="number" {...form.register("stock", { required: true, valueAsNumber: true })} placeholder="Stock" className="h-10 rounded-md border bg-background px-3 text-sm" />
              <select {...form.register("categoryId", { required: true })} className="h-10 rounded-md border bg-background px-3 text-sm">
                <option value="">Select category</option>
                {categories.data?.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <select {...form.register("brandId", { required: true })} className="h-10 rounded-md border bg-background px-3 text-sm">
                <option value="">Select brand</option>
                {brands.data?.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register("isPublished")} /> Published</label>
              <label className="grid gap-2 text-sm">
                Product images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="rounded-md border bg-background p-2 text-sm"
                  onChange={(event) => setImages(Array.from(event.target.files ?? []))}
                />
              </label>
              <Button type="submit" disabled={actions.create.isPending}>Create product</Button>
            </div>
          </form>

          <DashboardDataTable
            data={products.data ?? []}
            isLoading={products.isLoading}
            searchPlaceholder="Search products"
            columns={[
              { key: "name", header: "Product", accessor: (row) => row.name, sortValue: (row) => row.name },
              { key: "sku", header: "SKU", accessor: (row) => row.sku, sortValue: (row) => row.sku },
              { key: "price", header: "Price", accessor: (row) => formatCurrency(row.price), sortValue: (row) => Number(row.price) },
              { key: "stock", header: "Stock", accessor: (row) => row.stock, sortValue: (row) => row.stock },
              {
                key: "actions",
                header: "Actions",
                accessor: (row) => (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => actions.update.mutate({ id: row.id, payload: { isPublished: true } })}>Publish</Button>
                    <Button size="sm" variant="destructive" onClick={() => actions.deleteProduct.mutate(row.id)}>Delete</Button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </DashboardLayout>
    </AdminGuard>
  );
}
