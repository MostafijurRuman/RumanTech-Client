"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/modules/dashboard/layouts/dashboard-layout";
import { DashboardDataTable } from "@/modules/dashboard/tables/dashboard-data-table";
import { formatCurrency } from "@/modules/dashboard/utils/formatters";
import { useRemoveWishlist, useWishlist } from "@/modules/wishlist/use-wishlist";

export default function DashboardWishlistPage() {
  const wishlist = useWishlist();
  const remove = useRemoveWishlist();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardDataTable
          data={wishlist.data ?? []}
          isLoading={wishlist.isLoading}
          searchPlaceholder="Search wishlist"
          columns={[
            { key: "name", header: "Product", accessor: (row) => <Link className="font-medium hover:text-primary" href={`/products/${row.product.slug}`}>{row.product.name}</Link>, sortValue: (row) => row.product.name },
            { key: "price", header: "Price", accessor: (row) => formatCurrency(row.product.price), sortValue: (row) => Number(row.product.price) },
            { key: "stock", header: "Stock", accessor: (row) => row.product.stock, sortValue: (row) => row.product.stock },
            { key: "actions", header: "Actions", accessor: (row) => <Button size="sm" variant="destructive" onClick={() => remove.mutate(row.productId)}>Remove</Button> },
          ]}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
