import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { useProductDetail } from "@/hooks/useProducts";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  // slug can be either a slug string or a numeric ID
  const { data: product, isLoading } = useProductDetail(slug || null);

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
        <ProductDetail product={product} onBack={handleBack} />
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
