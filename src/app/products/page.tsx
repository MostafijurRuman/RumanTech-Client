"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/modules/products/components/product-card";
import { useBrands, useCategories, useProducts } from "@/modules/products/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/shared/skeleton";
import { useAddToCart } from "@/modules/cart/use-cart";
import { useAddWishlist } from "@/modules/wishlist/use-wishlist";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const categories = useCategories();
  const brands = useBrands();
  const cart = useAddToCart();
  const wishlist = useAddWishlist();

  const params = useMemo(
    () => ({ page, limit: 8, searchTerm: debouncedSearch, category, brand, sortBy }),
    [brand, category, debouncedSearch, page, sortBy]
  );
  const products = useProducts(params);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">Search, filter, sort, and paginate catalog products.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <label className="relative">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 outline-ring" />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 rounded-md border bg-background px-3">
            <option value="">All categories</option>
            {categories.data?.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
          </select>
          <select value={brand} onChange={(event) => setBrand(event.target.value)} className="h-10 rounded-md border bg-background px-3">
            <option value="">All brands</option>
            {brands.data?.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-10 rounded-md border bg-background px-3">
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="avgRating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.isLoading
          ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-80" />)
          : products.data?.data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCart={(productId) => cart.mutate({ productId, quantity: 1 })}
                onWishlist={(productId) => wishlist.mutate(productId)}
              />
            ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Page {products.data?.meta?.page ?? page} of {products.data?.meta?.totalPage ?? 1}</p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</Button>
          <Button variant="outline" disabled={(products.data?.meta?.totalPage ?? 1) <= page} onClick={() => setPage((value) => value + 1)}>Next</Button>
        </div>
      </div>
    </section>
  );
}
