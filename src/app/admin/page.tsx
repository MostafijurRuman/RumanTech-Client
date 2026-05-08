"use client";

import Link from "next/link";
import { Boxes, ClipboardList, LayoutDashboard, Tags } from "lucide-react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { useAdminOrders } from "@/modules/orders/use-orders";
import { useCategories, useProducts } from "@/modules/products/hooks/use-products";

export default function AdminPage() {
  const products = useProducts({ includeDrafts: true });
  const categories = useCategories();
  const orders = useAdminOrders();

  const cards = [
    { label: "Products", value: products.data?.meta?.total ?? 0, icon: Boxes },
    { label: "Categories", value: categories.data?.length ?? 0, icon: Tags },
    { label: "Orders", value: orders.data?.length ?? 0, icon: ClipboardList },
  ];

  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-lg border bg-card p-4">
          <div className="mb-4 flex items-center gap-2 font-semibold">
            <LayoutDashboard className="size-4" />
            Admin
          </div>
          {["Products", "Categories", "Orders"].map((item) => (
            <Link key={item} href="/admin" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
              {item}
            </Link>
          ))}
        </aside>
        <div>
          <h1 className="text-3xl font-semibold">Admin dashboard</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {cards.map((card) => (
              <div key={card.label} className="rounded-lg border bg-card p-5">
                <card.icon className="mb-4 size-5 text-primary" />
                <p className="text-2xl font-semibold">{card.value}</p>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-lg border bg-card">
              <div className="border-b p-4 font-semibold">Product management</div>
              {products.data?.data.slice(0, 6).map((product) => (
                <div key={product.id} className="grid grid-cols-[1fr_auto] gap-4 border-b p-4 text-sm">
                  <span>{product.name}</span>
                  <span>${Number(product.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border bg-card">
              <div className="border-b p-4 font-semibold">Order management</div>
              {orders.data?.slice(0, 6).map((order) => (
                <div key={order.id} className="grid grid-cols-3 gap-4 border-b p-4 text-sm">
                  <span>{order.id.slice(0, 8)}</span>
                  <span>{order.status}</span>
                  <span>${Number(order.total).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
