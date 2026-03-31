import { useQuery } from "@tanstack/react-query";
import {
  listProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  getRelatedProducts,
  getCategories,
  getCategoryTree,
  getBrands,
  getSearchSuggestions,
} from "@/services/productApi";

export function useProductList(params?: {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
  });
}

export function useProductDetail(slug: string | null) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: slug !== null,
  });
}

export function useProductById(id: number | null) {
  return useQuery({
    queryKey: ["product-id", id],
    queryFn: () => getProductById(id!),
    enabled: id !== null,
  });
}

export function useProductsByCategory(
  categoryId: number | undefined,
  params?: { search?: string; page?: number; size?: number }
) {
  return useQuery({
    queryKey: ["products-category", categoryId, params],
    queryFn: () => getProductsByCategory(categoryId!, params),
    enabled: categoryId !== undefined,
  });
}

export function useProductsByBrand(
  brandId: number | undefined,
  params?: { search?: string; page?: number; size?: number }
) {
  return useQuery({
    queryKey: ["products-brand", brandId, params],
    queryFn: () => getProductsByBrand(brandId!, params),
    enabled: brandId !== undefined,
  });
}

export function useRelatedProducts(productId: number | undefined) {
  return useQuery({
    queryKey: ["related-products", productId],
    queryFn: () => getRelatedProducts(productId!),
    enabled: productId !== undefined,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategoryTree() {
  return useQuery({
    queryKey: ["category-tree"],
    queryFn: getCategoryTree,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ["search-suggestions", query],
    queryFn: () => getSearchSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 30_000,
  });
}
