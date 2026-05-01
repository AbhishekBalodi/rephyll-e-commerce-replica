import { useState } from "react";
import ProductCard from "./ProductCard";
import { useProductList } from "@/hooks/useProducts";

const ProductGridSection = () => {
  const [page, setPage] = useState(0);
  const pageSize = 12;
  const { data, isLoading } = useProductList({ page, size: pageSize });
  
  const products = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="w-full flex justify-center py-16 relative pt-[104px]">
      <div className="max-w-[1380px] w-full px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#064734]">Explore Products</h2>
          <p className="text-[#464646]">Shop our selection of plant-based cleaners and home care products.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-[200px] rounded-t-2xl bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="h-8 w-1/3 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="flex justify-center">
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-7 items-start">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGridSection;
