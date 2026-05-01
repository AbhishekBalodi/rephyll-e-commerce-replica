import type { ApiProduct, ApiProductDetail } from "@/types/api";

type ProductLike = Partial<Pick<ApiProduct, "id" | "slug" | "urlHandle" | "categoryName">> & {
  categorySlug?: string;
};

export const slugifySegment = (value: string | number | null | undefined) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getProductSlug = (product: ProductLike) =>
  product.slug || product.urlHandle || String(product.id || "");

export const getCategorySlug = (product: ProductLike) =>
  slugifySegment(product.categorySlug || product.categoryName || "products") || "products";

export const buildProductPath = (product: ProductLike) => {
  const categorySlug = encodeURIComponent(getCategorySlug(product));
  const productSlug = encodeURIComponent(getProductSlug(product));
  return `/${categorySlug}/${productSlug}`;
};

export const getCanonicalProductPath = (product: ApiProduct | ApiProductDetail) =>
  buildProductPath({
    id: product.id,
    slug: product.slug,
    urlHandle: product.urlHandle,
    categoryName: product.categoryName,
  });
