import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import ProductCard from "@/components/ProductCard";
import HomecareKitsSection from "@/components/HomecareKitsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustStrips from "@/components/TrustStrips";
import BlogsSection from "@/components/BlogsSection";
import VideoReelsSection from "@/components/VideoReelsSection";
import Footer from "@/components/Footer";
import { useProductList } from "@/hooks/useProducts";
import type { ApiProduct } from "@/types/api";

const Index = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { data: productsData, isLoading } = useProductList({
    category: activeCategory ?? undefined,
  });

  const products = productsData?.content ?? [];

  const handleProductClick = (product: ApiProduct) => {
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroCarousel />
      <CategoryBar activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
      <TrustMarqueeStrip />

      {/* Products section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-12" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Most Loved by <span className="text-primary">10,000+</span> Homes
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="aspect-square rounded-lg bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No products found.</p>
        )}
      </section>

      <HomecareKitsSection />
      <WhyChooseUs />
      <TrustStrips />
      <VideoReelsSection />
      <BlogsSection />
      <Footer />
    </div>
  );
};

export default Index;
