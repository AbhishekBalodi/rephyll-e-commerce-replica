import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import SimilarItemsSection from "@/components/SimilarItemsSection";
import CertifiedProductsSection from "@/components/CertifiedProductsSection";
import FAQSection from "@/components/FAQSection";
import FormulaSection from "@/components/FormulaSection";
import WeAreAvailableOnSection from "@/components/WeAreAvailableOnSection";
import TrustStrips from "@/components/TrustStrips";
import { useProductDetail } from "@/hooks/useProducts";
import { getCanonicalProductPath, slugifySegment } from "@/lib/routeHelpers";

const ProductPage = () => {
  const { slug, categorySlug } = useParams<{ slug: string; categorySlug?: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProductDetail(slug || null);

  useEffect(() => {
    if (!product || !slug) return;

    const canonicalPath = getCanonicalProductPath(product);
    const currentCategorySlug = slugifySegment(categorySlug || "");
    const expectedCategorySlug = slugifySegment(product.categoryName || "products");

    if (!currentCategorySlug || currentCategorySlug !== expectedCategorySlug) {
      navigate(canonicalPath, { replace: true });
    }
  }, [categorySlug, navigate, product, slug]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      ) : product ? (
        <>
          <ProductDetail product={product} onBack={handleBack} />
          <SimilarItemsSection currentProductId={product.id} categoryId={product.categoryId} />
          <CertifiedProductsSection />
          <FormulaSection />
          
          <FAQSection />
          <WeAreAvailableOnSection />
          
          <TrustStrips />
        </>
      ) : (
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
