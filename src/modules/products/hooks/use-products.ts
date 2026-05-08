import { useQuery } from "@tanstack/react-query";
import { productService } from "@/modules/products/services/product.service";
import type { ProductQuery } from "@/modules/products/types";

export function useProducts(params?: ProductQuery) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getProducts(params),
  });
}

export function useProduct(idOrSlug: string) {
  return useQuery({
    queryKey: ["product", idOrSlug],
    queryFn: () => productService.getProduct(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: productService.getBrands,
  });
}
