"use client";

import Link from "next/link";
import { Heart, Package, Star, UserRound } from "lucide-react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { useMyOrders } from "@/modules/orders/use-orders";
import { useWishlist } from "@/modules/wishlist/use-wishlist";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const orders = useMyOrders();
  const wishlist = useWishlist();

  const cards = [
    { label: "Orders", value: orders.data?.length ?? 0, icon: Package },
    { label: "Wishlist", value: wishlist.data?.length ?? 0, icon: Heart },
    { label: "Reviews", value: 0, icon: Star },
    { label: "Profile", value: user?.role ?? "USER", icon: UserRound },
  ];

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">Welcome back, {user?.name}.</p>
          </div>
          {user?.role === "ADMIN" && <Link className="text-sm font-medium text-primary" href="/admin">Admin dashboard</Link>}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-lg border bg-card p-5">
              <card.icon className="mb-4 size-5 text-primary" />
              <p className="text-2xl font-semibold">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border bg-card">
          <div className="border-b p-4 font-semibold">Recent orders</div>
          <div className="divide-y">
            {orders.data?.map((order) => (
              <div key={order.id} className="grid gap-2 p-4 text-sm sm:grid-cols-4">
                <span>{order.id.slice(0, 8)}</span>
                <span>{order.status}</span>
                <span>{order.paymentStatus}</span>
                <span>${Number(order.total).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
