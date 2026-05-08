import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/modules/products/types";

export function ProductCard({
  product,
  onCart,
  onWishlist,
}: {
  product: Product;
  onCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
}) {
  const image = product.images?.[0]?.url;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className="aspect-[4/3] bg-muted bg-cover bg-center"
          style={image ? { backgroundImage: `url(${image})` } : undefined}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{product.category?.name ?? "Product"}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-3 fill-accent text-accent" />
            {product.avgRating.toFixed(1)}
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="mt-2 font-semibold hover:text-primary">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-semibold">${Number(product.price).toFixed(2)}</span>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" aria-label="Wishlist" onClick={() => onWishlist?.(product.id)}>
              <Heart />
            </Button>
            <Button size="icon" aria-label="Cart" onClick={() => onCart?.(product.id)}>
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
