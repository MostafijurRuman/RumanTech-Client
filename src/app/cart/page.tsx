"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/modules/dashboard/utils/formatters";
import { useCart, useRemoveCartItem, useUpdateCartQuantity } from "@/modules/cart/use-cart";

export default function CartPage() {
  const cart = useCart();
  const updateQuantity = useUpdateCartQuantity();
  const remove = useRemoveCartItem();
  const total =
    cart.data?.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0) ?? 0;

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {cart.data?.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4">
                <div>
                  <Link href={`/products/${item.product.slug}`} className="font-semibold hover:text-primary">{item.product.name}</Link>
                  <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => updateQuantity.mutate({ id: item.id, quantity: Number(event.target.value) })}
                    className="h-10 w-20 rounded-md border bg-background px-3"
                  />
                  <Button size="icon" variant="outline" onClick={() => remove.mutate(item.id)}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-lg border bg-card p-5">
            <h2 className="font-semibold">Summary</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button className="mt-5 w-full">Checkout</Button>
          </aside>
        </div>
      </section>
    </ProtectedRoute>
  );
}
