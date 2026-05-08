"use client";

import Link from "next/link";
import { ArrowRight, Bot, PackageSearch, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/modules/products/components/product-card";
import { useProducts, useCategories } from "@/modules/products/hooks/use-products";
import { Skeleton } from "@/components/shared/skeleton";
import { useAddToCart } from "@/modules/cart/use-cart";
import { useAddWishlist } from "@/modules/wishlist/use-wishlist";

const stats = [
  { label: "Foundation modules", value: "9+" },
  { label: "API ready layers", value: "Clean" },
  { label: "Theme modes", value: "Light/Dark" },
];

const capabilities = [
  {
    title: "Modular commerce",
    description: "Products, categories, brands, orders, carts, wishlists, and reviews are separated by feature boundary.",
    icon: PackageSearch,
  },
  {
    title: "AI-ready workflows",
    description: "Dedicated AI module space keeps recommendation and assistant features isolated from core commerce logic.",
    icon: Bot,
  },
  {
    title: "Secure foundation",
    description: "JWT, secure cookies, role authorization, validation, and typed service layers are prepared for production flows.",
    icon: ShieldCheck,
  },
];

export function HomePage() {
  const products = useProducts({ limit: 4, sortBy: "createdAt", sortOrder: "desc" });
  const categories = useCategories();
  const cart = useAddToCart();
  const wishlist = useAddWishlist();

  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-accent" />
            AI-powered single-vendor commerce
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            RumanTech commerce foundation for scalable product operations.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            A modular Next.js client prepared for authentication, catalog,
            checkout, dashboard, and AI-assisted shopping experiences.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/products">
                Browse products
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Phase 1 status
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-md bg-muted p-4">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {capabilities.map((item) => (
            <div key={item.title} className="rounded-lg border bg-card p-5">
              <item.icon className="mb-4 size-5 text-primary" />
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Featured products</h2>
              <p className="mt-2 text-sm text-muted-foreground">Latest catalog items connected to the API.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">View all</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.isLoading
              ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-80" />)
              : products.data?.data.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCart={(productId) => cart.mutate({ productId, quantity: 1 })}
                    onWishlist={(productId) => wishlist.mutate(productId)}
                  />
                ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold">Categories</h2>
          <p className="mt-2 text-sm text-muted-foreground">Fast entry points for product discovery.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.data?.slice(0, 6).map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`} className="rounded-lg border bg-card p-4 font-medium hover:border-primary">
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          {["Best sellers", "Trusted support", "AI shopping assist"].map((title) => (
            <div key={title} className="rounded-lg border bg-card p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Built into the Phase 2 structure with reusable modules and API-first data flow.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-card p-6 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Newsletter</h2>
            <p className="mt-2 text-sm text-muted-foreground">Get product launches and offers.</p>
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <input className="h-10 min-w-0 rounded-md border bg-background px-3 outline-ring" placeholder="Email address" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
