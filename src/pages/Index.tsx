import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import TrustMarqueeStrip from "@/components/TrustMarqueeStrip";
import HomecareKitsSection from "@/components/HomecareKitsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustStrips from "@/components/TrustStrips";
import BlogsSection from "@/components/BlogsSection";
import VideoReelsSection from "@/components/VideoReelsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroCarousel />
      <CategoryBar />
      <TrustMarqueeStrip />
      <HomecareKitsSection />
      <WhyChooseUs />
      <TrustStrips />
      {/* <VideoReelsSection /> */}
      <BlogsSection />
      <Footer />
    </div>
  );
};

export default Index;
