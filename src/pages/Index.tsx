import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Footer from "@/components/Footer";
import { PRODUCTS, Product } from "@/data/products";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={handleBack} />
      ) : (
        <>
          <HeroCarousel />
          <CategoryBar />

          {/* Products section */}
          <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
              rePhyl products
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Meet our most loved plant-based cleaners
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
