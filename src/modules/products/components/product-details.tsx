"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/shared/skeleton";
import { useAddToCart } from "@/modules/cart/use-cart";
import { useProduct, useProducts } from "@/modules/products/hooks/use-products";
import { ProductCard } from "@/modules/products/components/product-card";
import { useAddWishlist } from "@/modules/wishlist/use-wishlist";

export function ProductDetails({ slug }: { slug: string }) {
  const product = useProduct(slug);
  const related = useProducts({ limit: 4 });
  const cart = useAddToCart();
  const wishlist = useAddWishlist();

  if (product.isLoading) {
    return <div className="mx-auto max-w-7xl px-4 py-10"><Skeleton className="h-96" /></div>;
  }

  if (!product.data) {
    return <div className="mx-auto max-w-7xl px-4 py-10">Product not found.</div>;
  }

  const item = product.data;
  const mainImage = item.images?.[0]?.url;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-square rounded-lg border bg-muted bg-cover bg-center" style={mainImage ? { backgroundImage: `url(${mainImage})` } : undefined} />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {item.images?.slice(0, 4).map((image) => (
              <div key={image.publicId} className="aspect-square rounded-md border bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${image.url})` }} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{item.category?.name} / {item.brand?.name}</p>
          <h1 className="mt-3 text-3xl font-semibold">{item.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="size-4 fill-accent text-accent" />
            {item.avgRating.toFixed(1)} rating from {item.reviewCount} reviews
          </div>
          <p className="mt-5 text-3xl font-semibold">${Number(item.price).toFixed(2)}</p>
          <p className="mt-5 leading-7 text-muted-foreground">{item.description}</p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => cart.mutate({ productId: item.id, quantity: 1 })}>
              <ShoppingCart />
              Add to cart
            </Button>
            <Button variant="outline" onClick={() => wishlist.mutate(item.id)}>
              <Heart />
              Wishlist
            </Button>
          </div>
          <div className="mt-8 rounded-lg border bg-card p-5">
            <h2 className="font-semibold">Specifications</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              {Object.entries(item.specs ?? {}).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd>{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-semibold">Related products</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.data?.data.filter((current) => current.id !== item.id).slice(0, 4).map((current) => (
            <ProductCard key={current.id} product={current} onCart={(id) => cart.mutate({ productId: id, quantity: 1 })} onWishlist={(id) => wishlist.mutate(id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
