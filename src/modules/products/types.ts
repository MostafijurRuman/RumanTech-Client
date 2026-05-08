export type ProductImage = {
  url: string;
  publicId: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  sku: string;
  price: string;
  stock: number;
  images: ProductImage[];
  specs: Record<string, unknown>;
  avgRating: number;
  reviewCount: number;
  isFeatured: boolean;
  category: Category;
  brand: Brand;
};

export type ProductQuery = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  includeDrafts?: boolean;
};
