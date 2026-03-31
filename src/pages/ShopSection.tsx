import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import HeroSection from "@/components/about/HeroSection";
import WhyWeExist from "@/components/about/WhyWeExist";
import MoreThanProducts from "@/components/about/MoreThanProducts";
import Philosophy from "@/components/about/Philosophy";
import Promises from "@/components/about/Promises";
import BlogsSection from "@/components/BlogsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductGridSection from "@/components/ProductGridSection";

const ShopSection = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <ProductGridSection />
      <Footer />
    </div>
  );
};

export default ShopSection;