"use client";

import { Trash2 } from "lucide-react";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/modules/products/components/product-card";
import { useAddToCart } from "@/modules/cart/use-cart";
import { useRemoveWishlist, useWishlist } from "@/modules/wishlist/use-wishlist";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const cart = useAddToCart();
  const remove = useRemoveWishlist();

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">Wishlist</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.data?.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard product={item.product} onCart={(productId) => cart.mutate({ productId, quantity: 1 })} />
              <Button className="absolute right-3 top-3" size="icon" variant="secondary" onClick={() => remove.mutate(item.productId)}>
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </ProtectedRoute>
  );
}
