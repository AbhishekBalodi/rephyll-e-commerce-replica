import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { useProductDetail } from "@/hooks/useProducts";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = id ? parseInt(id, 10) : null;
  const { data: product, isLoading } = useProductDetail(productId);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/50 text-foreground">
      <div className="max-w-[1440px] mx-auto my-0 md:my-4 bg-background rounded-none md:rounded-2xl shadow-none md:shadow-[0_4px_40px_rgba(6,71,52,0.08)] overflow-hidden">
        <Navbar />
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        ) : product ? (
          <ProductDetail product={product} onBack={handleBack} />
        ) : (
          <div className="flex items-center justify-center py-32">
            <p className="text-muted-foreground">Product not found.</p>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
