import { useQuery } from "@tanstack/react-query";
import {
  listProducts,
  getProductDetail,
  getCategories,
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

export function useProductDetail(slugOrId: string | number | null) {
  return useQuery({
    queryKey: ["product", slugOrId],
    queryFn: () => getProductDetail(slugOrId!),
    enabled: slugOrId !== null,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
