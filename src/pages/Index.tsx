import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustStrips from "@/components/TrustStrips";
import BlogsSection from "@/components/BlogsSection";
import Footer from "@/components/Footer";
import { PRODUCTS, Product, ProductCategory } from "@/data/products";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category: ProductCategory) => {
    setActiveCategory(activeCategory === category ? null : category);
    setSelectedProduct(null);
  };

  const filteredProducts = activeCategory
    ? PRODUCTS.filter((p) => p.categories.includes(activeCategory))
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={handleBack} />
      ) : (
        <>
          <HeroCarousel />
          <CategoryBar activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />

          {/* Products section */}
          <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
              {activeCategory ? `${activeCategory}` : "rePhyl products"}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {activeCategory
                ? `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} in ${activeCategory}`
                : "Meet our most loved plant-based cleaners"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No products found in this category.</p>
            )}
          </section>

          <WhyChooseUs />
          <TrustStrips />
          <BlogsSection />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
